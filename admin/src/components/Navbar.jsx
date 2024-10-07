import React from "react";
import accPic from "../assets/LeMinhMan_B2003791.jpg";
import logo from "../assets/logo_b.png";
import { Link } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="fixed right-0 left-0 z-[1000] w-full bg-white">
      <div className="flex justify-between py-5 px-[3rem]">
        <div>
          <img className="h-12" src={logo} />
        </div>

        <div>
          <input></input>
        </div>

        <div className="flex justify-center items-center mr-2">
          {/* <Link to="/login">
            <div className="ml-2">
              <p className="bg-[#d3b581] py-2 px-3 rounded-xl font-medium">
                Đăng nhập
              </p>
            </div>
          </Link> */}

          <button onClick={handleClick}>
            <div className="">
              <img
                className="h-10 w-11 rounded-full object-cover"
                src={accPic}
              />
            </div>
          </button>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "hidden",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar /> My account
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              My account
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
