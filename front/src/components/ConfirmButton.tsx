interface ConfirmButtonProps {
  text: string;
  crud?: boolean;
}
export const ConfirmButton = ({ text, crud = false }: ConfirmButtonProps) => {
  if (crud) {
    return (
      <>
        <button
          type="submit"
          className="gruop relative flex w-full justify-center rounded-md border border-transparent bg-[#64B6AC] py-2 px-4 text-lg font-medium text-white hover:bg-[#345E59] focus:outline-none focus:ring-2 focus:ring-[#C0FDFB] focus:ring-offset-2 transition duration-300"
        >
          {text}
        </button>
      </>
    );
  } else {
    return (
      <>
        <button
          type="button"
          title="Novo Pedido"
          className="mt-5 w-1/2 h-full bg-[#64B6AC] text-white hover:bg-[#345E59] focus:ring-4 focus:ring-[#C0FDFB] font-medium rounded-full text-sm px-3 py-2 mr-2 mb-2 transition duration-300"
        >
          {text}
        </button>
      </>
    );
  }
};
