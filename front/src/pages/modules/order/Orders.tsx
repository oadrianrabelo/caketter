import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../../services/API";
import { formatDate } from "../../../utils/formatDate";
import { UpdateOrder } from "./UpdateOrder";
import HeaderOne from "../../../components/HeaderOne";
import Swal from "sweetalert2";

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
export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [value, setValue] = useState(0);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const searchOrder = (): void => {
    api.get(`orders/search?q=${search}`).then((res: any) => {
      console.log(res.data);
      setOrders(res.data);
    });
  };

  const deleteOrder = async (id: number) => {
    const styledModal = Swal.mixin({
      customClass: {
        confirmButton: "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
        cancelButton: "focus:outline-none text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-900"
      },
      buttonsStyling: false,
    });
    styledModal.fire({
      title: "Deseja excluir este pedido?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await api.delete(`order/delete/${id}`).then(() => {
          setValue((c) => c + 1);
          window.location.reload(), 6000;
        });
        styledModal.fire({
          title: "Pedido excluído com sucesso",
          icon: "success",
          buttonsStyling: false,
          customClass: {
            confirmButton: "focus:outline-none text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-900"
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        styledModal.fire({
          title: "Operação cancelada!",
          icon: "info",
          buttonsStyling: false,
          customClass: {
            confirmButton: "focus:outline-none text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-900"
          }
        });
      }
    });
  }

  useEffect(() => {
    api.get(`orders`).then((res) => {
      setOrders(res.data);
    });
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchOrder();
        }}
      >
        <HeaderOne title="Pedidos" />

        <div className="mb-6">
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="digite algo"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </form>
      <button
        type="button"
        onClick={() => navigate("/order/create")}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Novo pedido
      </button>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6 text-center">
                #
              </th>
              <th scope="col" className="py-2 px-4">
                Bolo
              </th>
              <th scope="col" className="py-2 px-4">
                Cliente
              </th>
              <th scope="col" className="py-1 px-1">
                Preço
              </th>
              <th scope="col" className="py-3 px-6">
                Data de criação
              </th>
              <th scope="col" className="py-3 px-6">
                Última alteração
              </th>
              <th scope="col" className="py-3 px-6">
                Data de entrega
              </th>
              <th scope="col" className="py-3 px-6"></th>
              <th scope="col" className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr
                  key={order.id}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <td className="py-4 px-6">{order.id}</td>
                  <td className="py-2 px-3">
                    <table className="w-full text-sm text-gray-500 dark:text-gray-400">
                      <thead>
                        <tr>
                          <th scope="col" className="py-2 px-1">
                            Massa
                          </th>
                          <th scope="col" className="py-2 px-1">
                            Recheio
                          </th>
                          <th scope="col" className="py-2 px-1">
                            Tamanho
                          </th>
                          <th scope="col" className="py-2 px-1">
                            Nome no topo
                          </th>
                          <th scope="col" className="py-2 px-1">
                            Idade
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        <tr>
                          <td className="py-4 px-1">{order.cake.dough}</td>
                          <td className="py-4 px-1">{order.cake.filling}</td>
                          <td className="py-4 px-1">{order.cake.size}</td>
                          <td className="py-4 px-1">{order.cake.name_top}</td>
                          <td className="py-4 px-1">{order.cake.age_top}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td className="py-2 px-3">
                    <table className="w-full text-sm text-gray-500 dark:text-gray-400">
                      <thead>
                        <tr>
                          <th scope="col" className="py-2 px-1">
                            Nome
                          </th>
                          <th scope="col" className="py-2 px-1">
                            Contato
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        <tr>
                          <td className="py-4 px-1">{order.costumer.name}</td>
                          <td className="py-4 px-1">
                            {order.costumer.contact}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td className="py-1 px-2 text-center">R$ {order.price}</td>
                  <td className="py-1 px-1 text-center">
                    {formatDate(order.created_at)}
                  </td>
                  <td className="py-1 px-1 text-center">
                    {formatDate(order.updated_at)}
                  </td>
                  <td className="py-1 px-1 text-center">
                    {formatDate(order.delivery_date)}
                  </td>
                  <td className="py-1 px-1">
                    <UpdateOrder id={order.id} />
                  </td>
                  <td className="py-1 px-1">
                    <button
                      type="button"
                      onClick={() => deleteOrder(order.id)}
                      className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      EXCLUIR
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
