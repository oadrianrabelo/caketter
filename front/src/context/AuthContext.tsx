import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/API";
import { Notification } from "../utils/Notification";
type SignInData = {
  email: string;
  password: string;
};

interface Props {
  children: React.ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  access_token: string;
  uuid: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  login: (credentials: SignInData) => Promise<void>;
  logout(): void;
  loadingAuth: boolean;
  loading: boolean;
  error: string;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = localStorage.getItem("@App:user");
      const storagedToken = localStorage.getItem("@App:token");

      if (storagedToken && storagedUser) {
        setUser(JSON.parse(storagedUser));
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${storagedToken}`;
      }
      setLoading(false);
    }
    loadStoragedData();
  }, []);


  async function login({ email, password }: SignInData) {
    try {
      const response = await api.post("/auth/signin", {
        email: email,
        password: password,
      });
      const {
        id,
        name,
        access_token,
        email: _email,
        uuid,
        nivel,
      } = response.data;
      const data = {
        id,
        name,
        email,
        access_token,
        uuid,
      };

      //Injeta os dados do usuario no localStorage
      setUser(data);
      localStorage.setItem("@App:user", JSON.stringify(data));
      localStorage.setItem("@App:token", access_token);

      //Injeta no header de autorização do usuario o access_token para identificar user por requisição.
      api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      setError("");
      Notification.fire({
        icon: "success",
        title: `Bem Vindo!`,
      });
      navigate("/orders");
      setLoading(false);
    } catch (err: any) {
      if (err.response && err.response.data) {
        Notification.fire({
          icon: "error",
          title: err.response.data.message || "Erro de autenticação",
        });
      } else {
        Notification.fire({
          icon: "error",
          title: `Credenciais Incorretas`,
        });
      }
    }
  }

  function logout() {
    try {
      setLoadingAuth(true);
      localStorage.clear();
      setUser(null);
      navigate("/");
    } catch (e: any) {
      console.error("Error during logout", error);
      setError(e.response.data.message);
    } finally {
      setLoadingAuth(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        login,
        logout,
        loadingAuth,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext };

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useUserContext was used outside of its Provider");
  }

  return context;
};
