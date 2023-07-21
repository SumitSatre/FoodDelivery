import React, { useEffect, useState } from 'react'

export default function FoodItemsDisplay() {

  let [data, setData] = useState([]);

  const GetFoodItems = async () => {
    let responce = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/getFoodItems`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    });

    let responceData = await responce.json();

    if (responceData.success) {
      setData(responceData.foodItemsData);
    }
    else {
      console.log('Failed to fetch food items');
    }
  }

  useEffect(() => {
    GetFoodItems();
  }, [data]);
  

  const deleteItem = async (FoodName) => {
  try {
    let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/deleteFoodItems`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: FoodName
      })
    });

    let responseData = await response.json();

    if (responseData.success) {
      alert("Deleted Successfully!!");
      setData(data);
    }
  } catch (error) {
    console.error(error);
  }
};




return (
  <div style={{ height: '645px', overflow: 'scroll' }} >
    <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md' >
      <table className='table table-hover'>
        <thead className='text-success fs-4'>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Image</th>
            <th scope='col'>Name</th>
            <th scope='col'>CategoryName</th>
            <th scope='col'>Price/Half</th>
            <th scope='col'>Price/Full</th>
            <th scope='col'></th>
          </tr>
        </thead>

        <tbody>
          {
            data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td> <img style={{ height: "45px", objectFit: "fill" }} src={food.img} alt='img' />  </td>
                <td>{food.name}</td>
                <td>{food.CategoryName}</td>
                <td>{food.options[0].half}</td>
                <td>{food.options[0].full}</td>
                <td>
                  <button type='button' className='btn p-0' onClick={() =>  deleteItem(food.name) }  >
                     Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>
)
}
