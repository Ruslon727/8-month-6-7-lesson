import { Route, Routes } from 'react-router-dom'
import { Basket, Home, Nothing } from '../pages'

const CustomRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/basket' element={<Basket />} />
      <Route path='/nothing' element={<Nothing />} />
    </Routes>
  )
}

export default CustomRoutes