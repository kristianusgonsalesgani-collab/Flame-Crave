export type CategoryId =
  | 'all'
  | 'pizza'
  | 'burger'
  | 'fried-chicken'
  | 'side-dish'
  | 'promotional'

export interface Category {
  id: CategoryId
  name: string
  icon: string
}

export interface Variant {
  id: string
  name: string
  priceDelta: number
}

export interface VariantGroup {
  id: string
  label: string
  type: 'single' | 'multi'
  required: boolean
  options: Variant[]
}

export interface Product {
  id: string
  name: string
  category: Exclude<CategoryId, 'all'>
  categoryLabel: string
  description: string
  image: string
  price: number
  basePrice: number
  variants: VariantGroup[]
  available: boolean
  popular: boolean
  bestSeller: boolean
  promo: boolean
  discount?: number
  badge?: string
}

export interface CartItem {
  uid: string
  productId: string
  name: string
  image: string
  unitPrice: number
  quantity: number
  selectedVariants: Record<string, string[]>
  variantSummary: string
  notes: string
  available: boolean
}
