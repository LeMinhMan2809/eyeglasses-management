import React from "react";
import DashboardBox from "../components/DashboardBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Dashboard = () => {
  return (
    <div className="mt-[6.5rem] mx-[1rem] w-full">
      <div className="flex gap-8">
        <DashboardBox
          color={["#1da256", "#48d483"]}
          icon={<AccountCircleIcon />}
          title={"Tổng người dùng"}
        />
        <DashboardBox color={["#c012e2", "#eb64fe"]} title={"Tổng đơn hàng"} />
        <DashboardBox color={["#2c78e5", "#60aff5"]} title={"Tổng đơn hàng"} />
        <DashboardBox color={["#e1950e", "#f3cd29"]} title="Tổng người dùng" />
      </div>
    </div>
  );
};

export default Dashboard;
