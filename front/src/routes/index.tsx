import { Routes, Route } from 'react-router-dom'
import { Login } from '../pages/login'
import { SignUp } from '../pages/signup'
import Home from './../index'

const Router: React.FC = () => (
  <Routes>
    <Route path='/login' element={ <Login /> } />
    <Route path='/temp' element={ <Home /> } />
    <Route path='/signup' element={ <SignUp /> } />
  </Routes>
)
export default Router