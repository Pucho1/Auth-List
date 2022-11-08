import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import UserManage from './pages/user/UserManage';
import UserRegister  from './pages/UserRegister';
import Layout from './components/Layout';
import { useAuthStore } from './store/AuthContext';
import { InnerSpinner } from './components/sppiner/sppiner';

const App: React.FC = () =>{
  const authStore = useAuthStore();

  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            <Route path="/register" element={<UserRegister />} />
            {authStore.isAuthenticated ?
            <>
              <Route path="/user" element={<UserManage /> } />
            </>
            : null
            }
            <Route path="/" element={<Auth />} />
            <Route path="*" element={<Auth />} />
          </Routes>
        </Layout>
      </Router>
      <InnerSpinner />
    </div>
  );
}

export default App;
