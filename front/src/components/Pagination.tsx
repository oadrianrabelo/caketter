import { useState, useEffect } from "react";

interface PaginationOptions {
  initialPage: number;
  initialElementsPerPage: number;
  totalElements: number;
  elements: any[];
}
interface PaginationResult {
  currentPage: number;
  elementsPerPage: number;
  currentElements: any[];
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setElementsPerPage: React.Dispatch<React.SetStateAction<number>>;
  firstIndex: number;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
}
export const usePagination = ({
  initialPage,
  initialElementsPerPage,
  totalElements,
  elements
}: PaginationOptions): PaginationResult => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [elementsPerPage, setElementsPerPage] = useState(initialElementsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [elementsPerPage, totalElements, elements]);

  const lastIndex = currentPage * elementsPerPage;
  const firstIndex = lastIndex - elementsPerPage;
  const currentElements = elements.slice(firstIndex, lastIndex);

  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = lastIndex >= totalElements;

  
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return {
    currentPage,
    elementsPerPage,
    currentElements,
    isPreviousDisabled,
    isNextDisabled,
    setCurrentPage,
    setElementsPerPage,
    firstIndex,
    goToNextPage,
    goToPreviousPage
  }
};