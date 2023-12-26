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
        className="bg-[#ffb6c1] text-white hover:bg-[#d0959e] focus:ring-4 focus:ring-[#ffd0db] font-medium rounded-full text-sm px-3 py-2 mr-2 mb-2 transition duration-300"
      >
        <PlusIcon className="h-6 w-6 text-white"/>
      </button>
    </>
  )
}