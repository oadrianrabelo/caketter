import React from "react";

interface PaginationSelectProps {
  elementsPerPage: number;
  onElementsPerPageChange: (value: number) => void;
}

const PaginationSelect: React.FC<PaginationSelectProps> = ({
  elementsPerPage,
  onElementsPerPageChange,
}) => {
  const handleElementsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onElementsPerPageChange(Number(e.target.value));
  };
  return (
    <div className="flex justify-center mt-2">
      <select
        onChange={handleElementsPerPageChange}
        className="border border-gray-300 text-gray-900 pl-3 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 appearance-none w-32"
      >
        <option value={5}>5 por página</option>
        <option value={10}>10 por página</option>
        <option value={15}>15 por página</option>
      </select>
    </div>
  );
};

export default PaginationSelect;
