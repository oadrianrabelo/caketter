import { useState, useEffect } from "react";
import { api } from "../../../services/API";
import { Notification } from "../../../utils/Notification";
import { useNavigate } from "react-router-dom";
import { UpdateCostumer } from "./UpdateCostumer";
import { formatDate } from "../../../utils/formatDate";
import Swal from "sweetalert2";
import HeaderOne from "../../../components/HeaderOne";
import { NewButton } from "../../../components/NewButton";
import { DeleteButton } from "../../../components/DeleteButton";
import { useAuth } from "../../../context/AuthContext";
import { usePagination } from "../../../components/Pagination";
import PaginationButtons from "../../../components/PaginationButtons";
interface Costumer {
  id: number;
  name: string;
  contact: string;
  email: string;
  address: {
    avenue: string;
    number: string;
    neighborhood: string;
  };
  created_at: Date;
  updated_at: Date;
  id_user: number;
}

export default function Costumers() {
  const [costumers, setCostumers] = useState<Costumer[]>([]);
  const [value, setValue] = useState(0);
  const [search, setSearch] = useState("");
  const { user } = useAuth();
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
    totalElements: costumers.length,
    elements: costumers,
  });

  const navigate = useNavigate();
 
  const filterCostumer = (searchValue: string) => {
    if (searchValue.trim() !== "") {
      api
        .get(`costumer/search?q=${searchValue}&userUuid=${user?.uuid}`)
        .then((res: any) => {
          setCostumers(res.data);
          setCurrentPage(1);
        });
    } else {
      api.get(`costumer/user?userUuid=${user?.uuid}`).then((res) => {
        setCostumers(res.data);
        setCurrentPage(1);
      });
    }
  };

  const deleteCostumer = async (id: number) => {
    const styledModal = Swal.mixin({
      customClass: {
      },
      buttonsStyling: true,
    });

    styledModal
      .fire({
        title: "Deseja realmente excluir o cliente?",
        html: "<strong>Essa ação é irreversível!</strong>",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#EA6464",
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await api.delete(`costumer/${id}`);
            // update costumers table after delete costumer
            setCostumers(costumers.filter(costumer => costumer.id !== id));
      
            styledModal.fire("Cliente excluído com sucesso!", "", "success");

          } catch (error: any) {
            styledModal.fire("Erro ao excluir o cliente", error.message, "error");
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          styledModal.fire("Operação cancelada!", "", "error");
        }
      });
  };

  useEffect(() => {
    api.get(`costumer/user?userUuid=${user?.uuid}`).then((res) => {
      setCostumers(res.data);
    });
  }, [user?.uuid]);

  useEffect(() => {
    setCurrentPage(1);
  }, [elementsPerPage]);
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          filterCostumer(search);
        }}
      >
        <HeaderOne title="Clientes" />
        <div className="mb-6">
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              filterCostumer(e.target.value)
            }}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Pesquisar"
          />
        </div>
      </form>
      <NewButton route="/costumer/create" title="Novo Cliente" />
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-center text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
                E-mail
              </th>
              <th scope="col" className="py-3 px-6">
                Endereço
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
            {search !== "" && costumers.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="py-4 px-6 text-center font-normal text-xl bg-gray-100 text-gray-600"
                >
                  Nenhum cliente encontrado com o termo <b>"{search}"</b>.
                </td>
              </tr>
            ) : search === "" && costumers.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="py-4 px-6 text-center font-normal text-xl bg-gray-100 text-gray-600"
                >
                  Nenhum cliente cadastrado.
                </td>
              </tr>
            ) : (
              currentElements.map((costumer, index) => {
                const currentIndex = firstIndex + index + 1;
                return (
                  <tr key={costumer.id} className="bg-white border-b">
                    <td className="py-4 px-6">{currentIndex}</td>
                    <td className="py-4 px-6">{costumer.name}</td>
                    <td className="py-4 px-6">{costumer.contact}</td>
                    <td className="py-4 px-6">{costumer.email ?? "--"}</td>
                    <td className="py-4 px-6">
                      {`Av. ${costumer.street}, ${costumer.number}, Bairro ${costumer.neighborhood}` ??
                        "--"}
                    </td>
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
                      <DeleteButton
                        onClick={() => deleteCostumer(costumer.id)}
                      />
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
        elementsPerPage={5}
        onElementsPerPageChange={setElementsPerPage}
      />
    </>
  );
}
