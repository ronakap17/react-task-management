import _ from "lodash";
import { useTableContext } from "..";
import classes from "./style.module.scss";

interface TableRowsProps<T> {
  data: T[];
}

const TableRows = <T,>({ data }: TableRowsProps<T>) => {
  const { columns } = useTableContext();
  return (
    <tbody>
      {data.map((row, index) => (
        <tr key={row["id"] || index}>
          {columns.map((column) => (
            <td key={column.dataKey.toString()}>
              {_.get(row, column.dataKey)}
            </td>
          ))}
          <td className={classes["action-column"]}>
            <i className={`bx bx-pencil`}></i>
            <i className={`bx bx-trash`}></i>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableRows;
