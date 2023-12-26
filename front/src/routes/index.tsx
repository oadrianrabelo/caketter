import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/login";
import Home from "../pages/home";
import Costumers from '../pages/modules/costumer/Costumers';
import { CreateCostumer } from '../pages/modules/costumer/CreateCostumer';
import { CreateCake } from '../pages/modules/cake/CreateCake';
import { Cakes } from "../pages/modules/cake/Cakes";
import { Orders } from "../pages/modules/order/Orders";
import { CreateOrder } from "../pages/modules/order/CreateOrder";
import Temp from "../temp";
import SignUpUser from "../pages/SignUpUser";

const Router: React.FC = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/temp" element={<Temp />} />
    <Route path="/home" element={<Home />} />
    <Route path="/signup" element={<SignUpUser />} />
    <Route path="/costumers" element={<Costumers />} />
    <Route path="/costumer/create" element={<CreateCostumer />} />
    <Route path="/cakes" element={<Cakes />} />
    <Route path="/cake/create" element={<CreateCake />} />
    <Route path="/orders" element={<Orders />} />
    <Route path="/order/create" element={<CreateOrder />} />
  </Routes>
);
export default Router;
