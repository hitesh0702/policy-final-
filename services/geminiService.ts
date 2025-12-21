
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { Report, SourceType, ChunkAnalysisResult } from '../types';
import { chunkText } from '../utils/textUtils';
import { extractTextFromPdf } from '../utils/fileUtils';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto-js';

// This would be in a .env file
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    // In a real app, you'd want to handle this more gracefully.
    // For this example, we'll throw an error if the key is missing.
    console.warn("API_KEY environment variable not set. Using a placeholder. Analysis will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "YOUR_API_KEY_HERE" });

const RISK_TYPES = `data_sale, data_sharing, auto_renewal, hard_cancel, arbitration, class_action_waiver, biometric, profiling, indefinite_retention, children_data, other`;

async function analyzeChunk(chunk: string, index: number): Promise<ChunkAnalysisResult> {
  const prompt = `
    You are a precise legal-policy summarizer. Return JSON only. Quote exact clauses. No legal advice.
    
    CHUNK_ID: ${index}
    TEXT:
    '''${chunk}'''

    Tasks:
    1. Identify risks among: ${RISK_TYPES}.
    2. For each risk return:
       risk_type (string, from the list), risk_label (string, human-readable title), excerpt (string, exact text, max 100 words), confidence (number, 0-1),
       suggested_action (string, clear user action).
    3. Provide TLDR for this chunk (string, max 3 lines).
    4. Provide chunk_score (number, 0-100, where 100 is most private/safe) + 1-line rationale (string).
    
    Return a single JSON object matching this schema:
    {
     "chunk_id": "${index}",
     "tldr": "",
     "chunk_score": 0,
     "rationale": "",
     "extractions": [
        { "risk_type": "", "risk_label": "", "excerpt": "", "confidence": 0.0, "suggested_action": "" }
     ]
    }
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        }
    });

    const jsonText = response.text?.trim();
    if (!jsonText) throw new Error("Empty response from AI for chunk analysis.");
    
    // Sometimes the model returns markdown with JSON, so we clean it
    const cleanedJson = jsonText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedJson) as ChunkAnalysisResult;
  } catch (error) {
    console.error(`Error analyzing chunk ${index}:`, error);
    // Return a failed state for this chunk
    return {
      chunk_id: String(index),
      tldr: "Analysis failed for this chunk.",
      chunk_score: 0,
      rationale: "An error occurred during AI processing.",
      extractions: [],
    };
  }
}

function computeScore(chunkResults: ChunkAnalysisResult[]): { score: number, rationale: string } {
    if (chunkResults.length === 0) return { score: 100, rationale: "No text to analyze."};

    const totalScore = chunkResults.reduce((acc, r) => acc + r.chunk_score, 0);
    const averageScore = Math.round(totalScore / chunkResults.length);
    
    let rationale = `The overall score of ${averageScore} is an average of the scores from ${chunkResults.length} analyzed text chunks. `;
    if (averageScore >= 75) {
        rationale += "This indicates a generally positive and user-friendly policy."
    } else if (averageScore >= 40) {
        rationale += "This suggests some areas of concern that warrant your attention."
    } else {
        rationale += "This points to several potentially high-risk clauses that you should review carefully."
    }
    
    return { score: averageScore, rationale };
}

function assignSeverity(riskType: string): 'low' | 'medium' | 'high' {
    switch (riskType) {
        case 'data_sale':
        case 'auto_renewal':
        case 'hard_cancel':
        case 'biometric':
        case 'children_data':
            return 'high';
        case 'data_sharing':
        case 'arbitration':
        case 'class_action_waiver':
        case 'indefinite_retention':
            return 'medium';
        case 'profiling':
        default:
            return 'low';
    }
}

async function aggregateResults(chunkResults: ChunkAnalysisResult[], source: { type: SourceType; value: string | File }, fullText: string): Promise<Report> {
    const allExtractions = chunkResults.flatMap(chunk => 
        chunk.extractions.map(ext => ({ ...ext, chunk_id: chunk.chunk_id }))
    );

    const prompt = `
      You are a final report generator. Your task is to synthesize the provided chunk-based analyses into a single, cohesive report.
      Do NOT hallucinate information. Use only the data provided below.
      
      SOURCE: ${typeof source.value === 'string' ? source.value : (source.value as File).name}

      CHUNK ANALYSES:
      ${JSON.stringify(chunkResults, null, 2)}
      
      TASKS:
      1. Write a global TL;DR (string, max 3 lines) summarizing the most important findings from all chunks.
      2. Identify 3 recommended actions for the user (e.g., "Look for opt-out settings", "Be aware of auto-renewal terms").
      3. Extract contact information from the full text: support email, support phone, and a link for cancellation/account deletion.
      
      Return a single JSON object:
      {
        "tldr": "",
        "actions": [
          {"title": "Action 1", "description": "Description 1"},
          {"title": "Action 2", "description": "Description 2"},
          {"title": "Action 3", "description": "Description 3"}
        ],
        "contact_info": { "support_email": "", "support_phone": "", "cancellation_link": "" }
      }
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        }
    });

    const jsonText = response.text?.trim();
    if (!jsonText) throw new Error("Empty response from AI for aggregation.");
    const cleanedJson = jsonText.replace(/```json/g, '').replace(/```/g, '').trim();
    const aggregationResult = JSON.parse(cleanedJson);
    
    const { score, rationale } = computeScore(chunkResults);

    const finalReport: Report = {
        report_id: uuidv4(),
        source: { type: source.type, value: typeof source.value === 'string' ? source.value : source.value.name },
        language: 'en', // Placeholder
        tldr: aggregationResult.tldr,
        score: score,
        score_rationale: rationale,
        risks: allExtractions.map(ext => ({
            risk_id: uuidv4(),
            risk_type: ext.risk_type,
            risk_label: ext.risk_label,
            severity: assignSeverity(ext.risk_type),
            confidence: ext.confidence,
            excerpt: ext.excerpt,
            suggested_action: ext.suggested_action,
            source_refs: [{ chunk_id: ext.chunk_id }],
        })),
        actions: aggregationResult.actions,
        contact_info: aggregationResult.contact_info,
        raw_text_hash: crypto.SHA256(fullText).toString(),
        model_version: 'gemini-policy-v1',
        created_at: new Date().toISOString(),
    };
    
    return finalReport;
}

export async function analyzePolicy(source: { type: SourceType; value: string | File }): Promise<Report> {
    let text = '';

    if (source.type === SourceType.TEXT) {
        text = source.value as string;
    } else if (source.type === SourceType.PDF) {
        text = await extractTextFromPdf(source.value as File);
    } else if (source.type === SourceType.URL) {
        // In a real app, this would be a backend call to fetch and parse the URL.
        // We'll mock it here.
        console.warn("URL fetching is mocked. Using placeholder text.");
        text = `This is placeholder text for the URL: ${source.value}. In a real application, a backend service would fetch the URL content. This service would handle various data-sharing agreements. For example, your data may be sold to third parties. Subscription services may auto-renew unless you perform a hard-to-find cancellation process.`;
    }

    if (!text.trim()) {
        throw new Error("Could not extract any text from the provided source.");
    }
    
    const chunks = chunkText(text);
    if (chunks.length === 0) {
        throw new Error("Document is too short to be analyzed.");
    }

    const chunkAnalysisPromises = chunks.map((chunk, index) => analyzeChunk(chunk, index));
    const chunkResults = await Promise.all(chunkAnalysisPromises);
    
    const finalReport = await aggregateResults(chunkResults, source, text);

    return finalReport;
}
