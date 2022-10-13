import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Input } from '../components/inputs/Input';
import { TopInput } from '../components/inputs/TopInput';
import { MiddleInput } from '../components/inputs/MiddleInput';
import { BottomInput } from "../components/inputs/BottomInput";

export function  SignUp(){
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
            Crie uma nova conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ou{" "}
            <a
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              entre em sua conta
            </a>
          </p>
        </div>
        <form action="$" className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <TopInput name="email" placeholder="Email" required="true"/>
            <MiddleInput name="name" placeholder="Insira seu nome"  />
            <MiddleInput name="password" placeholder="Insira sua senha"  />
            <BottomInput name="password" placeholder="Password" middle="t" />
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