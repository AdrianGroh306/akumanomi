import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { DevilFruitsProvider } from './context/DevilFruitsContext.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <DevilFruitsProvider>
          <App />
        </DevilFruitsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
