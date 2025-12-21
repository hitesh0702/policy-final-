
export enum SourceType {
  URL = 'url',
  PDF = 'pdf',
  TEXT = 'text',
}

export type Risk = {
  risk_id: string;
  risk_type: string;
  risk_label: string;
  severity: 'low' | 'medium' | 'high';
  confidence: number;
  excerpt: string;
  source_refs: { chunk_id: string; page?: number }[];
  suggested_action: string;
};

export type ContactInfo = {
  support_email?: string;
  support_phone?: string;
  cancellation_link?: string;
};

export type Report = {
  report_id: string;
  source: { type: SourceType; value: string };
  language: string;
  tldr: string;
  score: number;
  score_rationale: string;
  risks: Risk[];
  actions: { title: string; description: string }[];
  contact_info: ContactInfo;
  raw_text_hash: string;
  model_version: string;
  created_at: string;
};

export type ChunkExtraction = {
  risk_type: string;
  risk_label: string;
  excerpt: string;
  confidence: number;
  suggested_action: string;
};

export type ChunkAnalysisResult = {
  chunk_id: string;
  tldr: string;
  chunk_score: number;
  rationale: string;
  extractions: ChunkExtraction[];
};
