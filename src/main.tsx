import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { DevilFruitsProvider } from './context/DevilFruitsContext.tsx'
import { CharactersProvider } from './context/CharactersContext.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <DevilFruitsProvider>
          <CharactersProvider>
            <App />
          </CharactersProvider>
        </DevilFruitsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
