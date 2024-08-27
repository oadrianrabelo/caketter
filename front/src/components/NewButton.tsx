import { PlusIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

interface NewButtonProps {
  route: string;
  title: string;
}
export const NewButton = ({route, title}:NewButtonProps) => {
  const navigate = useNavigate();
  return (
    <>
      <button
        type="button"
        title={title}
        onClick={() => navigate(route)}
        className="bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-800 font-medium rounded-full text-sm px-3 py-2 mr-2 mb-2 transition duration-300"
      >
        <PlusIcon className="h-6 w-6 text-white"/>
      </button>
    </>
  )
}