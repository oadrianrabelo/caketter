import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/API";
import { Notification } from "../../../utils/Notification";
import { ConfirmButton } from "../../../components/ConfirmButton";
import { useAuth } from "../../../context/AuthContext";
import * as yup from "yup";

interface Costumer {
  name: string;
  contact: string;
  email: string;
  address: string;
}
interface IFormCostumer {
  name: string;
  contact: string;
  email: string;
  address: {
    avenue: string;
    number: string;
    neighborhood: string;
  };
  address_id: number;
  user_uuid: string;
}

export function CreateCostumer() {
  const { user } = useAuth();
  const userUuid = user?.uuid;

  const { register, handleSubmit } = useForm<IFormCostumer>();

  const navigate = useNavigate();

  const costumerSchema = yup.object().shape({
    name: yup.string().required(),
    contact: yup.string().required(),
  });
  const onSubmit = (data: IFormCostumer) => {
    console.log('Enviando dados do cliente:', data);
    api
      .post(`costumer`, {
        name: data.name,
        contact: data.contact,
        email: data.email,
        address: {
          avenue: data.address.avenue,
          number: data.address.number,
          neighborhood: data.address.neighborhood,
        },
        address_id: data.address_id,
        user_uuid: userUuid,
      })
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
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus: outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                E-mail
              </label>
              <input
                {...register("email")}
                placeholder="E-mail"
                type="text"
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus: outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="rounded-md flex flex-wrap">
              <div className="w-3/4 pr-2">
                <label htmlFor="avenue" className="sr-only">
                  Avenida
                </label>
                <input
                  {...register("address.avenue")}
                  type="text"
                  placeholder="Avenida"
                  className="relative block w-full appearance-none rounded-r-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="w-1/4 pl-2">
                <label htmlFor="number" className="sr-only">
                  Número
                </label>
                <input
                  {...register("address.number")}
                  type="text"
                  placeholder="Número"
                  className="relative block w-full appearance-none rounded-l-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="neighborhood" className="sr-only">
                Bairro
              </label>
              <input
                {...register("address.neighborhood")}
                type="text"
                placeholder="Bairro"
                className="relative block w-full appearance-none rounded-b border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus: outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <ConfirmButton text="Cadastrar Cliente" crud={true} />
          </div>
        </form>
      </div>
    </div>
  );
}
