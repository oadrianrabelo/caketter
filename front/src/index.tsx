import { useEffect, useState } from "react";
import { api } from "../services/API";
import {} from "react-hook-form";
import { useForm } from "react-hook-form";
import { useAuth } from './context/AuthContext';
interface Costumer {
  id: number;
  name: string;
  contact: string;
}
interface FormValues {
  name: string;
  contact: string;
}

export default function Home() {
  const [costumers, setCostumers] = useState<Costumer[]>([]);
  const [value, setValue] = useState(0);
  const { register, handleSubmit } = useForm<FormValues>();
  const { logout } = useAuth();

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
    api.get(`costumer`).then((res) => {
      // const costumer = res.data;
      setCostumers(res.data);
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
        <button>botao</button>
      </form>

      <button 
      onClick={handleLogout}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Sair
      </button>
    </div>
  );
}
