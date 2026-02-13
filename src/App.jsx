
import { useState } from 'react'
import './App.css'  
import Header from './Components/Header'
import  Products  from './Pages/Products'



function App() {
  //lifting state up
  const[search,setSearch]  = useState("");
  const[cartItems,setCartItems] = useState([]);


  //passing product to cart
  const addToCart = (product)=>{
    setCartItems((prev)=>{
      //here we're checking whether the added product ais present in the our cart list
      const exists = prev.find((item)=>item.id === product.id)

      //if the product is present in the cart then add the quantity or else add
      //If the product is already in the cart:You use .map() to loop through all items.
      //For the matching product (item.id === product.id), you create a new object with the same properties but increase its quantity by 1.
      //For all other items, you just return them unchanged.
     
     
      if(exists){
        return prev.map((item)=>
        item.id === product.id ?
         {...item,quantity:item.quantity +1} : item
         )
      }


      //If the product doesn’t exist(its a new) in the cart:You spread the previous items (...prev) to keep them.Then add the new product with a quantity of 1.
    
      return [...prev, {...product, quantity: 1}];
    
    })


  }
  console.log("Cart items:", cartItems);


  return (
    <>
    <Header search={search} setSearch={setSearch} CartCount = {addToCart.length}/>
    <Products search={search} addToCart={addToCart}/>
    </>
  )
}

export default App
