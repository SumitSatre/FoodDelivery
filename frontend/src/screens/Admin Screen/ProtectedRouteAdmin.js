import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Admin from './Admin';

export default function ProtectedRouteAdmin() {

  const UserEmail = localStorage.getItem('userEmail');
  const [UserAdminStatus, setUserAdminStatus] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/getUserData`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: UserEmail,
        }),
      });

      const responseData = await response.json();

      if(responseData.success){
        setUserAdminStatus(responseData.isAdmin);
      }
      
    };

    if (UserEmail) {
      fetchUserData();
    }
  }, [UserEmail]);

  if (UserEmail === null) {
    return <Navigate to="/" />;
  }

  if (UserAdminStatus === null) {
    return <h4>Loading...</h4>; // 
  }

  return UserAdminStatus ? <Admin /> : <Navigate to="/" />;
}
