import { useState, useEffect } from "react";
import { formatDate } from "../../../utils/formatDate";
import { api } from "../../../../services/API";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UpdateCake } from "./UpdateCake";
import HeaderOne from "../../../components/HeaderOne";
import { TrashIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/solid";
import { NewButton } from "../../../components/NewButton";
import { DeleteButton } from "../../../components/DeleteButton";
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
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const searchCake = () => {
    api.get(`cakes/search?q=${search}`).then((res: any) => {
      setCakes(res.data);
    });
  };

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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchCake();
        }}
      >
      <HeaderOne title="Bolos" />

      <div className="mb-6">
        <input
          type="text"
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Pesquisar"
        />
      </div>
      </form>
      <NewButton route="/cake/create" title="Novo Bolo"/>
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
                    <DeleteButton onClick={() => deleteCake(cake.id)}/>
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
