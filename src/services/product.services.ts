import Service from '../services'

export const getProducts = () => Service.get(`products`)
export const getProduct = (id: string) => Service.get(`products/${id}`)
export const createProduct = (data: object) => Service.post('products', data)
export const updateProduct = (data: object, id: string) => Service.put(`products/${id}`, data)
export const deleteProduct = (id: string) => Service.delete(`products/${id}`)
