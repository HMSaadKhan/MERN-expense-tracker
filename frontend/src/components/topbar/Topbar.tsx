import { useNavigate } from "react-router-dom";

import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const Topbar = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <AppBar
        sx={{ background: "white", zIndex: 4, height: "300" }}
        position="fixed"
      >
        <Toolbar>
          <div>
            <Typography
              color="primary"
              sx={{ fontWeight: "bold", cursor: "pointer" }}
              variant="h4"
              onClick={() => {
                navigate("/");
              }}
            >
              Expense Tracker
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Topbar;
