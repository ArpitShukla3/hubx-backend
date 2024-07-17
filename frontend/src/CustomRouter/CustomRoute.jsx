import { Route, Routes } from 'react-router-dom'
import Auth from '../Componets/Auth'
import Signup from '../Componets/Signup'
import HomePage from '../Componets/HomePage'

const CustomRoute = () => {
  return (
    <Routes>
        <Route path='/login' element={<Auth/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<HomePage/>}/>
    </Routes>
  )
}

export default CustomRoute