import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { UseSubmitCategory } from '../types'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Props {
  onCreateCategory: (data: object) => void
  setOpenModalCreate: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddForm({ onCreateCategory, setOpenModalCreate }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UseSubmitCategory>()
  const { name } = errors
  const onSubmitCreate: SubmitHandler<UseSubmitCategory> = (data) => {
    onCreateCategory(data)
    reset()
    setOpenModalCreate(false)
  }
  return (
    <form action='' onSubmit={handleSubmit(onSubmitCreate)}>
      <div className='flex max-w-md flex-col gap-4'>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='small' value='Name Category' />
          </div>
          <TextInput id='small' type='text' sizing='sm' {...register('name', { required: true })} />
          {name && <span className='text-xs text-red-400'>This field is required</span>}
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
