import React from 'react';
import { Layout } from './components/layout';
import { AuthContextProvider } from './contexts/auth-context';
import { AppRoutes } from './routes/app-routes';
import { Home } from './components/home/home';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Layout>
          <AppRoutes></AppRoutes>
          {/* <Home></Home> */}
        </Layout>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App;