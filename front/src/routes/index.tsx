import { Routes, Route } from 'react-router-dom'
import Home from './../index'

const Router: React.FC = () => (
  <Routes>
    <Route path='/' element={ <Home /> } />
  </Routes>
)
export default Router