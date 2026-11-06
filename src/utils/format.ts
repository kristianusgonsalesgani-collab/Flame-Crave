export function formatPrice(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function generateUid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}
