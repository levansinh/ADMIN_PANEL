import { useEffect, useState } from 'react'
import { HiTrash, HiPencil } from 'react-icons/hi'
import { Modal, Button, Label, TextInput, Select, Textarea, Checkbox } from 'flowbite-react'
import { toast } from 'react-toastify'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'

import { getProducts, createProduct, updateProduct, deleteProduct } from '~/services/product.services'
import { getCategorise } from '~/services/category.services'
import { ProductType, UseSubmitProduct } from './types'
import ModalDelete from '~/components/ModalDelete'
import { CategoryType } from '../CategoryPage/types'
import AddForm from './Add'

function ProductPage() {
  const [openModalCreate, setOpenModalCreate] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [idProduct, setIdProduct] = useState('')
  const [products, setProducts] = useState<ProductType[]>([])
  const [dataProduct, setDataProduct] = useState<Omit<ProductType, 'image'>>()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<UseSubmitProduct>({
    defaultValues: dataProduct
  })
  const { name, price, description, image } = errors

  useEffect(() => {
    if (dataProduct) {
      setValue('name', dataProduct.name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataProduct])

  useQuery({
    queryKey: ['getProducts'],
    queryFn: () => getProducts(),
    onSuccess: ({ data }) => setProducts(data)
  })

  const { data: dataCategories = [] } = useQuery({
    queryKey: ['getCategorise'],
    queryFn: () => getCategorise(),
    select: ({ data }) => data
  })
  const productCreate = useMutation({
    mutationFn: (data: object) => createProduct(data),
    onSuccess: () => {}
  })
  const productDelete = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      toast.success('Product deleted successfully')
    }
  })
  const productUpdate = useMutation({
    mutationFn: (data: object) => updateProduct(data, idProduct)
  })

  const onSubmitCreate = (data: object) => {
    productCreate.mutate(data)
  }
  const onSubmitUpdate: SubmitHandler<UseSubmitProduct> = (data) => {
    productUpdate.mutate(data)
    reset()
    setOpenModalEdit(false)
    toast.success('Update Successfully')
  }
  const handleOpenModalEdit = (data: ProductType) => {
    if (data) {
      setOpenModalEdit(true)
      setDataProduct(data)
      setIdProduct(data._id)
    }
  }
  const handleDelete = () => productDelete.mutate(idProduct)

  const handleOpenModalDelete = (id: string) => {
    setIdProduct(id)
    setOpenModalDelete(true)
  }

  return (
    <div>
      <h1 className='text-2xl font-bold text-center py-4'>List Product</h1>
      <div className=''>
        <div className='text-right'>
          <button
            onClick={() => setOpenModalCreate(true)}
            className='px-4 py-2 bg-green-400 my-4 border-hidden rounded-md text-white text-sm'
          >
            Create
          </button>
        </div>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Category
              </th>
              <th scope='col' className='px-6 py-3'>
                Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Image
              </th>
              <th scope='col' className='px-6 py-3'>
                Price
              </th>
              <th scope='col' className='px-6 py-3'></th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700' key={item._id}>
                <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  {item.categoryId}
                </th>
                <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  {item.name}
                </th>
                <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  <img src={item.image[0].url} alt='' className='w-[200px] h-[100px] object-cover' />
                </th>
                <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  {item.price}
                </th>
                <th className='px-6 py-4 whitespace-nowrap'>
                  <button
                    onClick={() => {
                      handleOpenModalEdit(item)
                    }}
                    className='px-2 py-1 bg-blue-400 my-4 border-hidden rounded-md text-white text-sm mr-3'
                  >
                    <HiPencil />
                  </button>
                  <button
                    onClick={() => {
                      handleOpenModalDelete(item._id)
                    }}
                    className='px-2 py-1 bg-red-400 my-4 border-hidden rounded-md text-white text-sm'
                  >
                    <HiTrash />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={openModalCreate} onClose={() => setOpenModalCreate(false)}>
        <Modal.Header>Create Product</Modal.Header>
        <Modal.Body>
          <AddForm onCreateProduct={onSubmitCreate} setOpenModalCreate={setOpenModalCreate} data={dataCategories} />
        </Modal.Body>
      </Modal>

      <Modal show={openModalEdit} onClose={() => setOpenModalEdit(false)}>
        <Modal.Header>Edit Category</Modal.Header>
        <Modal.Body>
          <form action='' onSubmit={handleSubmit(onSubmitUpdate)}>
            <div className='flex max-w-md flex-col gap-4'>
              <div>
                <div className='mb-2 block'>
                  <Label htmlFor='countries' value='Select your country' />
                </div>
                <Select id='countries' required {...register('categoryId')}>
                  <option value='All Categories'>All Categories</option>
                  {dataCategories.map((item: CategoryType) => (
                    <option value={item._id} key={item._id}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <div className='mb-2 block'>
                  <Label htmlFor='small' value='Name Product' />
                </div>
                <TextInput id='small' type='text' sizing='sm' {...register('name', { required: true })} />
                {name && <span className='text-xs text-red-400'>This field is required</span>}
              </div>
              <div>
                <div className='mb-2 block'>
                  <Label htmlFor='small' value='Image' />
                </div>
                <TextInput id='small' type='text' sizing='sm' {...register('image', { required: true })} />
                {image && <span className='text-xs text-red-400'>This field is required</span>}
              </div>
              <div>
                <div className='mb-2 block'>
                  <Label htmlFor='small' value='Price' />
                </div>
                <TextInput id='small' type='text' sizing='sm' {...register('price', { required: true })} />
                {price && <span className='text-xs text-red-400'>This field is required</span>}
              </div>
              <div>
                <div className='mb-2 block'>
                  <Label htmlFor='small' value='Size' />
                </div>
                <div className='flex items-center justify-around'>
                  <div className='flex items-center gap-2'>
                    <Checkbox id='XL' value='XL' {...register('size')} />
                    <Label htmlFor='XL' className='flex'>
                      XL
                    </Label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Checkbox id='L' value='L' {...register('size')} />
                    <Label htmlFor='L' className='flex'>
                      L
                    </Label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Checkbox value='S' {...register('size')} />
                    <Label className='flex'>S</Label>
                  </div>
                </div>
              </div>
              <div>
                <div className='mb-2 block'>
                  <Label htmlFor='small' value='Color' />
                </div>
                <div className='flex items-center justify-around'>
                  <div className='flex items-center gap-2'>
                    <Checkbox value='red' {...register('color')} />
                    <Label className='flex'>red</Label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Checkbox value='blue' {...register('color')} />
                    <Label className='flex' value='blue'>
                      blue
                    </Label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Checkbox value='yellow' {...register('color')} />
                    <Label className='flex' value='yellow'>
                      yellow
                    </Label>
                  </div>
                </div>
              </div>
              <div>
                <div className='mb-2 block'>
                  <Label htmlFor='small' value='Description' />
                </div>
                <Textarea rows={4} id='small' {...register('description', { required: true })} />
                {description && <span className='text-xs text-red-400'>This field is required</span>}
              </div>
            </div>
            <div className='flex items-center gap-x-3 my-4'>
              <Button color='green' type='submit'>
                Update
              </Button>
              <Button color='gray' onClick={() => setOpenModalCreate(false)}>
                Go Back
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <ModalDelete
        onDelete={() => handleDelete()}
        content='Product'
        openModal={openModalDelete}
        setOpenModal={setOpenModalDelete}
      />
    </div>
  )
}
export const Component = ProductPage
