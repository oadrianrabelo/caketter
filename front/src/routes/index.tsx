import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/login";
import { SignUp } from "../pages/signup";
import Home from "./../index";
import { CreateCostumer } from "../pages/modules/costumer/CreateCostumer";

const Router: React.FC = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/temp" element={<Home />} />
    <Route path="/signup" element={<SignUp />} />
  </Routes>
);
export default Router;
