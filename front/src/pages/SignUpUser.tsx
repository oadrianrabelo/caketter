import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import { api } from "../services/API";
import { useState } from "react";
import { Notification } from "../utils/Notification";
import { useNavigate } from "react-router-dom";
import CaketterLogo from "../assets/1x/SVG/logo.svg";
interface User {
  name: string;
  login: string;
  email: string;
  password: string;
}
interface IFormUser {
  name: string;
  login: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpUser() {
  const [user, setUser] = useState<User[]>([]);
  const { register, handleSubmit, watch } = useForm<IFormUser>();
  const navigate = useNavigate();


  const onSubmit = (data: IFormUser) => {
    
    // Check passwords
    if (data.password !== data.confirmPassword) {
      Notification.fire({
        icon: 'error',
        title: 'Erro ao criar conta',
        text: 'A senha e a confirmação de senha não coincidem',
      });
      return;
    }

    // Check if password has min 8 characters of length
    if (data.password.length < 8) {
      Notification.fire({
        icon: "error",
        title: "Erro ao criar conta",
        text: "A senha deve conter pelo menos 8 caracteres",
      });
      return;
    }

    // Check if password has special characters
    const regex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!regex.test(data.password)) {
      Notification.fire({
        icon: "error",
        title: "Erro ao criar conta",
        text: "A senha deve conter no mínimo um caractere especial",
      });
      return;
    }

    // If conditions checked are true, signup
    api
      .post(`/auth/signup`, data)
      .then(() => {
        Notification.fire({
          icon: "success",
          title: `Conta criada com sucesso!`,
          text: `Faça login para entrar no Caketter!`,
          timer: 0,
          showCloseButton: true,
        });
        navigate("/");
      })
      .catch((err: any) => {
        Notification.fire({
          icon: "error",
          title: `Erro ao criar conta`,
          timer: 3000,
          showCloseButton: true,
          text: err.response.data.message || "Erro desconhecido",
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
            className="mx-auto w-32"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Crie uma nova conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ou{" "}
            <a
              href="/"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              entre em sua conta
            </a>
          </p>
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
                placeholder="Escreva aqui seu nome"
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus: outline-none focus:ring-indigo-500 sm:text-sm"
                {...register("name")}
              />
            </div>
            <div>
              <label htmlFor="login" className="sr-only">
                Login
              </label>
              <input
                {...register("login")}
                type="text"
                required
                placeholder="Login"
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus: outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                required
                placeholder="Email"
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus: outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only"></label>
              <input
                {...register("password")}
                type="password"
                required
                placeholder="Senha"
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus: outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only"></label>
              <input
                {...register("confirmPassword")}
                type="password"
                required
                placeholder="Confirmar Senha"
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus: outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Esqueci minha senha
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="gruop relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Criar conta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
