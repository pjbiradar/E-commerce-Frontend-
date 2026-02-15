import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "../cart/CartSlice"


//step 1 to create redux store
//We used Redux Toolkit instead of Context API because the cart involves frequent updates
//  and business logic across multiple components. Redux provides better scalability,
//  performance optimization, and debugging support compared to Context API.”

//Redux Toolkit gives us: // Centralized store (single source of truth) // Predictable updates using reducers
// Optimized re-rendering // DevTools for debugging// Scales well as features grow




export const store = configureStore({
    reducer: {
        cart: cartReducer,

    },
})