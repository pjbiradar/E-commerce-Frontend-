import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    items: [],   //this defines whats inside the slice store
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
            console.log(action.payload);
            state.items.push({...action.payload, quantity: 1})
        }


     },
     //remove the item from the cart
     
     
     removeTheItemfromCart(state,action){

        state.items = state.items.filter((item)=>item.id != action.payload)
        
     },


     
     IncreaseTheITemQty(state,action){
        const increaseItem = state.items.find((item)=>item.id === action.payload)
        if(increaseItem) {
            increaseItem.quantity += 1
        }
     },

     DecreaseTheItemQty(state,action){
        const decreaseItem = state.items.find((item)=>item.id === action.payload)
        if(decreaseItem && decreaseItem.quantity > 1){
            decreaseItem.quantity -= 1;
        }

     },

     clearCart(state){
        state.items =[]

     }

    }
})
// console.log("cart reducer loaded");


export const {addToCart,removeTheItemfromCart,IncreaseTheITemQty,DecreaseTheItemQty,clearCart} = cartSlice.actions;
export default cartSlice.reducer;