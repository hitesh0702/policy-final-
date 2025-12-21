
// A simple text chunking strategy.
// In a production app, this could be more sophisticated (e.g., sentence-aware).
const CHUNK_SIZE = 4000; // Characters per chunk
const CHUNK_OVERLAP = 200; // Characters to overlap between chunks

export function chunkText(text: string): string[] {
  if (!text) return [];

  const chunks: string[] = [];
  let startIndex = 0;

  while (startIndex < text.length) {
    const endIndex = Math.min(startIndex + CHUNK_SIZE, text.length);
    chunks.push(text.slice(startIndex, endIndex));
    startIndex += CHUNK_SIZE - CHUNK_OVERLAP;
  }

  return chunks;
}
