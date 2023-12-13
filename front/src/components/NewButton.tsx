import { PlusIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

interface NewButtonProps {
  route: string;
}
export const NewButton = ({route}:NewButtonProps) => {
  const navigate = useNavigate();
  return (
    <>
      <button
        type="button"
        title="Novo Pedido"
        onClick={() => navigate(route)}
        className="bg-[#64B6AC] text-white hover:bg-[#345E59] focus:ring-4 focus:ring-[#C0FDFB] font-medium rounded-full text-sm px-3 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        <PlusIcon className="h-6 w-6 text-white"/>
      </button>
    </>
  )
}