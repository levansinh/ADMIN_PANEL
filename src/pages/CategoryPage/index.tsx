import { HiTrash, HiPencil } from 'react-icons/hi'
import { Modal } from 'flowbite-react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getCategorise, createCategory, deleteCategory, updateCategory } from '~/services/category.services'
import { CategoryType } from './types'
import ModalDelete from '~/components/ModalDelete'
import AddCategoryForm from './Add'
import EditCategoryForm from './Edit'

const initialState = {
  _id: '',
  name: ''
}

function CategoryPage() {
  const [openModalCreate, setOpenModalCreate] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [idCategory, setIdCategory] = useState('')
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [dataCategory, setDataCategory] = useState<CategoryType>(initialState)

  useQuery({
    queryKey: ['getCategories'],
    queryFn: () => getCategorise(),
    onSuccess: ({ data }) => setCategories(data)
  })

  const categoryCreate = useMutation({
    mutationFn: (data: object) => createCategory(data),
    onSuccess: () => {
      toast.success('Create Successfully')
    }
  })
  const categoryDelete = useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      toast.success('Category deleted successfully')
    }
  })
  const categoryUpdate = useMutation({
    mutationFn: (data: object) => updateCategory(data, idCategory),
    onSuccess: () => {
      toast.success('Update Successfully')
    }
  })

  const onSubmitCreate = (data: object) => {
    categoryCreate.mutate(data)
  }

  const onSubmitUpdate = (data: object) => {
    categoryUpdate.mutate(data)
  }
  const handleOpenModalEdit = (data: CategoryType) => {
    if (data) {
      setOpenModalEdit(true)
      setDataCategory(data)
      setIdCategory(data._id)
    }
  }
  const handleDelete = () => categoryDelete.mutate(idCategory)

  const handleOpenModalDelete = (id: string) => {
    setIdCategory(id)
    setOpenModalDelete(true)
  }
  return (
    <div>
      <h1 className='text-2xl font-bold text-center py-4'>List Category</h1>
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
                Name
              </th>
              <th scope='col' className='px-6 py-3'></th>
              <th scope='col' className='px-6 py-3'></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item) => (
              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700' key={item._id}>
                <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  {item.name}
                </th>
                <td className='px-6 py-4'>
                  <button
                    onClick={() => {
                      handleOpenModalEdit(item)
                    }}
                    className='px-2 py-1 bg-blue-400 my-4 border-hidden rounded-md text-white text-sm'
                  >
                    <HiPencil />
                  </button>
                </td>
                <td className='px-6 py-4'>
                  <button
                    onClick={() => {
                      handleOpenModalDelete(item._id)
                    }}
                    className='px-2 py-1 bg-red-400 my-4 border-hidden rounded-md text-white text-sm'
                  >
                    <HiTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={openModalCreate} onClose={() => setOpenModalCreate(false)}>
        <Modal.Header>Create Category</Modal.Header>
        <Modal.Body>
          <AddCategoryForm onCreateCategory={onSubmitCreate} setOpenModalCreate={setOpenModalCreate} />
        </Modal.Body>
      </Modal>

      <Modal show={openModalEdit} onClose={() => setOpenModalEdit(false)}>
        <Modal.Header>Edit Category</Modal.Header>
        <Modal.Body>
          <EditCategoryForm
            onUpdateCategory={onSubmitUpdate}
            dataCategory={dataCategory}
            setOpenModalEdit={setOpenModalEdit}
          />
        </Modal.Body>
      </Modal>

      <ModalDelete
        onDelete={() => handleDelete()}
        content='Category'
        openModal={openModalDelete}
        setOpenModal={setOpenModalDelete}
      />
    </div>
  )
}
export const Component = CategoryPage
