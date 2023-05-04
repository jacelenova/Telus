import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { Layout } from './components/layout';
import { AuthContextProvider } from './contexts/auth-context';
import { AppRoutes } from './routes/app-routes';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  library.add(fas, faTrash, faEdit);

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Layout>
          <AppRoutes></AppRoutes>
        </Layout>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App;