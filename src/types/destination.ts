export interface Destination {
  id: string
  name: string
  location: string
  description: string
  shortDescription: string
  price: number
  rating: number
  image: string
  images: string[]
  tags: string[]
  highlights: string[]
  includes: string[]
  excludes: string[]
  itinerary: ItineraryDay[]
  reviews: Review[]
}

export interface ItineraryDay {
  day: number
  title: string
  description: string
  activities: string[]
}

export interface Review {
  id: string
  userName: string
  userAvatar: string
  rating: number
  comment: string
  date: string
}

export interface FilterOptions {
  region?: string
  priceRange?: [number, number]
  type?: string
}

export enum SortOption {
  PRICE_LOW = 'price-low',
  PRICE_HIGH = 'price-high',
  RATING = 'rating',
  POPULAR = 'popular',
}
