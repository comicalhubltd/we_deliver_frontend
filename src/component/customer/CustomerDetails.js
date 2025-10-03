import dashboard from "../style/dashboard/CustomerDashboard.module.css";
import style from "../style/form/StudentRegistration.module.css";
import { lazy, useState } from "react";
import TextField from "@mui/material/TextField";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { Alert, Snackbar } from "@mui/material";
import { Formik } from "formik";
import { object, string, ref } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../Chunks/loading";
import { getAuthCustomer } from "../../redux/reducer/customerSlice";
import { getAuthenticatedDriver } from "../../redux/reducer/driverSlice";


// Import for dashboard Below

import React from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import navbar from "../style/dashboard/CustomerDashboard.module.css";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Cancel,
} from "@mui/icons-material";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { useLocation } from "react-router-dom";
import { getDriverById } from "../../redux/reducer/driverSlice";
import { getCustomerById } from "../../redux/reducer/customerSlice";

import {
  Drawer,
  List,
  Toolbar,
  AppBar,
  Box,
  Typography,
  CssBaseline,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
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

const CustomerDetails = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [anchorProfile, setAnchorProfile] = React.useState(null);
  const [activeChevron, setActiveChevron] = useState(null);

  const toggleChevron = (chevronId) => {
    setActiveChevron((prev) => (prev === chevronId ? null : chevronId));
  };

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const profilePopup = (event) => {
    setAnchorProfile(anchorProfile ? null : event.currentTarget);
  };

  const openProfile = Boolean(anchorProfile);
  const idProfile = openProfile ? "simple-popper" : undefined;

  const handleClickAway = () => {
    setAnchorProfile(null);
  };

  // ABOVE IS DRAWER LOGIC BELOW IS THE APP LOGIC.........................................................................................

  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams();
  const [loading, setIsLoading] = useState(true);

  
  const [state, setState] = useState({
    profile: "",
    user: ""
  });

  useEffect(() => {
    fetchData();
  }, [location.pathname]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await dispatch(getCustomerById(id))
        .unwrap()
        .then((result) => {
          setState({
            profile: result.profile,
            user: result.user
          });
        });
    } catch (error) {
      setAlertType("error");
      setMessage(error.message);
      console.log(error.message);
    }
    setIsLoading(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return; // Prevent closing if the user clicks away
    }
    setOpen(false); // Close the Snackbar
  };

  console.log("State Firstname" + JSON.stringify(state.profile?.firstname));

  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
             <SignInContainer>
                <Card>
                  {/*Card Header*/}
                  <p className={style["form-header"]}>Details</p>

                  <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>Firstname:</span>

                    {state.profile?.firstname}
                  </div>

                  <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>Surname:</span>

                     {state.profile?.surname}
                  </div>

                  <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>Lastname:</span>

                     {state.profile?.lastname}
                  </div>

                  <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>D.O.B:</span>

                    {state.profile?.dob}
                  </div>

                  <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>Phone Number:</span>

                    {state.profile?.phoneNumber}
                  </div>

                  <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    {/* <span>Email:</span>

                    {state.user?.username} */}
                  </div>
                </Card>

                {/*This Area is for Snackbar*/}

                <Snackbar
                  open={open}
                  autoHideDuration={3000} // Automatically hide after 1 second
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "center", horizontal: "center" }} // Position at the top center
                >
                  <div>
                    <Dialog
                      open={open}
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
                            <span
                              class={[
                                dashboard["icon-container"],
                                dashboard["alert-close"],
                              ].join(" ")}
                            >
                              <IconButton onClick={handleClose}>
                                <Cancel sx={{ fontSize: 30 }} />
                              </IconButton>
                            </span>

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
                        </div>
                      ) : (
                        <div
                          style={{ width: "100%", background: "#fff" }}
                          class={[dashboard["card--alert-error"]].join(" ")}
                        >
                          <div class={dashboard["card_body"]}>
                            <span
                              class={[
                                dashboard["icon-container"],
                                dashboard["alert-close"],
                              ].join(" ")}
                            >
                              <IconButton onClick={handleClose}>
                                <Cancel sx={{ fontSize: 30 }} />
                              </IconButton>
                            </span>

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
                        </div>
                      )}
                    </Dialog>
                  </div>
                </Snackbar>
              </SignInContainer>
      )}
    </>
  );
};

export default CustomerDetails;
