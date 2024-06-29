import { useCallback } from "react";
import { useTableContext } from "..";
import classes from "./style.module.scss";
import Icon from "~/components/Icon";

interface TableHeaderProps {
  className?: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({ className }) => {
  const { columns, sortBy, sortOrder, onSortChange } = useTableContext();

  const sortHandler = useCallback(
    (column) =>
      onSortChange &&
      onSortChange({
        sortOrder: sortOrder === "asc" ? "desc" : "asc",
        sortBy: column.dataKey,
      }),
    [onSortChange, sortBy, sortOrder]
  );
  return (
    <thead className={className}>
      <tr>
        {columns.map((column) => (
          <th
            key={column.dataKey.toString()}
            onClick={() => sortHandler(column)}
          >
            {onSortChange && sortBy === column.dataKey && (
              <Icon
                size={20}
                className={classes['sort-icon']}
                name={
                  sortOrder === "asc" ? "bx-up-arrow-alt" : "bx-down-arrow-alt"
                }
              />
            )}
            {column.title}
          </th>
        ))}
        <th className={classes["action-column"]}></th>
      </tr>
    </thead>
  );
};

export default TableHeader;
