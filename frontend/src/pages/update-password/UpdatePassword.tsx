import { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import { Title } from "../../components/Styled Components";
import { updatePassword } from "../../common/urlRoutes";
import api from "../../common/api";
import { useAppContext } from "../../context/AppContext";

const UpdatePassword = () => {
  const { updateAppState } = useAppContext();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  const updatePasswordFun = async () => {
    const res = await api.put(updatePassword, { password });
    if (res.status === 200) {
      localStorage.removeItem("token");
      updateAppState({ isLoggedIn: false });
    }
  };
  return (
    <>
      <Box className="w-full flex justify-center">
        <Box className="max-w-md flex justify-center flex-col align-center">
          <Title align="center">Update Password</Title>
          <Box>
            <>
              <TextField
                variant="standard"
                fullWidth
                label="New Password"
                type="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updatePasswordFun();
                  }
                }}
              />
            </>
            <>
              <TextField
                label="Confirm Password"
                type="Password"
                fullWidth
                variant="standard"
                value={confirmPassword}
                helperText={
                  confirmPassword === password || password !== ""
                    ? ""
                    : "Both Passwords Should Match"
                }
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updatePasswordFun();
                  }
                }}
              />
            </>

            <Box mt={2}>
              <Button
                disabled={
                  confirmPassword === password && password !== "" ? false : true
                }
                variant="contained"
                sx={{ margin: "0px", width: "100%" }}
                onClick={() => {
                  updatePasswordFun();
                }}
              >
                Update Password
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UpdatePassword;
