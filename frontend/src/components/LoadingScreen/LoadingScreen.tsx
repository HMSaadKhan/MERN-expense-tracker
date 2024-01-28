import { FC } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";


interface LoadingScreenI {
  loading: boolean;
}

const LoadingScreen: FC<LoadingScreenI> = ({ loading }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress />
    </Backdrop>
  );
};

export default LoadingScreen;
