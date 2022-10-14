import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useAuth } from "../context/AuthContext";
import { FormEvent, useState } from "react";

export function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };
    await login(data);
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
            Faça login em sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ou{" "}
            <a
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              crie uma conta
            </a>
          </p>
        </div>
        <form onSubmit={handleSignIn} className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <input
                name="email"
                autoComplete="email"
                type="email"
                required
                placeholder="Email ou login"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus: outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only"></label>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus: outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Lembrar de mim
              </label>
            </div>
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
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  aria-hidden="true"
                  className="h5 w-5 text-indigo-500 group-hover:text-indigo-400"
                />
              </span>
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
