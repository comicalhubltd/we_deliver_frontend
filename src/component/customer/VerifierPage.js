import dashboard from "../style/dashboard/CustomerDashboard.module.css";
import style from "../style/form/StudentRegistration.module.css";
import { lazy, useState } from "react";
import React from "react";
import TextField from "@mui/material/TextField";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { Alert, Snackbar } from "@mui/material";
import { Formik } from "formik";
import { object, string, ref } from "yup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { saveDriver, resetStatus } from "../../redux/reducer/driverSlice";
import { getClassNames, classExists } from "../../redux/reducer/deliveryRequestSlice";
import { useEffect } from "react";
import { Close as Cancel } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useLocation } from "react-router-dom";
import { getVerificationStatus } from "../../redux/reducer/loginSlice";
import { useNavigate } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  minHeight: "550px",
  maxHeight: "77vh", // Fixed height
  overflowY: "auto", // Enables vertical scrolling
  "&::-webkit-scrollbar": {
    display: "none",
  },
  // Hide scrollbar for Firefox
  scrollbarWidth: "none", // Firefox
  msOverflowStyle: "none", // IE and Edge
  borderRadius: "10px",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  position: "relative",
  minHeight: "100vh",
  width: "100%",
  backgroundColor: "rgba(10, 40, 89)",
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

const VerifierPage = () => {
  const [open, setOpen] = useState(true);
  const [alertType, setAlertType] = useState("");
  const [message, setMessage] = useState("");
  const studentState = useSelector((state) => state.students);
  const classState = useSelector((state) => state.classes);
  const { status: studentStatus, error: studentError } = studentState;
  const {
    classNames: classNames,
    fetchingStatus: classFetchingStatus,
    error: classError,
  } = classState;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
    
  };

  const queryParam = new URLSearchParams(location.search);
  const resetToken = queryParam.get("resetToken");

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await dispatch(
          getVerificationStatus(resetToken)
        ).unwrap();
        console.log(resetToken);
        setAlertType("success");
        setMessage(result.message);
      } catch (error) {
        setAlertType("error");
        setMessage(error.message);
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return; // Prevent closing if the user clicks away
    }
    setOpen(false); // Close the Snackbar
  };

  const navigateToLogin = () => {
    navigate("/admin/login");
  };

  const backToRegister = () => {
    navigate("/school/register");
  };

  return (
    <SignInContainer>
      {/*This Area is for Snackbar*/}

      <Snackbar
        open={true}
        //  autoHideDuration={3000} // Automatically hide after 1 second
        onClose={handleClose}
        anchorOrigin={{ vertical: "center", horizontal: "center" }} // Position at the top center
      >
        <div>
          <Dialog
            open={true}
            onClose={handleClose}
            BackdropProps={{
              sx: { backgroundColor: "rgba(157, 152, 202, 0.5)" }, // Darker overlay
            }}
            sx={{
              "& .MuiDialog-paper": {
                width: "100%",
                borderRadius: "15px", // Optional: Rounded corners
              },
            }}
          >
            {alertType === "success" ? (
              <div
                style={{ width: "100%", background: "#fff" }}
                class={[dashboard["card--alert-success"]].join(" ")}
              >
                <div class={dashboard["card_body"]}>
                  <span class={dashboard["icon-container"]}>
                    <svg
                      class={[
                        dashboard["icon--big"],
                        dashboard["icon--success"],
                      ].join(" ")}
                    >
                      <use href="../images/sprite.svg#success-icon"></use>
                    </svg>
                  </span>

                  <p class={dashboard["alert-message"]}>{message}</p>
                </div>
                <p class={dashboard["card_footer"]}>success</p>
                <div
                  class={[
                    dashboard["card--add"],
                    dashboard["card--primary"],
                  ].join(" ")}
                >
                  <div class={dashboard["card_body"]}>
                    <button
                      type="submit"
                      onClick={() => navigateToLogin()}
                      className={[
                        dashboard["btn"],
                        dashboard["btn--block"],
                        dashboard["btn--primary"],
                      ].join(" ")}
                    >
                      {"Proceed to login"}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{ width: "100%", background: "#fff" }}
                class={[dashboard["card--alert-error"]].join(" ")}
              >
                <div class={dashboard["card_body"]}>
                  <span class={dashboard["icon-container"]}>
                    <svg
                      class={[
                        dashboard["icon--big"],
                        dashboard["icon--error"],
                      ].join(" ")}
                    >
                      <use href="../images/sprite.svg#error-icon"></use>
                    </svg>
                  </span>

                  <p class={dashboard["alert-message"]}>{message}</p>
                </div>
                <p class={dashboard["card_footer"]}>error</p>
                <div
                  class={[
                    dashboard["card--add"],
                    dashboard["card--primary"],
                  ].join(" ")}
                >
                  <div class={dashboard["card_body"]}>
                    <button
                      type="submit"
                      onClick={() => backToRegister()}
                      className={[
                        dashboard["btn"],
                        dashboard["btn--block"],
                        dashboard["btn--primary"],
                      ].join(" ")}
                    >
                      {"Back To Register"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Dialog>
        </div>
      </Snackbar>
    </SignInContainer>
  );
};

export default VerifierPage;
