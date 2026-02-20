import { useState } from 'react'
import './App.css'  
import Header from './Components/Header'
import  Products  from './Pages/Products'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CartPage from './Pages/CartPage';
import { Checkout } from './Pages/Checkout';
import ProtectedRoute from './Components/ProtectedRoute.jsx';



function App() {
  //lifting state up
  const[search,setSearch]  = useState("");
  const[isLoggedin, setIsLoggedin] = useState(true);

  return (
    <>
    {/* <Products search={search} /> */}

    <BrowserRouter>
    <Header search={search} setSearch={setSearch}/>
    <Routes>
      <Route path='/' element={<Products search={search} />}/>
      <Route path='/cart' element={<CartPage/>}/>

      <Route path='/checkout' element={
        <ProtectedRoute isLoggedin={isLoggedin}>
          <Checkout />

        </ProtectedRoute>
      
      }/>
      
    </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App





