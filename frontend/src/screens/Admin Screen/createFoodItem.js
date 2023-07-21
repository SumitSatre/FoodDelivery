import React from 'react'
import { Card, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function CreateFoodItem() {

  const [foodCategoryData, setFoodCategoryData] = useState([]);

  const [foodItemName, setFoodItemName] = useState("");
  const [foodCategory, setFoodCategory] = useState("Veg");
  const [priceHalf, setPriceHalf] = useState();
  const [priceFull, setPriceFull] = useState();
  const [image, setImage] = useState("");

  const createFoodItem = async () => {
    let responce = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/createFoodItem`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: foodItemName,
        CategoryName: foodCategory,
        img: image,
        halfPrice: priceHalf,
        fullPrice: priceFull
      })
    });

    const responceData = await responce.json();

    /*responceData that is coming from the api that is array first success second Category Data
     third Items Data */
    if (!responceData.success) {
      return alert("There is some internal issue!!");
    }

  }

  const loadData = async () => {
    let responce = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/foodData`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const responceData = await responce.json();

    /*responceData that is coming from the api that is array first success second Category Data
     third Items Data */
    if (!responceData[0].success) {
      return alert("There is some internal issue!!");
    }

    setFoodCategoryData(responceData[1]);
    console.log(foodCategoryData);
  }
  /* The useEffect hook is called in a component after the first render and every time the component
   updates */
  useEffect(() => {
    loadData();
  });


  const printData = () => {
    let printdata = JSON.stringify({
      name: foodItemName,
      CategoryName: foodCategory,
      img: image,
      halfPrice: priceHalf,
      fullPrice: priceFull
    });

    console.log(printdata);
  }

  return (
    <>
      <Card>
        <Card.Header style={{ backgroundColor: '#333', color: '#fff' }}>Create Food Item</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group style={{ marginTop: "15px" }}>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name of food item" onChange={(event) => setFoodItemName(event.target.value)} />
            </Form.Group>

            <Form.Group style={{ marginTop: "15px" }}>
              <Form.Label> Food Category : </Form.Label>
              {
                foodCategoryData !== 0 ?
                  <select className='m-3 h-200 bg-success rounded-2' onChange={(e) => {setFoodCategory(e.target.value);console.log(e.target.value)}}>
                    {
                      foodCategoryData.map((e, i) => {
                        return (
                          <option key={i + 1} value={e.CategoryName}> {e.CategoryName} </option>
                        )
                      })
                    }
                  </select>
                  :
                  ""
              }

            </Form.Group>

            <Form.Group style={{ marginTop: "15px" }}>
              <Form.Label>Image</Form.Label>
              <Form.Control as="textarea" placeholder="Enter Image Link" onChange={(event) => setImage(event.target.value)} />
            </Form.Group>

            <Form.Group style={{ marginTop: "15px" }}>
              <Form.Label>Price/Half</Form.Label>
              <Form.Control type="number" placeholder="Enter price" onChange={(event) => setPriceHalf(event.target.value.toString())} />
            </Form.Group>

            <Form.Group style={{ marginTop: "15px" }}>
              <Form.Label>Price/Full</Form.Label>
              <Form.Control type="number" placeholder="Enter price" onChange={(event) => setPriceFull(event.target.value.toString())} />
            </Form.Group>

            <Button variant="primary" type="submit" style={{ backgroundColor: '#333', marginTop: "20px" }} onClick={() => {createFoodItem(); printData()}} >
              Create
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}
