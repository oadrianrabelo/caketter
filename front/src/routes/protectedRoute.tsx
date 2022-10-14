import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const storagedToken = localStorage.getItem("@App:token");
  useEffect(() => {
    if (!storagedToken) {
      navigate("/login");
    } else {
      navigate("/temp");
    }
  }, [storagedToken]);
  return children;
};
