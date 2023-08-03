import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../../../services/API";
import { Notification } from "../../../utils/Notification";
import { Modal } from "../../../components/Modal";
import { useEffect, useState } from "react";

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
  delivery_date: Date;
  created_at: Date;
  updated_at: Date;
}


export function UpdateOrder({ id }: OrderProps) {
  const { register, handleSubmit, setValue } = useForm<Order>();
  const [costumers, setCostumers] = useState<Costumer[]>([]);
  const [cakes, setCakes] = useState<Cake[]>([]);

  const onSubmite = (fn: () => void) => {
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
      setValue("delivery_date", res.data.delivery_date);
      setValue("id_cake", res.data.cake.id);
      setValue("id_costumer", res.data.costumer.id),
      setValue("price", res.data.price);
      console.log(res.data.delivery_date)
    });
  };

  return (
    <Modal onOpen={loadData}>
      {({ handleCloseModal }) => {
        return (
          <>
            <div className="max-w-5xl mx-auto bg-white p-16">
              <form onSubmit={handleSubmit(onSubmite(handleCloseModal))}>
                <div className="grid xl:grid-cols-2 xl:gap-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      Cliente
                    </label>
                    <select
                      {...register("id_costumer", {
                        setValueAs: (v) => parseFloat(v),
                      })}
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
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      Bolo
                    </label>
                    <select
                      {...register("id_cake", {
                        setValueAs: (v) => parseFloat(v),
                      })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      Preço
                    </label>
                    <input
                      {...register("price", {
                        setValueAs: (v) => parseFloat(v),
                      })}
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      Data de entrega
                    </label>
                    <input
                      {...register("delivery_date")}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="datetime-local"
                    />
                  </div>
                  <button className="w-full h-full text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Confirmar
                  </button>
                </div>
              </form>
            </div>
          </>
        );
      }}
    </Modal>
  );
}
