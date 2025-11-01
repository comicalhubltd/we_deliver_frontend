import dashboard from "../style/dashboard/CustomerDashboard.module.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import PropTypes from "prop-types";
import {
  getClassNamesStartingWith,
 
} from "../../redux/reducer/deliveryRequestSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  saveDeliveryRequest,
  resetStatus,
  deleteClass,
} from "../../redux/reducer/deliveryRequestSlice";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import style from "../style/form/StudentRegistration.module.css";
import { Formik } from "formik";
import { object, string, array } from "yup";
import { Alert, Snackbar } from "@mui/material";
import { Dialog } from "@mui/material";
import ActionMenu from "../utility/ActionMenu";
import Loading from "../Chunks/loading";
import { useParams } from "react-router-dom";
import { getStudentById } from "../../redux/reducer/driverSlice";
import { Stack } from "@mui/material";

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
import MuiCard from "@mui/material/Card";

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
  //backgroundColor: 'rgba(10, 40, 89)',
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

const StudentDetails = () => {
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

  const studentRegistrationSchema = object({
    firstname: string()
      .max(15, "Firstname must not exceed 15 characters")
      .required("Firstname is required"),

    surname: string()
      .max(15, "Surname must not exceed 15 characters")
      .required("Surname is required"),

    lastname: string().max(15, "Lastname must not exceed 15 characters"),

    entryDate: string().required("Date Required"),

    gender: string().required("Gender Required"),
  });

  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [message, setMessage] = useState("");
  const studentState = useSelector((state) => state.students);
  const classState = useSelector((state) => state.classes);
  const { fetchingStatus } = studentState;
  const {
    classNames: classNames,
    fetchingStatus: classFetchingStatus,
    error: classError,
  } = classState;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { id, className } = useParams();
  const [loading, setIsLoading] = useState(true);

  
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
    
  };

  const [state, setState] = useState({
    id: "",
    firstname: "",
    surname: "",
    lastname: "",
    entryDate: "",
    gender: "",
    regNo: "",
    class: "",
  });

  useEffect(() => {
    fetchStudent();
  }, [location.pathname]);

  const fetchStudent = async () => {
    try {
      setIsLoading(true);
      await dispatch(getStudentById(id))
        .unwrap()
        .then((result) => {
          console.log("ganinan" + result.regNo);
          setState({
            id: result.id,
            firstname: result.firstname,
            surname: result.surname,
            lastname: result.lastname,
            entryDate: result.entryDate,
            gender: result.gender,
            regNo: result.regNo,
            class: result.class1.name,
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

  console.log(" chshshhs" + state.firstname);

  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />

            {/* Navbar */}
            <AppBar
              position="fixed"
              sx={{ zIndex: 2, background: "white", color: "#018965" }}
            >
              <Toolbar
                sx={{
                  zIndex: 2,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {!isLargeScreen && (
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={toggleDrawer}
                  >
                    <MenuIcon sx={{ color: "inherit", fontSize: 30 }} />
                  </IconButton>
                )}

                <div>
                  {/** Profile Setup */}

                  <IconButton
                    onClick={profilePopup}
                    sx={{
                      backgroundColor: "#018965", // Custom background
                      "&:hover": {
                        backgroundColor: "#03684f",
                      },
                    }}
                  >
                    <PersonOutlineOutlinedIcon
                      sx={{ color: "white", fontSize: 25 }} // fontSize in px
                    />
                  </IconButton>

                  <BasePopup
                    sx={{ zIndex: 2 }}
                    id={idProfile}
                    open={openProfile}
                    anchor={anchorProfile}
                  >
                    <div className={navbar["profile--selection__container"]}>
                      <div className={navbar["profile"]}>
                        <a
                          href="#/
             customer/profile"
                          className={[navbar["link--profile"], navbar[""]].join(
                            " "
                          )}
                        >
                          Profile
                        </a>
                      </div>
                      <div className={navbar["logout"]}>
                        <a
                          onClick={logout}
                          className={[navbar["link--profile"], navbar[""]].join(
                            " "
                          )}
                        >
                          Logout
                        </a>
                      </div>
                    </div>
                  </BasePopup>
                </div>
              </Toolbar>
            </AppBar>

            {/* Drawer */}
            <Drawer
              variant={isLargeScreen ? "persistent" : "temporary"}
              open={isLargeScreen || isDrawerOpen}
              onClose={!isLargeScreen ? toggleDrawer : undefined}
              sx={{
                width: 240,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: 240,
                  boxSizing: "border-box",
                },
                "& .MuiBackdrop-root": {
                  backgroundColor: "rgba(157, 152, 202, 0.3)", // Transparent backdrop
                },
              }}
            >
              {/* Drawer Header */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  borderBottom: "1px solid #ddd",
                }}
              >
                {/* Logo in the center */}
                <Box sx={{ textAlign: "center", flexGrow: 1 }}>
                  <a
                    className={[navbar["logo__link"], navbar["logo"]].join(" ")}
                    href="#"
                  >
                    <img src="/images/logo.png" alt="miqwii logo" />
                  </a>
                </Box>

                {/* Close Button */}
                {!isLargeScreen && (
                  <IconButton onClick={toggleDrawer}>
                    <Cancel sx={{ color: "#018965", fontSize: 30 }} />
                  </IconButton>
                )}
              </Box>

              {/* Drawer Content */}
              <List>
                {/* Dashboard Navbar Content */}
                <div
                  className={[
                    navbar["collapsible"],
                    navbar[
                      activeChevron === "chevron-0"
                        ? "collapsible--expanded"
                        : null
                    ],
                  ].join(" ")}
                >
                  <header className={navbar["collapsible__header"]}>
                    <div className={navbar["collapsible__icon"]}>
                      <svg
                        class={[
                          navbar["collapsible--icon"],
                          navbar["icon--primary"],
                        ].join(" ")}
                      >
                        <use href="#/
             images/sprite.svg#dashboard"></use>
                      </svg>
                      <p className={navbar["collapsible__heading"]}>
                        Dashboard
                      </p>
                    </div>

                    <span
                      onClick={() => toggleChevron("chevron-0")}
                      className={navbar["icon-container"]}
                    >
                      <svg
                        className={[
                          navbar["icon"],
                          navbar["icon--primary"],
                          navbar["icon--white"],
                          navbar["collapsible--chevron"],
                        ].join(" ")}
                      >
                        <use href="#/
             images/sprite.svg#chevron"></use>
                      </svg>
                    </span>
                  </header>

                  <div className={navbar["collapsible__content--drawer"]}>
                    <a
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      Logout
                    </a>
                  </div>
                </div>

                {/* Customer Navbar Content */}
             <div
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleChevron("chevron-1")}
                  className={[
                    navbar["collapsible"],
                    navbar[
                      activeChevron === "chevron-1"
                        ? "collapsible--expanded"
                        : null
                    ],
                  ].join(" ")}
                >
                  <header className={navbar["collapsible__header"]}>
                    <div className={navbar["collapsible__icon"]}>
                      <svg
                        class={[
                          navbar["collapsible--icon"],
                          navbar["icon--primary"],
                        ].join(" ")}
                      >
                        <use href="../images/sprite.svg#customer"></use>
                      </svg>
                      <p className={navbar["collapsible__heading"]}>Customers</p>
                    </div>

                    <span
                      onClick={() => toggleChevron("chevron-1")}
                      className={navbar["icon-container"]}
                    >
                      <svg
                        className={[
                          navbar["icon"],
                          navbar["icon--primary"],
                          navbar["icon--white"],
                          navbar["collapsible--chevron"],
                        ].join(" ")}
                      >
                        <use href="../images/sprite.svg#chevron"></use>
                      </svg>
                    </span>
                  </header>

                  <div className={navbar["collapsible__content--drawer"]}>
                 
                    <a
             href="#/
             customer/view-customers"
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      View Customers
                    </a>
               
                  </div>
                </div>


                {/* Driver Navbar Content */}
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleChevron("chevron-2")}
                  className={[
                    navbar["collapsible"],
                    navbar[
                      activeChevron === "chevron-2"
                        ? "collapsible--expanded"
                        : null
                    ],
                  ].join(" ")}
                >
                  <header className={navbar["collapsible__header"]}>
                    <div className={navbar["collapsible__icon"]}>
                      <svg
                        class={[
                          navbar["collapsible--icon"],
                          navbar["icon--primary"],
                        ].join(" ")}
                      >
                        <use href="#/
             images/sprite.svg#request"></use>
                      </svg>
                      <p className={navbar["collapsible__heading"]}>Classes</p>
                    </div>

                    <span
                      onClick={() => toggleChevron("chevron-2")}
                      className={navbar["icon-container"]}
                    >
                      <svg
                        className={[
                          navbar["icon"],
                          navbar["icon--primary"],
                          navbar["icon--white"],
                          navbar["collapsible--chevron"],
                        ].join(" ")}
                      >
                        <use href="#/
             images/sprite.svg#chevron"></use>
                      </svg>
                    </span>
                  </header>

                  <div className={navbar["collapsible__content--drawer"]}>
                    <a
             href="#/
             class/jss-classes"
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      JSS Classes
                    </a>
                    <a
             href="#/
             class/sss-classes"
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      SSS Classes
                    </a>
                    <a
             href="#/
             class/primary-classes"
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      Primary Classes
                    </a>
                    <a
             href="#/
             class/add-jss-class"
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      Add JSS Class
                    </a>
                    <a
             href="#/
             class/add-sss-class"
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      Add SSS Class
                    </a>
                    <a
             href="#/
             class/add-pri-class"
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      Add Primary Class
                    </a>
                  </div>
                </div>

                {/* Vehicle Navbar Content */}
                <div
                  className={[
                    navbar["collapsible"],
                    navbar[
                      activeChevron === "chevron-3"
                        ? "collapsible--expanded"
                        : null
                    ],
                  ].join(" ")}
                >
                  <header className={navbar["collapsible__header"]}>
                    <div className={navbar["collapsible__icon"]}>
                      <svg
                        class={[
                          navbar["collapsible--icon"],
                          navbar["icon--primary"],
                        ].join(" ")}
                      >
                        <use href="#/
             images/sprite.svg#subject"></use>
                      </svg>
                      <p className={navbar["collapsible__heading"]}>Subjects</p>
                    </div>

                    <span
                      onClick={() => toggleChevron("chevron-3")}
                      className={navbar["icon-container"]}
                    >
                      <svg
                        className={[
                          navbar["icon"],
                          navbar["icon--primary"],
                          navbar["icon--white"],
                          navbar["collapsible--chevron"],
                        ].join(" ")}
                      >
                        <use href="#/
             images/sprite.svg#chevron"></use>
                      </svg>
                    </span>
                  </header>

                  <div className={navbar["collapsible__content--drawer"]}>
                    <a
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      Logout
                    </a>
                  </div>
                </div>

                {/* Delivery Request  Navbar Content */}
                <div
                  className={[
                    navbar["collapsible"],
                    navbar[
                      activeChevron === "chevron-4"
                        ? "collapsible--expanded"
                        : null
                    ],
                  ].join(" ")}
                >
                  <header className={navbar["collapsible__header"]}>
                    <div className={navbar["collapsible__icon"]}>
                      <svg
                        class={[
                          navbar["collapsible--icon"],
                          navbar["icon--primary"],
                        ].join(" ")}
                      >
                        <use href="#/
             images/sprite.svg#teacher"></use>
                      </svg>
                      <p className={navbar["collapsible__heading"]}>Teachers</p>
                    </div>

                    <span
                      onClick={() => toggleChevron("chevron-4")}
                      className={navbar["icon-container"]}
                    >
                      <svg
                        className={[
                          navbar["icon"],
                          navbar["icon--primary"],
                          navbar["icon--white"],
                          navbar["collapsible--chevron"],
                        ].join(" ")}
                      >
                        <use href="#/
             images/sprite.svg#chevron"></use>
                      </svg>
                    </span>
                  </header>

                  <div className={navbar["collapsible__content--drawer"]}>
                    <a
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      Logout
                    </a>
                  </div>
                </div>

                {/* Movements Navbar Content */}
                <div
                  className={[
                    navbar["collapsible"],
                    navbar[
                      activeChevron === "chevron-5"
                        ? "collapsible--expanded"
                        : null
                    ],
                  ].join(" ")}
                >
                  <header className={navbar["collapsible__header"]}>
                    <div className={navbar["collapsible__icon"]}>
                      <svg
                        class={[
                          navbar["collapsible--icon"],
                          navbar["icon--primary"],
                        ].join(" ")}
                      >
                        <use href="#/
             images/sprite.svg#score"></use>
                      </svg>
                      <p className={navbar["collapsible__heading"]}>Scores</p>
                    </div>

                    <span
                      onClick={() => toggleChevron("chevron-5")}
                      className={navbar["icon-container"]}
                    >
                      <svg
                        className={[
                          navbar["icon"],
                          navbar["icon--primary"],
                          navbar["icon--white"],
                          navbar["collapsible--chevron"],
                        ].join(" ")}
                      >
                        <use href="#/
             images/sprite.svg#chevron"></use>
                      </svg>
                    </span>
                  </header>

                  <div className={navbar["collapsible__content--drawer"]}>
                    <a
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      Logout
                    </a>
                  </div>
                </div>

                {/* Location Navbar Content */}
                <div
                  className={[
                    navbar["collapsible"],
                    navbar[
                      activeChevron === "chevron-6"
                        ? "collapsible--expanded"
                        : null
                    ],
                  ].join(" ")}
                >
                  <header className={navbar["collapsible__header"]}>
                    <div className={navbar["collapsible__icon"]}>
                      <svg
                        class={[
                          navbar["collapsible--icon"],
                          navbar["icon--primary"],
                        ].join(" ")}
                      >
                        <use href="#/
             images/sprite.svg#result"></use>
                      </svg>
                      <p className={navbar["collapsible__heading"]}>Results</p>
                    </div>

                    <span
                      onClick={() => toggleChevron("chevron-6")}
                      className={navbar["icon-container"]}
                    >
                      <svg
                        className={[
                          navbar["icon"],
                          navbar["icon--primary"],
                          navbar["icon--white"],
                          navbar["collapsible--chevron"],
                        ].join(" ")}
                      >
                        <use href="#/
             images/sprite.svg#chevron"></use>
                      </svg>
                    </span>
                  </header>

                  <div className={navbar["collapsible__content--drawer"]}>
                    <a
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      Logout
                    </a>
                  </div>
                </div>

                {/* Payment Navbar Content */}
                <div
                  className={[
                    navbar["collapsible"],
                    navbar[
                      activeChevron === "chevron-7"
                        ? "collapsible--expanded"
                        : null
                    ],
                  ].join(" ")}
                >
                  <header className={navbar["collapsible__header"]}>
                    <div className={navbar["collapsible__icon"]}>
                      <svg
                        class={[
                          navbar["collapsible--icon"],
                          navbar["icon--primary"],
                        ].join(" ")}
                      >
                        <use href="#/
             images/sprite.svg#fee"></use>
                      </svg>
                      <p className={navbar["collapsible__heading"]}>
                        School Fees
                      </p>
                    </div>

                    <span
                      onClick={() => toggleChevron("chevron-7")}
                      className={navbar["icon-container"]}
                    >
                      <svg
                        className={[
                          navbar["icon"],
                          navbar["icon--primary"],
                          navbar["icon--white"],
                          navbar["collapsible--chevron"],
                        ].join(" ")}
                      >
                        <use href="#/
             images/sprite.svg#chevron"></use>
                      </svg>
                    </span>
                  </header>

                  <div className={navbar["collapsible__content--drawer"]}>
                    <a
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      Logout
                    </a>
                  </div>
                </div>

                
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleChevron("chevron-8")}
                  className={[
                    navbar["collapsible"],
                    navbar[
                      activeChevron === "chevron-8"
                        ? "collapsible--expanded"
                        : null
                    ],
                  ].join(" ")}
                >
                  <header className={navbar["collapsible__header"]}>
                    <div className={navbar["collapsible__icon"]}>
                      <svg
                        class={[
                          navbar["collapsible--icon"],
                          navbar["icon--primary"],
                        ].join(" ")}
                      >
                        <use href="../images/sprite.svg#subscription"></use>
                      </svg>
                      <p className={navbar["collapsible__heading"]}>
                        Subscription
                      </p>
                    </div>

                    <span
                      onClick={() => toggleChevron("chevron-8")}
                      className={navbar["icon-container"]}
                    >
                      <svg
                        className={[
                          navbar["icon"],
                          navbar["icon--primary"],
                          navbar["icon--white"],
                          navbar["collapsible--chevron"],
                        ].join(" ")}
                      >
                        <use href="../images/sprite.svg#chevron"></use>
                      </svg>
                    </span>
                  </header>

                  <div className={navbar["collapsible__content--drawer"]}>
                    <a
             href="#/
             payment/pay-subscription"
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      Pay Subscription
                    </a>
                  </div>
                </div>

                {/* Profile Navbar Content */}
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleChevron("chevron-9")}
                  className={[
                    navbar["collapsible"],
                    navbar[
                      activeChevron === "chevron-9"
                        ? "collapsible--expanded"
                        : null
                    ],
                  ].join(" ")}
                >
                  <header className={navbar["collapsible__header"]}>
                    <div className={navbar["collapsible__icon"]}>
                      <svg
                        class={[
                          navbar["collapsible--icon"],
                          navbar["icon--primary"],
                        ].join(" ")}
                      >
                        <use href="#/
             images/sprite.svg#profile"></use>
                      </svg>
                      <p className={navbar["collapsible__heading"]}>Profile</p>
                    </div>

                    <span
                      onClick={() => toggleChevron("chevron-9")}
                      className={navbar["icon-container"]}
                    >
                      <svg
                        className={[
                          navbar["icon"],
                          navbar["icon--primary"],
                          navbar["icon--white"],
                          navbar["collapsible--chevron"],
                        ].join(" ")}
                      >
                        <use href="#/
             images/sprite.svg#chevron"></use>
                      </svg>
                    </span>
                  </header>

                  <div className={navbar["collapsible__content--drawer"]}>
                    <a
             href="#/
             customer/profile"
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      Profile
                    </a>
                    <a
                      onClick={logout}
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      Logout
                    </a>
                  </div>
                </div>
              </List>
            </Drawer>

            {/* Main Content */}
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                marginTop: 8,
                fontSize: 23,
                overflowX: "auto",
                width: "100%",
                color: "#9a99ac",
                transition: "margin-left 0.3s ease-in-out",
              }}
            >
              <SignInContainer>
                <Card>
                  {/*Card Header*/}
                  <p className={style["form-header"]}>Student Details</p>

                  <div class={dashboard["card--details"]}>
                    <span>Firstname:</span> {state.firstname}
                  </div>

                  <div class={dashboard["card--details"]}>
                    <span>Surname:</span> {state.surname}
                  </div>

                  <div class={dashboard["card--details"]}>
                    <span>Lastname:</span> {state.lastname}
                  </div>

                  <div class={dashboard["card--details"]}>
                    <span>Gender:</span> {state.gender}
                  </div>

                  <div class={dashboard["card--details"]}>
                    <span>Entry date:</span> {state.entryDate}
                  </div>

                  <div class={dashboard["card--details"]}>
                    <span>Class Name:</span> {state.class}
                  </div>
                </Card>
              </SignInContainer>
            </Box>
          </Box>
        </ClickAwayListener>
      )}
    </>
  );
};

export default StudentDetails;
