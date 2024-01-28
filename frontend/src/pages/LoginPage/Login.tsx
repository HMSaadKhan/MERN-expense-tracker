import { FC, useState } from "react";
import {
  TextField,
  Button,
  Card,
  Box,
  Typography,
  CardContent,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../common/routes";
import { Title } from "../../components/Styled Components";
import { login, signup } from "../../common/urlRoutes";
import { useAppContext } from "../../context/AppContext";
import api from "../../common/api";

interface LoginI {
  mode: "login" | "signUp";
}

const Login: FC<LoginI> = ({ mode }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateAppState } = useAppContext();

  const Login = async () => {
    const res = await api.post(login, { email, password });
    if (res.status === 200) {
      localStorage.setItem("token", res.data.token);
      updateAppState({ isLoggedIn: true });
      navigate("/pages/" + routes.expenses);
    }
  };

  const SignUp = async () => {
    const res = await api.post(signup, { email, password });
    if (res.status === 200) {
      navigate(routes.login);
    }
  };

  return (
    <Box className="flex justify-center items-center h-screen">
      <Card className="max-w-md p-10">
        <CardContent>
          <Title align="center">
            {mode === "login" ? "SIGN IN" : "SIGN UP"}
          </Title>
          <Box sx={{}}>
            <Box className="flex items-center my-3">
              <TextField
                fullWidth
                required
                id="filled-required"
                size="small"
                label="email"
                defaultValue={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Box>
            <Box className="flex items-center my-3">
              <TextField
                fullWidth
                size="small"
                label="password"
                type="password"
                defaultValue={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (mode === "login") Login();
                    else SignUp();
                    e.stopPropagation();
                  }
                }}
              />
            </Box>
            <Box mt={2}>
              <Button
                className="w-full"
                variant="contained"
                onClick={(e) => {
                  if (mode === "login") Login();
                  else SignUp();

                  e.stopPropagation();
                }}
              >
                {mode === "login" ? "Login" : "Sign Up"}
              </Button>
            </Box>
            <Typography
              className="my-3"
              component={Link}
              to={mode === "login" ?  routes.signUp :  routes.login}
            >
              {mode === "login" ? (
                <>
                  Don't have an account?<b>Sign Up</b>
                </>
              ) : (
                <>
                  Already have an account?<b>Sign in</b>
                </>
              )}
            </Typography>
            {mode === "login" && (
              <Box mt={2}>
                <Typography component={Link} to={routes.forgotPassword}>
                  Forgot Password?
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
