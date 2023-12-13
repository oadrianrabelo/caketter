import { ReactNode } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import React from "react";
type NewType = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => ReactNode;

interface ModalProps {
  onOpen?: () => void;
  children: ReactNode | NewType;
}

export const Modal: React.FC<ModalProps> = ({ children, onOpen }) => {
  const [showModal, setShowModal] = React.useState(false);

  const handleOpenModal = () => {
    onOpen && onOpen();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        title="Editar"
        className="text-white bg-[#64B6AC] hover:bg-[#345E59] focus:outline-none focus:ring-4 focus:ring-[#C0FDFB] font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition duration-300"
        onClick={handleOpenModal}
      >
        <PencilSquareIcon className="h-6 w-6 text-white" />
      </button>
      {showModal ? (
        <>
          <div className="absolute text-gray-900 dark:text-white">
            <div className="flex justify-center  items-center  overflow-x-hidden overflow-y-hidden fixed  inset-0 z-50 outline-none focus:outline-none ">
              <div className="w-auto  mx-auto max-w-3xl ">
                {/*content*/}
                <div className="border-0  rounded-lg dark:bg-white shadow-lg relative flex flex-col w-full bg-white text-black outline-none focus:outline-none dark:text-white">
                  {/*header*/}
                  <div className="flex items-start justify-between p-1 border-b border-slate-300">
                    <h2 className="text-4xl tracking-tight font-medium  text-gray-900 dark:text-black">
                      <svg
                        className="w-10 h-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        ></path>
                      </svg>
                    </h2>
                    <button
                      className="p-1 ml-auto bg-transparent text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"></span>
                    </button>
                  </div>
                  {typeof children === "function"
                    ? children({ handleCloseModal })
                    : children}
                  <div className="flex items-center justify-end p-1 border-t border-solid border-slate-300 rounded-b">
                    <button
                      className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => setShowModal(false)}
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="opacity-25 fixed inset-0 z-40 bg-black"
              onClick={() => setShowModal(false)}
            ></div>
          </div>
        </>
      ) : null}
    </>
  );
};
