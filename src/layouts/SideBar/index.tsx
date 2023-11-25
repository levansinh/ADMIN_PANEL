import { Link } from 'react-router-dom'
import { PATH_ADMIN } from '../../routes/path'
import { HiChartPie, HiInbox, HiShoppingBag, HiUser } from 'react-icons/hi'
import { Sidebar } from 'flowbite-react'

const listSideBar = [
  { display: 'Category', path: PATH_ADMIN.category.index },
  { display: 'Product', path: PATH_ADMIN.product.index },
  { display: 'Order', path: PATH_ADMIN.order.index },
  { display: 'Review', path: PATH_ADMIN.review.index }
]
export default function NavBar() {
  return (
    <div className='flex flex-col gap-y-5 min-w-[200px] relative h-screen md:min-w-[250px] overflow-y-scroll [&::-webkit-scrollbar]:hidden '>
      <Sidebar aria-label='Sidebar with multi-level dropdown example'>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href='#' icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Collapse icon={HiShoppingBag} label='E-commerce'>
              {listSideBar.map((item, index) => (
                <Link key={index} to={item.path}>
                  <div className='px-3 py-1 text-base hover:bg-[#f3f4f6] rounded-md'>{item.display}</div>
                </Link>
              ))}
            </Sidebar.Collapse>
            <Sidebar.Item href='#' icon={HiInbox}>
              Inbox
            </Sidebar.Item>
            <Sidebar.Item href='#' icon={HiUser}>
              Users
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  )
}
