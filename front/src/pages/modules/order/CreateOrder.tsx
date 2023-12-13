import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Creatable from "react-select/creatable";
import { api } from "../../../../services/API";
import { Notification } from "../../../utils/Notification";
import CurrencyInput, { CurrencyInputProps } from "react-currency-input-field";
import { ConfirmButton } from "../../../components/ConfirmButton";

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
    // TODO: refactor page layout. make more beautiful
    <>
      <form className="mx-auto max-w-md" action="$" onSubmit={handleSubmit(onSubmit)}>
        <h4 className="text-2xl text-gray-900 font-bold dark:text-white">
          Cliente
        </h4>
        <select
          {...register("id_costumer", {
            setValueAs: (v) => parseFloat(v),
          })}
          id="select-costumer"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option disabled>Escolha um cliente</option>
          {costumers.map((costumer) => {
            return (
              <option key={costumer.id} value={costumer.id}>
                {costumer.name}
              </option>
            );
          })}
        </select>
        <h4 className="text-2xl text-gray-900 font-bold dark:text-white">
          Bolo
        </h4>
        <select
          {...register("id_cake", { setValueAs: (v) => parseFloat(v) })}
          id="select-cake"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>Selecione</option>
          {cakes.map((cake) => {
            return (
              <optgroup key={cake.id} label={`Bolo ${cake.theme}`}>
                <option value={cake.id}>
                  Massa: {cake.dough}; Recheio: {cake.filling}; Nome topo:{" "}
                  {cake.name_top}
                </option>
              </optgroup>
            );
          })}
        </select>
        <h4 className="text-2xl text-gray-900 font-bold dark:text-white">
          Preço
        </h4>
        <CurrencyInput
          {...register("price", {
            setValueAs: (v) =>
              parseFloat(v.replace("R$", "").replace(",", ".")),
          })}
          placeholder="R$ 00,00"
          prefix="R$ "
          decimalSeparator=","
          groupSeparator="."
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <h4 className="text-2xl text-gray-900 font-bold dark:text-white">
          Data de entrega
        </h4>
        <input
          {...register("delivery_date")}
          type="datetime-local"
          className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></input>
        <div className="text-center">
          <ConfirmButton text="Cadastrar Pedido"
           crud={true}/>

        </div>
      </form>
    </>
  );
}
