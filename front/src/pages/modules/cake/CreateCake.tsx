import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/API";
import { Notification } from "../../../utils/Notification";
import { ConfirmButton } from "../../../components/ConfirmButton";
import { useAuth } from "../../../context/AuthContext";
import CaketterLogo from "../../../assets/1x/SVG/logo-without-text.svg";

interface Cake {
  dough: string;
  filling: string;
  size: number;
  theme: string;
  name_top: string;
  age_top: string;
}
interface IFormCake {
  dough: string;
  filling: string;
  size: number;
  theme: string;
  name_top: string;
  age_top: string;
  user_uuid: string;
}

export function CreateCake() {
  const { register, handleSubmit } = useForm<IFormCake>();
  const navigate = useNavigate();
  
  const { user } = useAuth();
  const user_uuid = user?.uuid;

  const onSubmit = (data: IFormCake) => {
    api
      .post(`cake/create`, 
      {
        dough: data.dough,
        filling: data.filling,
        size: data.size,
        theme: data.theme,
        name_top: data.name_top,
        age_top: data.age_top,
        user_uuid: user_uuid,
      })
      .then(() => {
        Notification.fire({
          icon: "success",
          title: `Bolo salvo com sucesso`,
        });
        navigate("/cakes");
      })
      .catch((err: any) => {
        Notification.fire({
          icon: "error",
          title: `Erro`,
          text: err,
        });
      });
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
        <img
            src={CaketterLogo}
            alt="Caketter"
            className="mx-auto w-24"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Cadastre um bolo
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
              <label htmlFor="dough" className="sr-only">
                Massa
              </label>
              <input
                type="text"
                required
                placeholder="Massa"
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus: outline-none focus:ring-indigo-500 sm:text-sm"
                {...register("dough")}
              />
            </div>
            <div>
              <label htmlFor="filling" className="sr-only">
                Recheio
              </label>
              <input
                type="text"
                required
                placeholder="Recheio"
                className="relative block w-full appearance-none rounded-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus: outline-none focus:ring-indigo-500 sm:text-sm"
                {...register("filling")}
              />
            </div>
            <div>
              <label htmlFor="size" className="sr-only">
                Tamanho
              </label>
              <input
                type="number"
                required
                placeholder="Tamanho (cm)"
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus: outline-none focus:ring-indigo-500 sm:text-sm"
                {...register("size", { setValueAs: (v) => parseFloat(v) })}
              />
            </div>
            <div>
              <label htmlFor="theme" className="sr-only">
                Tema
              </label>
              <input
                type="text"
                required
                placeholder="Tema"
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus: outline-none focus:ring-indigo-500 sm:text-sm"
                {...register("theme")}
              />
            </div>
            <div>
              <label htmlFor="name_top" className="sr-only">
                Nome no topo
              </label>
              <input
                type="text"
                required
                placeholder="Nome no topo"
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus: outline-none focus:ring-indigo-500 sm:text-sm"
                {...register("name_top")}
              />
            </div>
            <div>
              <label htmlFor="age_top" className="sr-only">
                Idade no topo
              </label>
              <input
                type="text"
                required
                placeholder="Idade no topo"
                className="relative block w-full appearance-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus: outline-none focus:ring-indigo-500 sm:text-sm"
                {...register("age_top")}
              />
            </div>
          </div>
          <div>
            <ConfirmButton text="Cadastrar Bolo" crud={true}/>
          </div>
        </form>
      </div>
    </div>
  );
}
