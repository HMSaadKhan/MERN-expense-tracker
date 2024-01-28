import { useState } from "react";
import { TextField, Card, Box, CardContent, Button } from "@mui/material";
import { Title } from "../../components/Styled Components";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const sendOtp = () => {};
  return (
    <>
      <Box>
        <Box className="flex justify-center h-screen item-center">
          <Card sx={{ minWidth: 300, maxWidth: 300, padding: "20px" }}>
            <CardContent>
              <Title align="center">FORGOT PASSWORD</Title>
              <Box>
                <TextField
                  variant="standard"
                  fullWidth
                  label="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendOtp();
                    }
                  }}
                />
                <Box mt={2}>
                  <Button
                    variant="contained"
                    disabled={email ? false : true}
                    sx={{ margin: "0px", width: "100%" }}
                    onClick={async () => {
                      sendOtp();
                    }}
                  >
                    Send OTP
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

export default ForgotPassword;
