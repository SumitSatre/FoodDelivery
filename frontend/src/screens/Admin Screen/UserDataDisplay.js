import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

export default function UserDataDisplay() {
  const [data, setData] = useState([]);
  const [userStatus, setUserStatus] = useState('');

  const GetUserData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/getUserData` , {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const responseData = await response.json();

      if (responseData.success) {
        setData(responseData.Userdata);
      } else {
        console.log('Failed to fetch user data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetUserData();
  }, [userStatus]);

  const deleteUser = async (email) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/deleteUser`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const responseData = await response.json();

      if (responseData.success) {
        alert("Deleted Successfully!!");
        setData(prevData => prevData.filter(user => user.email !== email));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserAdminStatus = async (email) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/updateUserAdminStatus`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          userStatus: !userStatus
        })
      });

      const responseData = await response.json();

      if (responseData.success) {
        setUserStatus(!userStatus);
        alert(`${email} is ${!userStatus ? "User" : "Admin"} Now`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ height: '645px', overflow: 'scroll' }}>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Location</th>
              <th scope='col'>Date</th>
              <th scope='col'>User Status</th>
              <th scope='col'>Change Status</th>
              <th scope='col'></th>
            </tr>
          </thead>

          <tbody>
            {data.map((user, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.location}</td>
                <td>{user.date}</td>
                <td>{user.isAdmin ? "Admin" : "User"}</td>

                <td>
                  <Button onClick={() => updateUserAdminStatus(user.email)}>
                    {user.isAdmin ? "Make User" : "Make Admin"}
                  </Button>
                </td>

                <td>
                  <button type='button' className='btn p-0' onClick={() => deleteUser(user.email)} >
                   Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
