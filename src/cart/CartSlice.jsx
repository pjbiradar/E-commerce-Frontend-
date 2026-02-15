import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    items: [],
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{

     addToCart(state,action){
        // console.log(state.items+"before clicking")
        const exists = state.items.find((item)=>
        item.id === action.payload.id
        
        )   

        
        if(exists){
            // console.log("hehe")
            exists.quantity += 1
        }
        else{
            state.items.push({...action.payload, quantity: 1})
        }


     }

    }
})
// console.log("cart reducer loaded");


export const {addToCart} = cartSlice.actions;
export default cartSlice.reducer;