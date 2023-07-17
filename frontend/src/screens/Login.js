import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/loginuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        }),
      });

      if (response.ok) {
        const json = await response.json();

        if (json.success) {
          localStorage.setItem("authToken", json.authToken);
          localStorage.setItem("userEmail", credentials.email);
          navigate("/");
          alert("Logged In Successfully🥳🥳");
        }
        if (!json.success) {
          alert('Please Enter correct Information');
        }
      }
      else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing the request.');
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>

          <div className='mb-3'>
            <label htmlFor='exampleInputEmail1' className='form-label'>
              Email address
            </label>
            <input
              type='email'
              className='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              name='email'
              value={credentials.email}
              onChange={onChange}
            />
            <div id='emailHelp' className='form-text'>
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className='mb-3'>
            <label htmlFor='exampleInputPassword1' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='exampleInputPassword1'
              name='password'
              value={credentials.password}
              onChange={onChange}
            />
          </div>

          <button type='submit' className='m-3 btn btn-primary'>
            Submit
          </button>

          <Button variant="secondary" className="me-2">
            <Link className="nav-link active" to="/createuser">
              SignUp
            </Link>
          </Button>

        </form>
      </div>
    </>
  );
}


// if email is already exist we cannot create a new user -- Add Functionality
