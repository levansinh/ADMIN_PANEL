import { Button, Modal } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
interface Props {
  content: string
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  onDelete: () => void
}
function ModalDelete({ content, openModal, setOpenModal, onDelete }: Props) {
  const handleDelete = () => {
    onDelete()
    setOpenModal(false)
  }
  return (
    <>
      <Modal show={openModal} size='md' onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this {content}?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={() => handleDelete()}>
                {"Yes, I'm sure"}
              </Button>
              <Button color='gray' onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalDelete
