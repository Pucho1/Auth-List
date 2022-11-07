import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import UserManage from './pages/user/UserManage';
import UserRegister  from './pages/UserRegister';
import Tes  from './pages/Test';
import Layout from './components/Layout';
import { useAuthStore } from './store/AuthContext';

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
              <Route path="/test" element={<Tes />} />
              <Route path="/user" element={<UserManage /> } />
            </>
            : null
            }
            <Route path="/" element={<Auth />} />
            <Route path="*" element={<Auth />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
