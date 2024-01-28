/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { appControl } from "./data";
import { useAppContext } from "../../context/AppContext";

const StyledListItem = styled(ListItem)({ height: "35px" });
const StyledListItemButton = styled(ListItemButton)({
  height: "35px",
  paddingLeft: "10px",
});
const StyledTypography = styled(Typography)({
  fontWeight: "bold",
  marginLeft: "10px",
});

export default function Sidebar() {
  const navigate = useNavigate();
  const { updateAppState } = useAppContext();

  const navigateToRoute = (path: string, e: any) => {
    navigate(path);
    e.stopPropagation();
  };
  return (
    <>
      <Box sx={{ width: "300px" }}>
        <Box
          position="fixed"
          sx={{
            marginTop: "70px",
            width: "200px",
            height: "100%",
            backgroundColor: "#fafafa",
            zIndex: 1,
          }}
        >
          <List disablePadding>
            <StyledTypography>App Control</StyledTypography>
            {appControl.map((option) => {
              return (
                <StyledListItem disablePadding key={option.id}>
                  <StyledListItemButton
                    onClick={(e) => {
                      navigateToRoute(option.path, e);
                    }}
                  >
                    <ListItemIcon>{option.icon}</ListItemIcon>
                    <ListItemText primary={option.title} />
                  </StyledListItemButton>
                </StyledListItem>
              );
            })}

            <StyledTypography>Action</StyledTypography>
            <StyledListItem disablePadding>
              <StyledListItemButton
                onClick={() => {
                  localStorage.removeItem("token");
                  updateAppState({ isLoggedIn: false });
                }}
              >
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </StyledListItemButton>
            </StyledListItem>
          </List>
        </Box>
      </Box>
    </>
  );
}
