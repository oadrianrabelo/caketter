import { useState, useEffect } from "react";
import { formatDate } from "../../../utils/formatDate";
import { api } from "../../../../services/API";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UpdateCake } from "./UpdateCake";
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

export function Cakes() {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`cakes`).then((res) => {
      setCakes(res.data);
    });
  }, []);

  
  const deleteCake = async (id: number) => {
    const styledModal = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });
    styledModal.fire({
      title: "Deseja realmente excluir?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
      reverseButtons: true,
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        await api.delete(`cake/delete/${id}`).then(() => {
          setValue((c) => c + 1);
          window.location.reload(), 4000;
        });
        styledModal.fire("Bolo excluído com sucesso!", "", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        styledModal.fire("Operação cancelada!", "", "error");
      }
    });
  };
  return (
    <>
      <button
        type="button"
        onClick={() => navigate("/cake/create")}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Novo bolo
      </button>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                #
              </th>
              <th scope="col" className="py-3 px-6">
                Massa
              </th>
              <th scope="col" className="py-3 px-6">
                Recheio
              </th>
              <th scope="col" className="py-3 px-6">
                Tamanho
              </th>
              <th scope="col" className="py-3 px-6">
                Nome no topo
              </th>
              <th scope="col" className="py-3 px-6">
                Idade
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
            {cakes.map((cake) => {
              return (
                <tr
                  key={cake.id}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <td className="py-4 px-6">{cake.id}</td>
                  <td className="py-4 px-6">{cake.dough}</td>
                  <td className="py-4 px-6">{cake.filling}</td>
                  <td className="py-4 px-6">{cake.size}</td>
                  <td className="py-4 px-6">{cake.name_top}</td>
                  <td className="py-4 px-6">{cake.age_top}</td>
                  <td className="py-4 px-6">{formatDate(cake.created_at)}</td>
                  <td className="py-4 px-6">{formatDate(cake.updated_at)}</td>
                  <td className="py-4 px-1">
                    <UpdateCake id={cake.id} />
                  </td>
                  <td className="py-4 px-1">
                    <button
                      type="button"
                      onClick={() => deleteCake(cake.id)}
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
