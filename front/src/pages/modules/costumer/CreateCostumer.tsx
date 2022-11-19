import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../../../services/API";
import { Notification } from "../../../utils/Notification";

interface Costumer {
  name: string;
  contact: string;
}
interface IFormCostumer {
  name: string;
  contact: string;
}

export function CreateCostumer() {
  const { register, handleSubmit } = useForm<IFormCostumer>();
  const navigate = useNavigate();
  const onSubmit = (data: IFormCostumer) => {
    api
      .post(`costumer`, data)
      .then(() => {
        Notification.fire({
          icon: "success",
          title: `Cliente cadastrado com sucesso!`,
        });
        navigate("/costumers");
      })
      .catch((err: any) => {
        Notification.fire({
          icon: "error",
          title: `Erro ao cadastrar cliente`,
          text: err,
        });
      });
  };
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Tux_Paint_birthday_cake.svg/2048px-Tux_Paint_birthday_cake.svg.png"
            alt="Caketter"
            className="mx-auto h-12 w-auto"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Cadastre um novo cliente
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          action="$"
          className="mt-8 space-y-6"
        >
          <input type="hidden" name="remember" value="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="name" className="sr-only">
                Nome
              </label>
              <input
                type="text"
                required
                placeholder="Nome do cliente"
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus: outline-none focus:ring-indigo-500 sm:text-sm"
                {...register("name")}
              />
            </div>
            <div>
              <label htmlFor="contact" className="sr-only">
                Contato
              </label>
              <input
                {...register("contact")}
                type="text"
                required
                placeholder="Contato do cliente"
                className="relative block w-full appearance-none rounded-b border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus: outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="gruop relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cadastrar cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
