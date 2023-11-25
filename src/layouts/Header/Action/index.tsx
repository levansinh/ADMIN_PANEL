import { Link } from 'react-router-dom'
import { BellAlertIcon, GifIcon, EnvelopeIcon, Cog8ToothIcon } from '@heroicons/react/24/outline'

const listAction = [
  { icon: <BellAlertIcon className='text-[#46A6DF] w-5 h-5' />, quantity: 12, path: '' },
  { icon: <GifIcon className='text-[#46A6DF] w-5 h-5' />, quantity: 12, path: '' },
  { icon: <EnvelopeIcon className='text-[#46A6DF] w-5 h-5' />, quantity: 12, path: '' },
  { icon: <Cog8ToothIcon className='text-[#46A6DF] w-5 h-5' />, quantity: 12, path: '' }
]
export default function Action() {
  return (
    <div className='flex items-center justify-between gap-x-3'>
      {listAction.map(({ icon, path }, index) => (
        <Link to={path} key={index} className={`w-9 h-9 bg-[#D5E5F3] rounded-full flex items-center justify-center`}>
          {icon}
          {/* <div className='text-white bg-[#46A6DF] text-[8px] absolute rounded-full px-1 py-0.5'>{quantity}</div> */}
        </Link>
      ))}
    </div>
  )
}
