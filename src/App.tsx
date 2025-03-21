import { AppRoutes } from './routes/Routes'
import { Provider } from 'react-redux'
import store from './redux/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </QueryClientProvider>
  )
}

export default App
