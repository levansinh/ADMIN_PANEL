import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../Header'
import SideBar from '../SideBar'
import { useEffect } from 'react'
import { PATH_AUTH } from '../../routes/path'

export default function AuthLayout() {
  const token = localStorage.getItem('accessToken') || ''
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) navigate(PATH_AUTH.login)
  })
  return (
    <div className='flex'>
      <SideBar />
      <div className='section-after-sticky bg-[#F3F2F7] flex-1 px-8 py-5'>
        <Header />
        <Outlet />
      </div>
    </div>
  )
}
