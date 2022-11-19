import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/login";
import { SignUp } from "../pages/signup";
import Home from "./../index";
import Costumers from '../pages/modules/costumer/Costumers';
import { CreateCostumer } from '../pages/modules/costumer/CreateCostumer';
import { CreateCake } from '../pages/modules/cake/CreateCake';
import { Cakes } from "../pages/modules/cake/Cakes";
import { Orders } from "../pages/modules/order/Orders";

const Router: React.FC = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/temp" element={<Home />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/costumers" element={<Costumers />} />
    <Route path="/costumer/create" element={<CreateCostumer />} />
    <Route path="/cakes" element={<Cakes />} />
    <Route path="/cake/create" element={<CreateCake />} />
    <Route path="/orders" element={<Orders />} />
  </Routes>
);
export default Router;
