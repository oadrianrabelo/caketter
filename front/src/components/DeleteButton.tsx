import { TrashIcon } from "@heroicons/react/24/solid";

interface DeleteButtonProps {
  onClick: () => void;
}

export const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <>
      <button
        type="button"
        title="Excluir"
        onClick={onClick}
        className="text-white bg-[#EA6464] hover:[#AF4343] focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-[#bf3736] dark:hover:bg-[#a91d21] dark:focus:ring-red-900 transition duration-300"
      >
        <TrashIcon className="h-6 w-6 text-white" />
      </button>
    </>
  );
};
