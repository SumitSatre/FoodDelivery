import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    geolocation: '',
  });

  const handleSubmit = async (event) => {
    // The preventDefault() method is used to prevent the browser from executing the default action of the selected element.
    event.preventDefault();
    console.log("This is event ", event);

    const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      alert('Submitted Successfully🥳🥳');
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("userEmail", credentials.email);
      navigate("/");
    }
    else {
      alert("Please!! Enter Valid Information🥰🥰");
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
            <label htmlFor='name' className='form-label'>
              Name
            </label>
            <input
              type='text'
              className='form-control'
              name='name'
              value={credentials.name}
              onChange={onChange}
            />
          </div>

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

          <div className='mb-3'>
            <label htmlFor='exampleInputPassword1' className='form-label'>
              Address
            </label>
            <input
              type='text'
              className='form-control'
              id='exampleInputPassword1'
              name='geolocation'
              value={credentials.geolocation}
              onChange={onChange}
            />
          </div>

          <button type='submit' className='btn btn-primary'>
            Submit
          </button>

          <Link to={'/login'} className='m-3 btn btn-success'>
            Login
          </Link>
        </form>
      </div>
    </>
  );
}

