import { useState, useEffect } from "react";
import { api } from "../../../../services/API";
import { Notification } from "../../../utils/Notification";
import { useNavigate } from "react-router-dom";
import { UpdateCostumer } from "./UpdateCostumer";
import { formatDate } from "../../../utils/formatDate";
import Swal from "sweetalert2";
interface Costumer {
  id: number;
  name: string;
  contact: string;
  created_at: Date;
  updated_at: Date;
}

export default function Costumers() {
  const [costumers, setCostumers] = useState<Costumer[]>([]);
  const [value, setValue] = useState(0);
  const [termo, setTermo] = useState("");

  const navigate = useNavigate();
  const filterCostumer = () => {
    api.get(`costumer/buscaTermo?termo=${termo}`).then((res: any) => {
      setCostumers(res.data);
    });
  };

  const deleteCostumer = async (id: number) => {
    const styledModal = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });

    styledModal
      .fire({
        title: "Deseja realmente excluir?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await api.delete(`costumer/${id}`).then(() => {
            setValue((c) => c + 1);
            window.location.reload(), 4000;
          });
          styledModal.fire("Cliente excluído com sucesso!", "", "success");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          styledModal.fire("Operação cancelada!", "", "error");
        }
      });
  };

  useEffect(() => {
    api.get(`costumer`).then((res) => {
      setCostumers(res.data);
    });
  }, []);
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          filterCostumer();
        }}
      >
        <div className="mb-6">
          <label
            htmlFor="termo"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            teste
          </label>
          <input
            type="text"
            id="termo"
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="digite"
          />
        </div>
      </form>

      <button
        type="button"
        onClick={() => navigate("/costumer/create")}
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
                  <td className="py-4 px-6">
                    {formatDate(costumer.created_at)}
                  </td>
                  <td className="py-4 px-6">
                    {formatDate(costumer.updated_at)}
                  </td>
                  <td className="py-4 px-1">
                    <UpdateCostumer id={costumer.id} />
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
