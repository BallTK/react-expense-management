import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ExpenseManagementPage } from './pages/expense-management-page'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ExpenseManagementPage/>
    </QueryClientProvider>
  
  )
}

export default App
