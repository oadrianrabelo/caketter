import React from "react";
import PaginationSelect from "./PaginationSelect";

interface PaginationButtonsProps {
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
  elementsPerPage: number;
  onElementsPerPageChange: (value: number) => void;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  goToPreviousPage,
  goToNextPage,
  isPreviousDisabled,
  isNextDisabled,
  elementsPerPage,
  onElementsPerPageChange,
}) => {
  return (
    <>
      <div className="flex justify-center mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={isPreviousDisabled}
          className={`mr-2 ${
            isPreviousDisabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white"
          } px-4 py-2 rounded`}
        >
          Anterior
        </button>
        <button
          onClick={goToNextPage}
          disabled={isNextDisabled}
          className={`mr-2 ${
            isNextDisabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white"
          } px-4 py-2 rounded`}
        >
          Próxima
        </button>
      </div>
      <PaginationSelect
        elementsPerPage={elementsPerPage}
        onElementsPerPageChange={onElementsPerPageChange}
      />
    </>
  );
};

export default PaginationButtons;
