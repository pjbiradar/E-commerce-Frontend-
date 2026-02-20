import { Suspense, lazy, useState } from 'react'
import './App.css'  
import Header from './Components/Header'
// import  Products  from './Pages/Products'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import CartPage from './Pages/CartPage';
// import { Checkout } from './Pages/Checkout';
import ProtectedRoute from './Components/ProtectedRoute.jsx';



function App() {

  const Products =lazy(()=>import ("./Pages/Products"))
  const Cart = lazy(()=>import ("./Pages/CartPage"))
  const Checkout =lazy(()=>import ("./Pages/Checkout"))
  //lifting state up
  const[search,setSearch]  = useState("");
  const[isLoggedin, setIsLoggedin] = useState(false);

  return (
    <>
    {/* <Products search={search} /> */}
    <BrowserRouter>
    <Header search={search} setSearch={setSearch}/>
    <Suspense fallback={<p className='text-center mt-10' >Loading..</p>}>
    <Routes>
      <Route path='/' element={<Products search={search} />}/>
      <Route path='/cart' element={<Cart/>}/>

      <Route path='/checkout' element={
        <ProtectedRoute isLoggedin={isLoggedin}>
          <Checkout />

        </ProtectedRoute>
      
      }/>
      
    </Routes>
    </Suspense>
    
    </BrowserRouter>
    </>
  )
}

export default App





