import { useEffect, useRef, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useDispatch , useSelector} from 'react-redux';
import { ADD , UPDATE } from '../slices/cartSlice';

function BasicExample(props) {

  // Dispatch is used to call action
  let dispatch = useDispatch();
  // Using useSelector the state of the cart is loaded at the data
  let data = useSelector(state=>state.cart);

  // It can be used to store a mutable value that does not cause a re-render when updated. It can be used to access a DOM element directly.
  const priceRef = useRef();

  let options = props.options;
  // It gives the array which have only keys of the options object
  let priceOptions = Object.keys(options);

  // It has the data coming from home (home madhe backend kadun alela)
  let foodItem = props.foodItems;

  let [quantity , setQuantity] = useState(1);
  let [size , setSize] = useState("");
  
  // When we click add to cart this function is called
  const HandleAddToCart = async () =>{

    // hya card chi id la data madhlya saglya id sobat compare karnar same ali tar break karnar
    let food = [];
    for(const item of data){
      if(item.id === foodItem._id){
        food = item;
        break;
      }
    }

    // Means the item which on we clicked add to cart is already present in the cart
    if(food !== []){
      // If their size means like half===half then update the same objet
      if(food.size === size){
        await dispatch(UPDATE({id : foodItem._id , quantity : quantity , price : finalPrice}))
        return
      }

      // If their size is not same then add another object to the database
      else if (food.size !== size){
        await dispatch(ADD({id : foodItem._id , name : foodItem.name , size : size , quantity : quantity , price : finalPrice}));
        return
      }
      return
    }

    // It is executed when the object is not present at the database
    // Like we create a object for the first time
    await dispatch(ADD({id : foodItem._id , name : foodItem.name , size : size , quantity : quantity , price : finalPrice}));

    // console.log("This is data ", data);
  }

  // jevdhi quantity ahe ti multiply honar price sobat according to size
  let finalPrice = quantity * parseInt(options[size]);
  
  useEffect(()=>{
    setSize(priceRef.current.value); 
  }, [])

  return (
    <Card className="p-2" style={{ height: "330px", width: '18rem', backgroundColor: "cyan" }} >

      <Card.Img style={{ height: "140px", objectFit: "fill" }} variant="top" src={foodItem.img} />
 
      <Card.Body>
        <Card.Title>{foodItem.name}</Card.Title>

        <div className='container w-100' style={{ width: '10px' }}>
          <select className='m-2 h-100 bg-success rounded-2' onChange={(e)=>setQuantity(e.target.value)}> 
            {
              Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}> {i + 1} </option>
                )
              })
            }
          </select>

          <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
            {
              priceOptions.map((data) => {
                return <option key={data} value={data}>{data}</option>
              })
            }
          </select>

          <div className='d-inline h-100 fs-5'>
           ₹{finalPrice}/-
          </div>

        </div>

        <hr></hr>

        <button className='btn btn-success justify-center ms-2' onClick={HandleAddToCart}> Add To Cart </button>

      </Card.Body>

    </Card>
  );
}

export default BasicExample;


// data ek late chaltay