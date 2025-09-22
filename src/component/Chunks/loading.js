import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Lottie from "react-lottie";
import animationData from "../lotties/loading1.json";
import loading from "../style/chunks/Loading.module.css";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

const Loading = () => {
  const SignInContainer = styled(Stack)(({ theme }) => ({
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#028766",
    backgroundImage: `background-color: #67BD50;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cg %3E%3Ccircle fill='%2367BD50' cx='400' cy='400' r='600'/%3E%3Ccircle fill='%2352b357' cx='400' cy='400' r='500'/%3E%3Ccircle fill='%233fa95d' cx='400' cy='400' r='400'/%3E%3Ccircle fill='%232b9e61' cx='400' cy='400' r='300'/%3E%3Ccircle fill='%23189464' cx='400' cy='400' r='200'/%3E%3Ccircle fill='%23018965' cx='400' cy='400' r='100'/%3E%3C/g%3E%3C/svg%3E");
background-attachment: fixed;
background-size: cover;;`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(4),
    },
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      zIndex: -1,
      inset: 0,
      backgroundImage:
        "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      ...theme.applyStyles("dark", {
        backgroundImage:
          "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
      }),
    },
  }));

  const [open, setOpen] = React.useState(true);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    // className={loading['root']}
    <SignInContainer>
      <Dialog
        open={open}
        BackdropProps={{
          sx: { backgroundColor: "rgba(157, 152, 202, 0.0)" }, // Darker overlay
        }}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#F1F1F1", //
            borderRadius: "15px", // Optional: Rounded corners
            padding: "1rem",
            overflow: "hidden",
          },
        }}
      >
        <div className={loading["loading-container"]}>
          <img
            className={loading["loading-image"]}
            src="/images/logo-loading.png"
            alt="Logo"
          />

          <Lottie
            options={defaultOptions}
            height={80}
            width={110}
            isClickToPauseDisabled={true}
            style={{
              transform: "scale(1.7)", // Increase the size by 1.5x
              transformOrigin: "center",
              display: "block",
              marginRight: "0.5rem",
            }}
          />
        </div>
      </Dialog>

      {/* <img className={loading['svg']} src="/images/svg-loaders/oval.svg" alt='SVG BACKGROUND' /> */}
    </SignInContainer>
  );
};
export default Loading;
