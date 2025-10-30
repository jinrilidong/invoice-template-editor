export function escapeHtml(input: unknown): string {
  const s = String(input ?? '')
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Convert plain text with \n to HTML-safe string with <br />
export function toXhtml(input: unknown): string {
  return escapeHtml(input).replace(/\n/g, '<br />')
}
