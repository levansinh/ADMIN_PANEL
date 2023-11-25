import { CategoryType, UseSubmitCategory } from '../types'
import { useForm } from 'react-hook-form'
import { Button, Label, TextInput } from 'flowbite-react'

interface Props {
  onUpdateCategory: (data: object) => void
  dataCategory: CategoryType
  setOpenModalEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditCategoryForm({ onUpdateCategory, dataCategory, setOpenModalEdit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UseSubmitCategory>({
    defaultValues: dataCategory
  })

  const { name } = errors

  const onSubmitUpdate = (data: object) => {
    onUpdateCategory(data)
    reset()
    setOpenModalEdit(false)
  }
  return (
    <form action='' onSubmit={handleSubmit(onSubmitUpdate)}>
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
          Update
        </Button>
        <Button color='gray' onClick={() => setOpenModalEdit(false)}>
          Go Back
        </Button>
      </div>
    </form>
  )
}
