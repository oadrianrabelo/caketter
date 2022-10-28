import { useState, useEffect } from "react";
import { api } from "../../../../services/API";
import { Notification } from "../../../utils/Notification";
import { useNavigate } from 'react-router-dom';
interface Costumer {
  id: number;
  name: string;
  contact: string;
  created_at: string;
  updated_at: string;
}

export default function Costumers() {
  const [costumers, setCostumers] = useState<Costumer[]>([]);
  const [value, setValue] = useState(0);

  const navigate = useNavigate();
  const deleteCostumer = async (id: number) => {
    await api.delete(`costumer/${id}`).then(() => {
      Notification.fire({
        icon: "success",
        title: "Cliente excluído com sucesso!"
      });
      setValue(c => c + 1);
    });
  }

  useEffect(() => {
    api.get(`costumer`).then((res: any) => {
      setCostumers(res.data);
    });
  });
  return (
    <>
      <button
        type="button"
        onClick={() => navigate('/costumer/create')}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Novo cliente
      </button>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                #
              </th>
              <th scope="col" className="py-3 px-6">
                Nome
              </th>
              <th scope="col" className="py-3 px-6">
                Contato
              </th>
              <th scope="col" className="py-3 px-6">
                Data de criação
              </th>
              <th scope="col" className="py-3 px-6">
                Última alteração
              </th>
              <th scope="col" className="py-3 px-6"></th>
              <th scope="col" className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {costumers.map((costumer) => {
              return (
                <tr
                  key={costumer.id}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <td className="py-4 px-6">{costumer.id}</td>
                  <td className="py-4 px-6">{costumer.name}</td>
                  <td className="py-4 px-6">{costumer.contact}</td>
                  <td className="py-4 px-6">{costumer.created_at}</td>
                  <td className="py-4 px-6">{costumer.updated_at}</td>
                  <td className="py-4 px-1">
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Editar
                    </button>
                  </td>
                  <td className="py-4 px-1">
                    <button
                      type="button"
                      onClick={() => deleteCostumer(costumer.id)}
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
