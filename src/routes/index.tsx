import { RouteObject, createBrowserRouter } from 'react-router-dom'

import NotFound from '~/components/NotFound'
import AuthLayout from '~/layouts/AuthLayout'

const routers: RouteObject[] = [
  {
    path: '/auth',
    errorElement: <NotFound />,
    children: [
      {
        path: 'login',
        lazy: () => import('~/pages/SignIn')
      },
      {
        path: 'register',
        lazy: () => import('~/pages/Register')
      }
    ]
  },
  {
    path: '/',
    errorElement: <NotFound />,
    element: <AuthLayout />,
    children: [
      {
        index: true,
        lazy: () => import('~/pages/HomePage')
      },
      {
        path: 'category',
        children: [
          {
            index: true,
            lazy: () => import('~/pages/CategoryPage')
          }
        ]
      },
      {
        path: 'product',
        children: [
          {
            index: true,
            lazy: () => import('~/pages/ProductPage')
          }
        ]
      }
    ]
  },
  { path: '*', element: <NotFound /> }
]

// eslint-disable-next-line react-refresh/only-export-components
export default createBrowserRouter(routers)
