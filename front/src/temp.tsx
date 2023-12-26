import { SetStateAction, useEffect, useState } from "react";
import { api } from "./services/API";
import {} from "react-hook-form";
import { useForm } from "react-hook-form";
import { useAuth } from "./context/AuthContext";
interface Costumer {
  id: number;
  name: string;
  contact: string;
}

interface User {
  id: number;
  uuid: string;
  name: string;
  login: string;
  email: string;
}
interface FormValues {
  name: string;
  contact: string;
}

export default function Temp() {
  const [costumers, setCostumers] = useState<Costumer[]>([]);
  const [user, setUser] = useState<User[]>([]);
  const [value, setValue] = useState(0);
  const { register, handleSubmit } = useForm<FormValues>();
  const { logout } = useAuth();
  const userJson = JSON.parse(localStorage.getItem("@App:user") || "{}");

  function handleLogout() {
    logout();
  }
  const onSubmit = (data: FormValues) => {
    api
      .post(`costumer`, data)
      .then(() => {
        setValue((c) => c + 1);
        alert("Registro salvo com sucesso");
      })
      .catch(() => alert("ERRO AO SALVAR"));
  };

  useEffect(() => {
    api.get(`costumer`).then((res: any) => {
      // const costumer = res.data;
      setCostumers(res.data);
    });
    api.get(`users/`).then((res: any) => {
      const user = res.data;
      setUser(user);
    });
  }, [value]);
  return (
    <div>
      <h1>TESTE</h1>
      {costumers.map((costumer) => {
        return (
          <div key={costumer.id}>
            <label>{costumer.name}</label>
            <label>{costumer.contact}</label>
          </div>
        );
      })}

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("name")} />
        <input type="text" {...register("contact")} />
        <button></button>
      </form>
      {user.map((u) => {
        return (
          <div key={u.id}>
            <input type="text" placeholder={u.name} />
            <input type="text" placeholder={u.login} />
            <input type="text" placeholder={u.email} />
            <input type="text" placeholder={u.uuid} />
          </div>
        );
      })}
      <button
        onClick={handleLogout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Sair
      </button>
    </div>
  );
}
