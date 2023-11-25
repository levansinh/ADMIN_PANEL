import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MagnifyingGlassIcon, ArrowPathIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { UserSubmit, Data } from './types'

export default function Search() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [isFetching, setIsFetching] = useState(true)
  const {
    register,
    handleSubmit
    // formState: { errors },
  } = useForm<UserSubmit>()
  const onSubmit = (data: Data) => {
    console.log(data)
  }
  const handleClear = () => {}
  return (
    <form action='' onSubmit={handleSubmit(onSubmit)} className=''>
      <div className='bg-white py-2 px-4 min-w-[500px] max-w-[600px] flex gap-x-4 items-center'>
        <input
          type='text'
          value={searchValue}
          {...register('search', {
            onChange: (e) => setSearchValue(e.currentTarget.value)
          })}
          placeholder='Search here...'
          className='w-full outline-none text-sm md:text-base'
        />
        {!!searchValue && !isFetching && <XMarkIcon className='h-5 w-5 cursor-pointer' onClick={handleClear} />}
        {isLoading && <ArrowPathIcon className='animate-spin text-[#c7c4c4] h-5 w-5 ' />}
        <MagnifyingGlassIcon className='w-6 h-6' />
      </div>
    </form>
  )
}
