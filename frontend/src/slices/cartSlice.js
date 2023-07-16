import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    // InitialState is array so we push objects in it
    ADD: (state, action) => {
      state.push({
        id: action.payload.id,
        name: action.payload.name,
        size: action.payload.size,
        quantity: action.payload.quantity,
        price: action.payload.price
      });
    },

    // payload madhun ek index yenar tya index la remove karun takaych
    // It is used in Cart page to delete any object (row)
    REMOVE : (state , action)=>{
      return state.filter((item , index) => index !== action.payload.index);
    },

    /* if the item is already present on the my cart page same new push karaychi garaj nahi just tyachya
     quantity and price madhe new add karaych */
    UPDATE : (state , action)=>{
      let arr = [...state];
      arr.find((food , index)=>{
        if(food.id === action.payload.id){
          arr[index] = {...food , quantity : parseInt(action.payload.quantity) + food.quantity , price: action.payload.price + food.price}
        }
        return true; 
      })
      return arr;
    },

    // initial state la empty karnar when it is pushed to the database
    DROP : (state , action)=>{
      let arr = [];
      return arr;
    }

  },
});

export const { ADD , REMOVE ,UPDATE , DROP} = cartSlice.actions;

export default cartSlice.reducer;


// If we create initialState object we cannot map it 
// Therefore , to map it we use array


/* 
For a user first initial State is empty 

add to cart zalyavr 
1. tya madhe ek object push honar
2. jar object already present asel tar initialState madhe tar to update donar
  
  third when we click on cart initialState cha data cart page var disnar

  There is option to remove a object from initialState in cart 

  When we click on the checkOut InitialState is pushed to the database and cart is empty

  */

// on check out orders collection madhe at the end store hote