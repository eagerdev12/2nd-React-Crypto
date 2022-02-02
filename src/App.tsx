import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from "react-router-dom";
import Routes from '../src/routers/router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      cacheTime: 0,
    },
  },
})


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes />
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
