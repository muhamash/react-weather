import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import { FetchProvider } from './components//context/FetchProvider.jsx'
import { FavoriteProvider } from './components/context/FavoriteProvider.jsx'
import { RainProvider } from './components/context/RainProvider.jsx'
import './index.css'

const queryClient = new QueryClient();

ReactDOM.createRoot( document.getElementById( 'root' ) ).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={ queryClient }>
        <FetchProvider>
          <RainProvider>
            <FavoriteProvider>
              <App />
            </FavoriteProvider>
          </RainProvider>
        </FetchProvider>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
);
