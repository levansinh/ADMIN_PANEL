export interface UseSubmitProduct {
  name: string
  categoryId: string
  price: number
  image: string[]
  rating: number
  color: string[]
  size: string[]
  description: string
}
export interface Image {
  url: string;
  publicId: string;
}
export interface ProductType {
  _id: string
  name: string
  categoryId: string
  price: number
  image: Image[]
  rating: number
  color: string[]
  size: string[]
  description: string
  slug: string
}
