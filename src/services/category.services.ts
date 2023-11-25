import Service from '.'

export const getCategorise = () => Service.get(`category`)
export const getCategory = (id: string) => Service.get(`category/${id}`)
export const createCategory = (data: object) => Service.post('category', data)
export const updateCategory = (data: object, id: string) => Service.put(`category/${id}`, data)
export const deleteCategory = (id: string) => Service.delete(`category/${id}`)