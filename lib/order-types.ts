export interface OrderItem {
  id: string
  name: string
  price: number
  weight: string
  image: string
  quantity: number
}

export interface CustomerInfo {
  name: string
  phone: string
  city: string
  address: string
  notes?: string
}

export interface Order {
  id: string
  items: OrderItem[]
  subtotal: number
  deliveryFee: number
  total: number
  paymentMethod: "COD" | "BANK_TRANSFER" | "CARD" | string
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  customer: CustomerInfo
  createdAt: string
}

export interface NewOrderInput {
  items: OrderItem[]
  customer: CustomerInfo
  paymentMethod?: Order["paymentMethod"]
}
