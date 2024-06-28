import classNames from "classnames";
import classes from "./style.module.scss";
import { createContext, useCallback, useContext, useState } from "react";
import { SortByPayload } from "~/types/app";
import WhiteFrame from "../WhiteFrame";

export type TableColumnType<T> = {
  title: string;
  dataKey: keyof T;
  width?: number | string;
  className?: string;
};

export interface TableContextType<T> extends SortByPayload<T> {
  columns: TableColumnType<T>[];
  onSortChange?: (key: SortByPayload<T>) => void;
}

interface TableProps<T> extends TableContextType<T> {
  children?: React.ReactNode;
  striped?: boolean;
  theme?: "default" | "primary";
  className?: string;
}

const TableContext = createContext<TableContextType<any> | undefined>(
  undefined
);

export function useTableContext() {
  const ctx = useContext(TableContext);

  if (!ctx) {
    throw new Error(
      "Table related components must be wrapped by Table element"
    );
  }

  return ctx;
}

const Table = <T,>({
  children,
  striped,
  theme,
  className,
  columns,
  sortBy,
  sortOrder,
  onSortChange,
}: TableProps<T>) => {
  const [tableSortBy, setTableSortBy] = useState<SortByPayload<T>>({
    sortBy,
    sortOrder,
  });

  const sortHandler = useCallback(
    (sortParams: SortByPayload<T>): void => {
      onSortChange && onSortChange(sortParams);
      setTableSortBy(sortParams);
    },
    [onSortChange]
  );

  const contextValue: TableContextType<T> = {
    columns,
    onSortChange: sortHandler,
    ...tableSortBy,
  };
  return (
    <TableContext.Provider value={contextValue}>
      <WhiteFrame
        className={classNames(
          classes["list-wrapper"],
          theme === "primary" && classes["primary"],
          striped && classes["striped"],
          className
        )}
      >
        <table>{children}</table>
      </WhiteFrame>
    </TableContext.Provider>
  );
};

export default Table;
