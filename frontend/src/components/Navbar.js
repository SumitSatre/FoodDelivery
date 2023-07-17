import React, { useState } from 'react';
import { Container, Nav, Navbar, Badge , Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function Navbar_func() {

  let data = useSelector(state => state.cart);

  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();

  // When the user LogOut his jwt token is removed from the local storage
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

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

      if (responseData.success) {
        setUserAdminStatus(responseData.isAdmin);
      }

    };

    if (UserEmail) {
      fetchUserData();
    }
  }, [UserEmail]);

  return (
    <>
      <Navbar className='navbar navbar-expand navbar-dark' style={{ backgroundColor: '#088178' }}>
        <Container>
          <Navbar.Brand href='/' className='fs-1 fst-italic'>
            HungryHub
          </Navbar.Brand>
          <Nav className='me-auto'>
            <Link to='/' className='nav-link'>
              Home
            </Link>

            {localStorage.getItem('authToken') ? (
              <Link to='/myorder' className='nav-link active fs-5'>
                MyOrder
              </Link>
            ) : null}
          </Nav>


          { // if authToken is not present in the database then signup and login 
            !localStorage.getItem('authToken') ? (
              <>
                <Button variant='info' className='me-2'>
                  <Link className='nav-link active' to='/createuser'>
                    SignUp
                  </Link>
                </Button>

                <Button variant='info' className='me-2'>
                  <Link className='nav-link active' to='/login'>
                    Login
                  </Link>
                </Button>
              </>
            ) :
              // else Show my cart and log out buttons
              (
                <>
                  <div className='btn text-success bg-white mx-2' onClick={() => setCartView(true)}>
                    <Link className='nav-link active' >
                      My cart
                      <Badge pill bg='info' className='mx-1'>
                        {data.length}
                      </Badge>
                    </Link>
                  </div>

                  {cartView ? (
                    <Modal onClose={() => setCartView(false)}>
                      <Cart />
                    </Modal>
                  ) : null}

                  <div className='btn text-danger bg-white mx-2'>
                    <Link className='nav-link active' onClick={handleLogout}>
                      Log out
                    </Link>
                  </div>
                </>
              )
          }

          {
            UserAdminStatus ?
              (
              <div className='btn text-danger bg-white mx-2'>
                <Link className='nav-link active' to={"/admin"} >
                  Dashboard
                </Link>
              </div>
              ) 
              :
              null
          }

        </Container>
      </Navbar>
    </>
  );
}

export default Navbar_func;

