import { useCallback, useEffect } from "react";
import { useAppHeader } from "~/hooks/useAddHeader";
import { useAppDispatch, useAppSelector } from "~/store";
import { fetchUsers } from "./actions";
import useTranslation from "~/hooks/useTranslation";
import Table, { TableColumnType } from "~/components/Table";
import TableHeader from "~/components/Table/Header";
import TableRows from "~/components/Table/Rows";
import { User } from "~/types/user";
import { SortByPayload } from "~/types/app";
import Pagination from "~/components/Pagination";
import { PaginationRequest } from "~/types/pagination";

const Users: React.FC = () => {
  const { t } = useTranslation("users.list");
  const { setData } = useAppHeader();
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.list);
  const paginate = useAppSelector((state) => state.users.paginate);

  const columsConfig: TableColumnType<User>[] = [
    { title: "Id", dataKey: "id" },
    { title: "Name", dataKey: "name" },
    { title: "Email Id", dataKey: "email" },
    { title: "Status", dataKey: "isActive" },
  ];

  const fetchUsersList = useCallback(() => {
    dispatch(fetchUsers());
  }, [fetchUsers])

  useEffect(() => {
    setData({ title: "Users" });
  }, [setData]);

  useEffect(() => {
    fetchUsersList();
  }, [fetchUsersList]);

  const sortHandler = useCallback((sort: SortByPayload<User>) => {
    console.log(sort);
    sort && dispatch(fetchUsers(sort));
  }, [fetchUsersList])

  const handlePageChange = useCallback((paginationParam: PaginationRequest) => {
    dispatch(fetchUsers({...paginationParam}));
  }, [fetchUsersList])

  return (
    <>
    <Table<User> striped theme="primary" columns={columsConfig} onSortChange={sortHandler}>
      <TableHeader/>
      <TableRows<User>
        data={users.map((user) => ({
          ...user,
          statusText: t(`status.${user.isActive}`),
        }))}
      />
    </Table>
    <Pagination {...paginate} onChange={handlePageChange}/>
    </>
  );
};

export default Users;
