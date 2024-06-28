import { useEffect } from "react";
import { useAppHeader } from "~/hooks/useAddHeader";

const Dashboard: React.FC = () => {
  const { setData } = useAppHeader();
  useEffect(() => {
    setData({ title: "Dashboard" });
  }, []);
  return <h2>Home</h2>;
};

export default Dashboard;
