import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const storagedToken = localStorage.getItem("@App:token");
  useEffect(() => {
    if (!storagedToken && location.pathname !== '/signup') {
      navigate("/")
    } else if (!storagedToken) {
      navigate('/signup')
    } else {
      navigate("/temp");
    }
  }, [storagedToken]);
  return children;
};
