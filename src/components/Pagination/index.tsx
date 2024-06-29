import React, { useCallback } from "react";
import classes from "./style.module.scss";
import {
  PaginationRequest,
  Pagination as PaginationType,
} from "~/types/pagination";
import classNames from "classnames";
import { itemsPerPageArray } from "~/data/pagination";
import Icon from "../Icon";

interface PaginationProps extends PaginationType {
  onChange?: (paginationParam: PaginationRequest) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  lastPage,
  perPage,
  from,
  to,
  total,
  onChange,
}) => {
  const handleSelectItemsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChange && onChange({ page: 1, perPage: parseInt(event.target.value) });
    },
    [onChange]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      onChange && onChange({ page, perPage });
    },
    [onChange, perPage]
  );

  const handlePrevPage = useCallback(() => {
    const prevPage = currentPage - 1;
    handlePageChange(prevPage > 1 ? prevPage : 1);
  }, [handlePageChange, currentPage]);

  const handleNextPage = useCallback(() => {
    const nextPage = currentPage + 1;
    handlePageChange(nextPage < lastPage ? nextPage : lastPage);
  }, [handlePageChange, currentPage, lastPage]);

  const handleSelectPage = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      handlePageChange(parseInt(event.target.value));
    },
    [handlePageChange]
  );

  return (
    <div className={classes["pagination"]}>
      <span className={classes["info-text"]}>Items per page:</span>
      <select
        className={classes["select"]}
        onChange={handleSelectItemsPerPage}
        value={perPage}
      >
        {itemsPerPageArray.map((itemsPerPage) => (
          <option key={itemsPerPage} value={itemsPerPage}>
            {itemsPerPage}
          </option>
        ))}
      </select>
      <span className={classes["info-text"]}>
        {`${from} - ${to} of ${total} items`}
      </span>
      <div className={classes["controls"]}>
        <button
          className={classNames(classes["button"], classes["button-prev"])}
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          <Icon name="bx-chevron-left" />
        </button>
        <button
          className={classNames(classes["button"], classes["button-prev"])}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <Icon name="bx-chevrons-left" />
        </button>
        <button
          className={classNames(classes["button"], classes["button-next"])}
          onClick={handleNextPage}
          disabled={currentPage === lastPage}
        >
          <Icon name="bx-chevron-right" />
        </button>
        <button
          className={classNames(classes["button"], classes["button-next"])}
          onClick={() => handlePageChange(lastPage)}
          disabled={currentPage === lastPage}
        >
          <Icon name="bx-chevrons-right" />
        </button>
      </div>
      <span className={classes["info-text"]}>Page:</span>
      <select
        className={classNames(classes["select"], classes["margin-right-none"])}
        onChange={handleSelectPage}
        value={currentPage}
      >
        {[...Array(lastPage)].map((_, pageNo) => (
          <option key={pageNo} value={pageNo + 1}>
            {pageNo + 1}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
