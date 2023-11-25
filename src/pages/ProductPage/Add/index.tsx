import { Button, Checkbox, Label, Select, TextInput, Textarea } from 'flowbite-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CategoryType } from '~/pages/CategoryPage/types'
import { UseSubmitProduct } from '../types'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

interface Props {
  onCreateProduct: (data: object) => void
  setOpenModalCreate: React.Dispatch<React.SetStateAction<boolean>>
  data: CategoryType[]
}

export default function AddForm({ onCreateProduct, setOpenModalCreate, data }: Props) {
  const [file, setFile] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UseSubmitProduct>()
  const { name, price, description, image } = errors
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUploadImage = async (e: any) => {
    setFile(e.target.files[0])
  }
  const onSubmitCreate: SubmitHandler<UseSubmitProduct> = async (data) => {
    try {
      const formData = new FormData()
      formData.append('images', file)
      const uploadResponse = await axios.post(`${import.meta.env.VITE_REACT_API_URL}image/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(uploadResponse)
      onCreateProduct({ ...data, image: uploadResponse.data.data })
      reset()
      setOpenModalCreate(false)
      toast.success('Create Successfully')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form action='' onSubmit={handleSubmit(onSubmitCreate)}>
      <div className='flex max-w-md flex-col gap-4'>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='countries' value='Select your country' />
          </div>
          <Select id='countries' required {...register('categoryId')}>
            <option value='All Categories'>All Categories</option>
            {data.map((item: CategoryType) => (
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
          <TextInput
            id='small'
            {...register('image', { required: true })}
            type='file'
            sizing='sm'
            multiple
            onChange={handleUploadImage}
          />
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
          Create
        </Button>
        <Button color='gray' onClick={() => setOpenModalCreate(false)}>
          Go Back
        </Button>
      </div>
    </form>
  )
}
