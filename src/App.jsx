
import { useState } from 'react'
import './App.css'  
import Header from './Components/Header'
import  Products  from './Pages/Products'



function App() {
  //lifting state up
  const[search,setSearch]  = useState("");

  return (
    <>
   
    <Header search={search} setSearch={setSearch}/>
   
    <Products search={search} />
    </>
  )
}

export default App





