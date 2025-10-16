export interface BookingForm {
  // 旅客信息
  travelers: Traveler[]
  
  // 联系信息
  contactName: string
  contactEmail: string
  contactPhone: string
  country: string
  
  // 预订详情
  destinationId: string
  packageType: 'economy' | 'standard' | 'luxury'
  departureDate: string
  adults: number
  children: number
  
  // 特殊需求
  specialRequests?: string
  
  // 优惠券
  couponCode?: string
}

export interface Traveler {
  name: string
  idType: string
  idNumber: string
}

export interface BookingOrder {
  orderId: string
  destination: string
  departureDate: string
  travelers: number
  packageType: string
  totalPrice: number
  status: 'pending' | 'confirmed' | 'cancelled'
  createdAt: string
}
