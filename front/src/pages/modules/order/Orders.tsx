import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/API";
import { formatDate } from "../../../utils/formatDate";
import { UpdateOrder } from "./UpdateOrder";
import { NewButton } from "../../../components/NewButton";
import HeaderOne from "../../../components/HeaderOne";
import Swal from "sweetalert2";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { DeleteButton } from "../../../components/DeleteButton";
import { useAuth } from "../../../context/AuthContext";
import { usePagination } from "../../../components/Pagination";
import PaginationButtons from "../../../components/PaginationButtons";
import { CalendarIcon } from "@heroicons/react/20/solid";
import { Tooltip } from "react-tooltip";

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
  const { user } = useAuth();
  const daysTreshold = 3;

  const {
    currentPage,
    firstIndex,
    elementsPerPage,
    currentElements,
    isPreviousDisabled,
    isNextDisabled,
    setCurrentPage,
    setElementsPerPage,
    goToPreviousPage,
    goToNextPage,
  } = usePagination({
    initialPage: 1,
    initialElementsPerPage: 5,
    totalElements: orders.length,
    elements: orders,
  });

  const navigate = useNavigate();

  const daysDifference = (date1: Date, date2: Date) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(
      Math.abs((date1.getTime() - date2.getTime()) / oneDay)
    );

    return diffDays;
  };

  const searchOrder = (): void => {
    api.get(`orders/search?q=${search}`).then((res: any) => {
      console.log(res.data);
      setOrders(res.data);
    });
  };

  const deleteOrder = async (id: number) => {
    const styledModal = Swal.mixin({
      customClass: {
        confirmButton:
          "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2",
        cancelButton:
          "focus:outline-none text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2",
      },
      buttonsStyling: false,
    });
    styledModal
      .fire({
        title: "Deseja excluir este pedido?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
      })
      .then(async (result) => {
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
              confirmButton:
                "focus:outline-none text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2",
            },
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          styledModal.fire({
            title: "Operação cancelada!",
            icon: "info",
            buttonsStyling: false,
            customClass: {
              confirmButton:
                "focus:outline-none text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2",
            },
          });
        }
      });
  };

  useEffect(() => {
    api.get(`orders/user?userUuid=${user?.uuid}`).then((res) => {
      setOrders(res.data);
    });
  }, [user?.uuid]);

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
            placeholder="Pesquisar"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
      </form>
      <NewButton route="/order/create" title="Novo Pedido" />
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
              {/* <th scope="col" className="py-3 px-6">
                Data de criação
              </th>
              <th scope="col" className="py-3 px-6">
                Última alteração
              </th> */}
              <th scope="col" className="py-3 px-6">
                Data de entrega
              </th>
              <th scope="col" className="py-3 px-6"></th>
              <th scope="col" className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="py-4 px-6 text-center font-normal text-xl bg-gray-100 text-gray-600"
                >
                  Nenhum pedido cadastrado
                </td>
              </tr>
            ) : (
              currentElements.map((order, index) => {
                const currentIndex = firstIndex + index + 1;
                const diffDays = daysDifference(
                  new Date(order.delivery_date),
                  new Date()
                );
                const isDeliveryClose = diffDays <= daysTreshold;
                return (
                  <tr key={order.id} className="bg-white border-b">
                    <td className="py-4 px-6">{currentIndex}</td>
                    <td className="py-2 px-3">
                      <table className="w-full text-sm text-gray-500">
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
                      <table className="w-full text-sm text-gray-500">
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
                    {/* <td className="py-1 px-1 text-center">
                      {formatDate(order.created_at)}
                    </td>
                    <td className="py-1 px-1 text-center">
                      {formatDate(order.updated_at)}
                    </td> */}
                    <td className="py-1 px-1 text-center relative">
                      <Tooltip id="threshold-advise"/>
                      <div
                        className="flex items-center justify-center"
                        data-tooltip-id="threshold-advise"
                        data-tooltip-content={`Falta${diffDays === 1 ? '' : 'm'} ${diffDays} dia${diffDays === 1 ? '' : 's'} para entregar este pedido`}
                        data-tooltip-offset={40}
                      >
                        {isDeliveryClose && (
                          <CalendarIcon className="h-5 w-5 text-red-500 absolute top-4 left-0 right-0 m-auto" />
                        )}
                      </div>
                      {formatDate(order.delivery_date)}
                    </td>
                    <td className="py-1 px-1">
                      <UpdateOrder id={order.id} />
                    </td>
                    <td className="py-1 px-1">
                      <DeleteButton onClick={() => deleteOrder(order.id)} />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <PaginationButtons
        goToPreviousPage={goToPreviousPage}
        goToNextPage={goToNextPage}
        isPreviousDisabled={isPreviousDisabled}
        isNextDisabled={isNextDisabled}
        elementsPerPage={elementsPerPage}
        onElementsPerPageChange={setElementsPerPage}
      />
    </>
  );
}
