import React, { useEffect, useState} from 'react'; //, { useState, useRef }
// import userService from '../../services/user/userService';
import { User } from '../../types/Types';
import DTableComponent from '../../components/tables/DTableComponent';


const UserManage = () =>{
  const [users, setUsers] = useState<Array<User>>([]);
  

    
  return (
      <div className="user">
        <h1 style={{ textAlign: 'center' }}>Gestion de usuarios</h1>

        <DTableComponent />

        
      </div>
    );
};
export default UserManage;
