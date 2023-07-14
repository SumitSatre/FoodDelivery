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

// orders collection madhe at the end store hote