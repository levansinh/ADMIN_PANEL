import { useState, useEffect } from 'react'
import { EyeSlashIcon } from '@heroicons/react/20/solid'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { loginService } from '../../services/auth.services'
import store from '~/redux/store'
export default function SignIn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = localStorage.getItem('accessToken') || ''
  const accessToken = store.getState().auth.accessToken
  const { mutate } = useMutation({
    mutationFn: (data: object) => loginService(data, dispatch, navigate)
  })
  useEffect(() => {
    if (accessToken && token) {
      navigate('/')
    }
  }, [accessToken, token, navigate])
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  // const openModalGoogle = () => {
  //   window.open('http://localhost:5000/admin/auth/google', '_self')
  // }

  const [isShowPassword, setIsShowPassword] = useState(false)
  return (
    <div className='bg-primary h-screen flex items-center justify-center text-white'>
      <form action='' className='w-70 p-5 flex flex-col gap-5' onSubmit={handleSubmit((data) => mutate(data))}>
        <h1 className='text-[48px] font-bold text-center '>Sign in</h1>
        <p className='text-center'>Sign in and start managing your candidates!</p>
        <div className=''>
          <div className='bg-transparent w-full border border-white py-2 px-3 rounded-xl mb-3'>
            <input
              type='email'
              {...register('email', { required: true })}
              placeholder='Email'
              className='bg-transparent w-full outline-none text-sm md:text-base '
            />
          </div>
          <span>{errors.email && <p>Last name is required.</p>}</span>
        </div>
        <div className=''>
          <div className='bg-transparent w-full border border-white py-2 px-3 rounded-xl '>
            <div className='flex items-center justify-between'>
              <input
                type={isShowPassword ? 'text' : 'password'}
                {...register('password', { required: true })}
                placeholder='Password'
                className='bg-transparent w-full outline-none text-sm md:text-base '
              />
              <EyeSlashIcon className='w-5 h-5 cursor-pointer' onClick={() => setIsShowPassword(!isShowPassword)} />
            </div>
          </div>
          <span>{errors.password && <p>Last name is required.</p>}</span>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-between gap-2'>
            <input type='checkbox' />
            <p>Remember me</p>
          </div>
          <p className='text-[#20DF7F]'>Forgot password?</p>
        </div>
        <button
          type='submit'
          // onClick={openModalGoogle}
          className='bg-[#20DF7F] w-full rounded-lg p-3 md:py-3 md:px-4 text-center text-sm md:text-lg'
        >
          Login
        </button>
      </form>
    </div>
  )
}

export const Component = SignIn
