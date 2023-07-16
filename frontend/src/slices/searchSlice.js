import { createSlice } from '@reduxjs/toolkit';

const initialState = "";

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {

    OnChange: (state, action) => {
      return action.payload.serachText
    },

    MakeEmpty : (state , action)=>{
      return "";
    }
  }
});

export const { OnChange , MakeEmpty } = searchSlice.actions;

export default searchSlice.reducer;

/*
condition of search in the Home.js 
item.name.toLowerCase().includes(serachText.toLowerCase()) 
*/