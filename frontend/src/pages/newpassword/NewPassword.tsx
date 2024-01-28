import { useState } from "react";
import { TextField, Card, Box, CardContent, Button } from "@mui/material";
import { Title } from "../../components/Styled Components";
import { resetPassword } from "../../common/urlRoutes";
import { useNavigate } from "react-router-dom";
import api from "../../common/api";

const NewPassword = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");

  const naviagte = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  const updatePasswordFun = async () => {
    const res = await api.put(resetPassword, { password, token });
    if (res.status === 200) {
      naviagte("/");
    }
  };

  return (
    <>
      <Box className="flex justify-center h-screen item-center items-center">
        <Box>
          <Card sx={{ minWidth: 300, maxWidth: 300, padding: "20px" }}>
            <CardContent>
              <Title align="center">NEW PASSWORD</Title>
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
                      confirmPassword === password && password !== ""
                        ? false
                        : true
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
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default NewPassword;
