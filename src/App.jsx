import { useState } from 'react'
import './App.css'  
import Header from './Components/Header'
import  Products  from './Pages/Products'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CartPage from './cart/CartPage';



function App() {
  //lifting state up
  const[search,setSearch]  = useState("");

  return (
    <>
    {/* <Products search={search} /> */}

    <BrowserRouter>
    <Header search={search} setSearch={setSearch}/>
    <Routes>
      <Route path='/' element={<Products search={search} />}/>
      <Route path='/cart' element={<CartPage/>}/>
    </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App





