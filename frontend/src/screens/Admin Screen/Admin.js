import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap';
import CreateFoodItem from './createFoodItem';
import FoodItemsDisplay from './FoodItemsDisplay';
import UserDataDisplay from './UserDataDisplay';

const AdminPage = () => {
  const [activePage, setActivePage] = useState('foodItems');

  const handleButtonClick = (page) => {
    setActivePage(page);
  };

  const renderPageContent = () => {
    if (activePage === 'foodItems') {
      return (
        <div>
          <h2 style={{ color: '#333' }}>Food Items Page</h2>
          <FoodItemsDisplay />
        </div>
      );
    } 
    else if (activePage === 'users') {
      return (
        <div>
          <h2 style={{ color: '#333' }}>Users Page</h2>
          <UserDataDisplay />
        </div>
      );
    } 
    else if (activePage === 'createFoodItem') {
      return (
        <div>
          <CreateFoodItem />
        </div>
      );
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "20px 0 20px 0" }}>HungryHub : Eat Something Special</h2>
      <Container fluid style={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
        <Row>
          <Col md={2}>
            <Card>
              <Card.Header style={{ backgroundColor: '#333', color: '#fff' }}>Admin Panel</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item
                  active={activePage === 'foodItems'}
                  onClick={() => handleButtonClick('foodItems')}
                  style={{ backgroundColor: activePage === 'foodItems' ? '#666' : '#f9f9f9', color: activePage === 'foodItems' ? '#fff' : '#333' }}
                >
                  Food Items
                </ListGroup.Item>

                <ListGroup.Item
                  active={activePage === 'users'}
                  onClick={() => handleButtonClick('users')}
                  style={{ backgroundColor: activePage === 'users' ? '#666' : '#f9f9f9', color: activePage === 'users' ? '#fff' : '#333' }}
                >
                  Users
                </ListGroup.Item>

                <ListGroup.Item
                  active={activePage === 'createFoodItem'}
                  onClick={() => handleButtonClick('createFoodItem')}
                  style={{ backgroundColor: activePage === 'createFoodItem' ? '#666' : '#f9f9f9', color: activePage === 'createFoodItem' ? '#fff' : '#333' }}
                >
                  Create Food Item
                </ListGroup.Item>

              </ListGroup>
            </Card>
          </Col>
          <Col md={10} style={{ paddingTop: '20px' }}>
            {renderPageContent()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminPage;
