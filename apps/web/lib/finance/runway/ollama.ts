import type { ExtractedFinancials } from './types'

const BASE = 'http://localhost:11434'

export interface OllamaModel {
  name: string
  size: number
  details?: {
    parameter_size?: string
    family?: string
    quantization_level?: string
  }
}

export async function checkOllama(): Promise<boolean> {
  try {
    const res = await fetch(`${BASE}/api/version`, {
      signal: AbortSignal.timeout(2000),
    })
    return res.ok
  } catch {
    return false
  }
}

export async function listModels(): Promise<OllamaModel[]> {
  const res = await fetch(`${BASE}/api/tags`, {
    signal: AbortSignal.timeout(5000),
  })
  if (!res.ok) throw new Error(`Cannot list Ollama models (${res.status})`)
  const data = (await res.json()) as { models: OllamaModel[] }
  return data.models ?? []
}

const EXTRACTION_PROMPT = (description: string) =>
  `Extract startup financial data. Return ONLY a JSON object, no other text.

Description: "${description}"

Extract (all in USD):
- startingCash: cash/funding available today ($2M → 2000000)
- monthlyBurn: monthly operating expenses (team of 8 with no explicit burn → ~$96000)
- monthlyRevenue: current MRR (ARR ÷ 12, use 0 if pre-revenue)
- confidence: "high" if all 3 found, "medium" if 2, "low" if 0-1
- explanation: one sentence summary of what was extracted
- missing: array of field names not found or not estimable

Return exactly this JSON:
{"startingCash":number|null,"monthlyBurn":number|null,"monthlyRevenue":number|null,"confidence":"high"|"medium"|"low","explanation":"...","missing":["..."]}`

export async function extractFinancialsLocal(
  description: string,
  model: string
): Promise<ExtractedFinancials> {
  const res = await fetch(`${BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      format: 'json',
      stream: false,
      messages: [{ role: 'user', content: EXTRACTION_PROMPT(description) }],
    }),
  })

  if (!res.ok) throw new Error(`Ollama returned ${res.status} ${res.statusText}`)
  const data = (await res.json()) as { message: { content: string } }
  const cleaned = data.message.content.replace(/```(?:json)?\n?|\n?```/g, '').trim()
  return JSON.parse(cleaned) as ExtractedFinancials
}
