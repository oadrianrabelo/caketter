import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Creatable from "react-select/creatable";
import { api } from "../../../../services/API";
import { Notification } from "../../../utils/Notification";
import { SelectCostumer } from "./components/SelectCostumer";

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
        <h1>Costumer</h1>
        <select id="select-costumer">
          {costumers.map((costumer) => {
            return (
              <option
                {...register("id_costumer", {
                  setValueAs: (v) => parseFloat(v),
                })}
                key={costumer.id}
                value={costumer.id}
              >
                {costumer.name}
              </option>
            );
          })}
        </select>
        <h1>Cake</h1>
        <select
          {...register("id_cake", { setValueAs: (v) => parseFloat(v) })}
          id="select-cake"
        >
          {cakes.map((cake) => {
            return (
              <option key={cake.id} value={cake.id}>
                {cake.dough};{cake.filling};{cake.name_top}
              </option>
            );
          })}
        </select>
        <input
          {...register("price", { setValueAs: (v) => parseFloat(v) })}
          type="number"
        />
        <input
          {...register("delivery_date")}
          type="datetime-local"
        ></input>
        <button type="submit">teste</button>
      </form>
    </>
  );
}
