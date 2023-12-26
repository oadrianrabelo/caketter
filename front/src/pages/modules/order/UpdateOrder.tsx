import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../../services/API";
import { Notification } from "../../../utils/Notification";
import { Modal } from "../../../components/Modal";
import { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { ConfirmButton } from "../../../components/ConfirmButton";

interface OrderProps {
  id: number;
}

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
  id: number;
  id_costumer: number;
  id_cake: number;
  price: number;
  cake: Cake;
  costumer: Costumer;
  delivery_date: String;
  created_at: Date;
  updated_at: Date;
}

export function UpdateOrder({ id }: OrderProps) {
  const { register, handleSubmit, setValue } = useForm<Order>();
  const [costumers, setCostumers] = useState<Costumer[]>([]);
  const [cakes, setCakes] = useState<Cake[]>([]);

  const onSubmit = (fn: () => void) => {
    const submit: SubmitHandler<Order> = async (data) => {
      try {
        await api.put(`order/edit/${id}`, {
          delivery_date: data.delivery_date,
          id_cake: data.id_cake,
          id_costumer: data.id_costumer,
          price: data.price,
        });
        Notification.fire({
          icon: "success",
          title: "Pedido alterado com sucesso!",
        });
        window.location.reload(), 4000;
        fn();
      } catch (err: any) {
        Notification.fire({
          icon: "error",
          title: err.message,
        });
      }
    };
    return submit;
  };
  useEffect(() => {
    api.get(`costumer`).then((res) => {
      setCostumers(res.data);
    });
    api.get(`cakes`).then((res) => {
      setCakes(res.data);
    });
  }, []);
  const loadData = () => {
    api.get<Order>(`order/${id}`).then((res) => {
      setValue("price", res.data.price);
      setValue("id_cake", res.data.cake.id);
      setValue("id_costumer", res.data.costumer.id),
      setValue("price", res.data.price);
      setValue("delivery_date", res.data.delivery_date.substring(0, 16));
    });
  };

  return (
    <Modal onOpen={loadData}>
      {({ handleCloseModal }) => {
        return (
          <>
            <div className="max-w-5xl mx-auto bg-white p-16">
              <form onSubmit={handleSubmit(onSubmit(handleCloseModal))}>
                <div className="grid xl:grid-cols-2 xl:gap-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Cliente
                    </label>
                    <select
                      {...register("id_costumer", {
                        setValueAs: (v) => parseFloat(v),
                      })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">
                      Bolo
                    </label>
                    <select
                      {...register("id_cake", {
                        setValueAs: (v) => parseFloat(v),
                      })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                      <option disabled>Escolha um bolo</option>
                      {cakes.map((cake) => {
                        return (
                          <optgroup key={cake.id} label={`Bolo ${cake.id}`}>
                            <option value={cake.id}>
                              Massa: {cake.dough}; Recheio: {cake.filling}; Nome
                              topo: {cake.name_top}
                            </option>
                          </optgroup>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Preço
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">R$</span>
                      </div>
                      <input
                        {...register("price", {
                          setValueAs: (v) => parseFloat(v),
                        })}
                        type="number"
                        className="pl-7 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="0.00"
                        step={0.01}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">
                      Data de entrega
                    </label>
                    <input
                      {...register("delivery_date")}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      type="datetime-local"
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-5">
                  <ConfirmButton text="Confirmar"/>
                </div>
              </form>
            </div>
          </>
        );
      }}
    </Modal>
  );
}
