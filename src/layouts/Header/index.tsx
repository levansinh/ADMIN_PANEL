import Action from './Action'
import Information from './Information'
import Search from './Search'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function Header() {
  const showModalSearch = () => {}
  return (
    <div className='flex items-center justify-between '>
      <div className=''>
        <div className='hidden md:block'>
          <Search />
        </div>
        <div
          className='md:hidden w-9 h-9 rounded-full bg-white flex items-center justify-center hover:cursor-pointer'
          onClick={showModalSearch}
        >
          <MagnifyingGlassIcon className='w-5 h-5 ' />
        </div>
      </div>
      <div className=''>
        <Action />
      </div>
      <div className='min-w-[200px]'>
        <Information />
      </div>
    </div>
  )
}
