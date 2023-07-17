import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Crousel from '../components/Crousel'
import "../CSS/home.css";
import { useSelector  } from 'react-redux';

export default function Home() {

  const [foodCategoryData, setFoodCategoryData] = useState([]);
  const [foodItemsdata, setfoodItemsdata] = useState([]);

  let serachText = useSelector(state => state.search);

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
    setfoodItemsdata(responceData[2]);

  }
 /* The useEffect hook is called in a component after the first render and every time the component
  updates */
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="navbar-container" >
        <Navbar />
      </div>

      <div className="carousel-container">
        <Crousel />
      </div>

      <div className='m-5'>
        {
          foodCategoryData !== []
            ? foodCategoryData.map((data, index) => {
              return (
                <div className='row mb-3'>
                  <div key={data._id} className='category-title fs-3 m-3'> {data.CategoryName} </div>
                  <hr />

                  {foodItemsdata !== []
                    ? (
                      foodItemsdata.filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(serachText.toLowerCase()))
                        .map((filteredItem) => {
                          return (
                            <div key={filteredItem._id} className='card-container col-12 col-md-6 col-lg-3'>
                              <Card foodItems = {filteredItem}
                                options={filteredItem.options[0]}
                              />
                            </div>
                          )
                        })
                    )
                    :
                    <div>"No Such Data Found" </div>}

                </div>
              )
            })

            : "There is No Data Present!!"
        }
      </div>
      <div> <Footer /> </div>
    </>

  )
}

/* first we map the categorydata according to the product category the products who have the same 
category are arranged then for each item we use card its all details is passed to the card 
  For every items details like name ,id , img , CategoryName , options are coming from backend then send 
individually to the card
*/