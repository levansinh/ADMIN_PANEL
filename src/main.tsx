import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';

import App from './pages/App'
import './index.css'
import store from './redux/store'
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </QueryClientProvider>
)
