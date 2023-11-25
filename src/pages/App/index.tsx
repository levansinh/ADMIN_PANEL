import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import routes from '~/routes'

export default function App() {
  return (
    //fallback={<LoadingScreen />}
    <Suspense>
      {/* <LoadingIndicator /> */}
      <RouterProvider router={routes} />
    </Suspense>
  )
}
