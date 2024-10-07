import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const DashboardBox = (props) => {
  return (
    <>
      <div
        className="w-[17rem] h-[8rem] rounded-lg"
        style={{
          backgroundImage: `linear-gradient(to right, ${props.color?.[0]}, ${props.color?.[1]})`,
        }}
      >
        <div className="p-3 w-100 flex justify-between">
          <div>
            <p className="text-white font-semibold">{props.title}</p>
            <span className="text-white font-bold">10</span>
          </div>
          <div>
            <span className="iconDashboard">
              {/* <AccountCircleIcon className="!text-white !opacity-30 !w-7 !h-7" /> */}
              {props.icon}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardBox;
