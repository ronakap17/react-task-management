import React, { useCallback } from "react";
import classes from "./style.module.scss";
import {
  PaginationRequest,
  Pagination as PaginationType,
} from "~/types/pagination";
import classNames from "classnames";
import { itemsPerPageArray } from "~/data/pagination";
import Icon from "../Icon";
import Select from "../Form/Select";

interface PaginationProps extends PaginationType {
  className?: string;
  onChange?: (paginationParam: PaginationRequest) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  lastPage,
  perPage,
  from,
  to,
  total,
  className,
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
    <div className={classNames(classes["pagination"], className)}>
      <span className={classes["section"]}>Items per page:</span>
      <Select
        className={classes["select"]}
        iconWrapperClass={classes["icon-wrap"]}
        options={itemsPerPageArray.map((itemsPerPage) => ({
          text: itemsPerPage,
          value: itemsPerPage,
        }))}
        value={perPage}
        iconSize={20}
        onChange={handleSelectItemsPerPage}
      />
      <span className={classes["section"]}>
        {`${from} - ${to} of ${total} items`}
      </span>
      <div className={classNames(classes["controls"], classes["section"])}>
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
      <span className={classes["section"]}>Page:</span>
      <Select
        className={classNames(classes["select"], classes["margin-right-none"])}
        iconWrapperClass={classes["icon-wrap"]}
        options={[...Array(lastPage)].map((_, pageNo) => ({
          text: pageNo + 1,
          value: pageNo + 1,
        }))}
        value={currentPage}
        iconSize={20}
        onChange={handleSelectPage}
      />
    </div>
  );
};

export default Pagination;
