import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useState } from "react";
import { appControl } from "../sidebar/data";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import LogoutIcon from "@mui/icons-material/Logout";

const BottomMenu = () => {
  const navigate = useNavigate();
  const { updateAppState } = useAppContext();
  const [value, setValue] = useState();
  return (
    <div>
      <BottomNavigation
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 4,
        }}
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
        }}
      >
        {appControl.map((app) => {
          return (
            <BottomNavigationAction
              key={app.id}
              label={app.title}
              icon={app.icon}
              onClick={() => {
                navigate(app.path);
              }}
            />
          );
        })}

        <BottomNavigationAction
          label="Logout"
          icon={<LogoutIcon />}
          onClick={() => {
            localStorage.removeItem("token");
            updateAppState({ isLoggedIn: false });
          }}
        />
      </BottomNavigation>
    </div>
  );
};

export default BottomMenu;
