import _ from "lodash";
import { useTableContext } from "..";
import classes from "./style.module.scss";
import Icon from "~/components/Icon";

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
            <Icon name={'bx-pencil'} size={20}/>
            <Icon name={'bx-trash'} size={20}/>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableRows;
