import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/API";
import { Notification } from "../../../utils/Notification";
import CurrencyInput, { CurrencyInputProps } from "react-currency-input-field";
import { ConfirmButton } from "../../../components/ConfirmButton";
import { useAuth } from "../../../context/AuthContext";
import CaketterLogo from "../../../assets/1x/SVG/logo-without-text.svg";

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
  user_uuid: string;
}

export function CreateOrder() {
  const [costumers, setCostumers] = useState<Costumer[]>([]);
  const [cakes, setCakes] = useState<Cake[]>([]);
  const { register, handleSubmit } = useForm<IFormOrder>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const user_uuid = user?.uuid;

  const onSubmit = (data: IFormOrder) => {
    api
      .post(`order/create`, 
      {
        id_cake: data.id_cake,
        id_costumer: data.id_costumer,
        price: data.price,
        delivery_date: data.delivery_date,
        user_uuid: user_uuid,
      })
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
    api.get(`costumer/user?userUuid=${user?.uuid}`).then((res: any) => {
      setCostumers(res.data);
    });
    api.get(`cakes/user?userUuid=${user?.uuid}`).then((res: any) => {
      setCakes(res.data);
    });
  }, []);
  return (
    <>
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-md space-y-8">
      <div>
      <img
              src={CaketterLogo}
              alt="Caketter"
              className="mx-auto w-24"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Cadastre um pedido
            </h2>
      </div>
      <form className="mx-auto max-w-md" action="$" onSubmit={handleSubmit(onSubmit)}>
        <h4 className="text-2xl text-gray-900 font-bold">
          Cliente
        </h4>
        <select
          {...register("id_costumer", {
            setValueAs: (v) => parseFloat(v),
          })}
          id="select-costumer"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
        <h4 className="text-2xl text-gray-900 font-bold">
          Bolo
        </h4>
        <select
          {...register("id_cake", { setValueAs: (v) => parseFloat(v) })}
          id="select-cake"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option disabled>Selecione</option>
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
        <h4 className="text-2xl text-gray-900 font-bold">
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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        <h4 className="text-2xl text-gray-900 font-bold">
          Data de entrega
        </h4>
        <input
          {...register("delivery_date")}
          type="datetime-local"
          className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        ></input>
        <div className="text-center">
          <ConfirmButton text="Cadastrar Pedido"
           crud={true}/>

        </div>
      </form>
      </div>
      </div>
    </>
  );
}
