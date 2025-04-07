import React from "react";
import "../../Pages/pages.css";
import { useIsMobile } from "../../mobile/useIsMobile";

type Props = {
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange } : Props) => {
  const isMobile = useIsMobile();

  return (
    <>
      {(totalPages>0) 
      ? 
      <div>
        <button className={isMobile? "mobile__action__button" : "action__button"}
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          >
          Predošlá
        </button>
        <span className="span__pagination">
          {currentPage} / {totalPages}
        </span>
        <button className={isMobile? "mobile__action__button" : "action__button"}
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          >
          Nasledujúca
        </button>
      </div>
      :
      <></>
      }
    </>
  );
};

export default Pagination;
