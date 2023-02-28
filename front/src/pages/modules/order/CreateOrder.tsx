import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Creatable from "react-select/creatable";
import { api } from "../../../../services/API";
import { Notification } from "../../../utils/Notification";

interface Costumer {
  id: number;
  name: string;
  contact: string;
  created_at: Date;
  updated_at: Date;
}
interface Cake {
  id: number;
  dough: string;
  filling: string;
  size: number;
  theme: string;
  name_top: string;
  age_top: string;
  created_at: Date;
  updated_at: Date;
}

interface Order {
  id_cake: number;
  id_costumer: number;
  price: number;
}
interface IFormOrder {
  id_cake: number;
  id_costumer: number;
  price: number;
  delivery_date: Date;
}

export function CreateOrder() {
  const [costumers, setCostumers] = useState<Costumer[]>([]);
  const [cakes, setCakes] = useState<Cake[]>([]);
  const { register, handleSubmit } = useForm<IFormOrder>();
  const navigate = useNavigate();

  const onSubmit = (data: IFormOrder) => {
    api
      .post(`order/create`, data)
      .then(() => {
        Notification.fire({
          icon: "success",
          title: `Pedido cadastrado com sucesso!`,
        });
        navigate("/orders");
      })
      .catch((err: any) => {
        Notification.fire({
          icon: "error",
          title: `Erro ao cadastrar pedido`,
          text: err,
        });
      });
  };
  useEffect(() => {
    api.get(`costumer`).then((res: any) => {
      setCostumers(res.data);
    });
    api.get(`cakes`).then((res) => {
      setCakes(res.data);
    });
  }, []);
  return (
    <>
      <form action="$" onSubmit={handleSubmit(onSubmit)}>
        <h1>Cliente</h1>
        <select
          {...register("id_costumer", {
            setValueAs: (v) => parseFloat(v),
          })}
          id="select-costumer"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option disabled selected>
            Escolha um cliente
          </option>
          {costumers.map((costumer) => {
            return (
              <option key={costumer.id} value={costumer.id}>
                {costumer.name}
              </option>
            );
          })}
        </select>
        <h1>Bolo</h1>
        <select
          {...register("id_cake", { setValueAs: (v) => parseFloat(v) })}
          id="select-cake"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option disabled selected>
            Escolha um bolo
          </option>
          {cakes.map((cake) => {
            return (
              <optgroup key={cake.id} label={`Bolo ${cake.id}`}>
                <option value={cake.id}>
                  Massa: {cake.dough}; Recheio: {cake.filling}; Nome topo:{" "}
                  {cake.name_top}
                </option>
              </optgroup>
            );
          })}
        </select>
        <h1>Preço</h1>
        <input
          {...register("price", { setValueAs: (v) => parseFloat(v) })}
          type="number"
        />
        <h1>Data de entrega</h1>
        <input {...register("delivery_date")} type="datetime-local"></input>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Criar pedido
        </button>
      </form>
    </>
  );
}
