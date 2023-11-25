import store from '~/redux/store'
import { CurrentUser } from '~/services/types/auth.type'
export default function Information() {
  const currentUser = store.getState().auth.currentUser as CurrentUser
  const fullname = currentUser.lastName + currentUser.firstName
  return (
    <div className='flex items-center justify-center gap-x-3'>
      <span className='font-thin'>
        Hello <span className='font-bold'>{fullname && fullname}</span>
      </span>
      <div className='flex items-center justify-center bg-white w-[56px] h-[56px] rounded-full overflow-hidden '>
        <img
          src='https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg'
          alt='avatar'
          className='w-[45px] h-[45px] rounded-full '
        />
      </div>
    </div>
  )
}
