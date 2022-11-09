import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../../../services/API";
import { Modal } from "../../../components/Modal";
import { Notification } from "../../../utils/Notification";

interface CostumerProps {
  id: number;
}

interface Costumer {
  name: string;
  contact: string;
}

export function UpdateCostumer({ id }: CostumerProps) {
  const { register, handleSubmit, setValue } = useForm<Costumer>();

  const onSubmit = (fn: () => void) => {
    const submit: SubmitHandler<Costumer> = async (data) => {
      try {
        await api.put(`costumer/${id}`, {
          name: data.name,
          contact: data.contact,
        });
        Notification.fire({
          icon: "success",
          title: "Cliente atualizado com sucesso!",
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

  const loadData = () => {
    api.get<Costumer>(`costumer/${id}`).then((res) => {
      setValue("name", res.data.name);
      setValue("contact", res.data.contact);
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
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      Nome
                    </label>
                    <input
                      {...register("name")}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      Contato
                    </label>
                    <input
                      {...register("contact")}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
