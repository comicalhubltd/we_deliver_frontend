import dashboard from "../style/dashboard/CustomerDashboard.module.css";
import style from "../style/form/StudentRegistration.module.css";
import { lazy, useState } from "react";
import TextField from "@mui/material/TextField";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { Alert, Snackbar } from "@mui/material";
import { getDeliveryRequest } from "../../redux/reducer/deliveryRequestSlice";
import { Formik } from "formik";
import { object, string, ref } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../Chunks/loading";
import { getAuthSchool } from "../../redux/reducer/customerSlice";
import { updateDeliveryStatusWithFeedBack } from "../../redux/reducer/deliveryRequestSlice";


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
    maxWidth: "500px",
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

const RequestConfirmation = () => {
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



     const requestConfirmationSchema = object({
 
  
      feedback: string()
       .max(100, "Feedback must not exceed 100 characters")
        .required("Feedback is required"),
  
    
    });
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [deliveryStatus, setDeliveryStatus] = useState(0);
  const { id } = useParams();
  const [loading, setIsLoading] = useState(true);

  
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
    
  };

  const [state, setState] = useState({
    id: "",
    customer: null,
    item: null,
    from: null,
    to: null,
    pickerName: "",
    pickerPhone: "",
    createdAt: "",
    status: "",
    distancekm: "",
    deliveryFee: "",
  });

  useEffect(() => {
    fetchSchool();
  }, [location.pathname]);

  const fetchSchool = async () => {
    try {
      setIsLoading(true);
      await dispatch(getDeliveryRequest(id))
        .unwrap()
        .then((result) => {
          console.log("ganinan" + JSON.stringify(result));
          setState({
            id: result.id,
            customer: result.customer,
            item: result.item,
            from: result.from,
            to: result.to,
            pickerName: result.pickerName,
            pickerPhone: result.pickerPhone,
            createdAt: result.createdAt,
            status: result.status,
            distancekm: result.distancekm,
            deliveryFee: result.deliveryFee,
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

   

    const headings = {
    1: "Delivery Details",
    2: "Send Feedback",
   }

   const statuses = {
    1: "awaiting-transit",
    2: "rejected"
   }





    const handleRejectionChange =  () => {
      setDeliveryStatus(2);
      setStep(2)

    };


    const handleAcceptanceChange = () => {
      setDeliveryStatus(1);
      setStep(2)
    };
  
    const handleFormSubmit = async (values, { resetForm }) => {
      const deliveryRequestData = {
         
        status: statuses[deliveryStatus],
        feedback: values.feedback
                    
      }
  
      try {
        const result = await dispatch(updateDeliveryStatusWithFeedBack({deliveryRequestData: deliveryRequestData, deliveryRequestId: id})).unwrap();
        console.log(result);
        setAlertType("success");
        setMessage(result.message);
      } catch (error) {
        console.log(error);
        setAlertType("error");
  
        setMessage(error.message);
      }
  
      setOpen(true);
      resetForm(); // This will reset the forto the initial values
    };

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
                          href="/customer/profile"
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
              {/* Drawer Content */}
                         <List>
                           {/* Dashboard Navbar Content */}
                           {/* Dashboard Navbar Content */}
                           <div
                             style={{ cursor: "pointer" }}
                             onClick={() => toggleChevron("chevron-0")}
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
                                   <use href="/images/sprite.svg#dashboard"></use>
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
                                   <use href="/images/sprite.svg#chevron"></use>
                                 </svg>
                               </span>
                             </header>
           
                             <div className={navbar["collapsible__content--drawer"]}>
                               <a
                                 href="/admin/home"
                                 className={[navbar["link--drawer"], navbar[""]].join(" ")}
                               >
                                 Home
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
                                   <use href="/images/sprite.svg#customer"></use>
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
                                   <use href="/images/sprite.svg#chevron"></use>
                                 </svg>
                               </span>
                             </header>
           
                             <div className={navbar["collapsible__content--drawer"]}>
                            
                               <a
                                 href="/customer/view-customers"
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
                                   <use href="/images/sprite.svg#driver"></use>
                                 </svg>
                                 <p className={navbar["collapsible__heading"]}>Drivers</p>
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
                                   <use href="/images/sprite.svg#chevron"></use>
                                 </svg>
                               </span>
                             </header>
           
                             <div className={navbar["collapsible__content--drawer"]}>
                               <a
                                 href="/driver/view-drivers"
                                 className={[navbar["link--drawer"], navbar[""]].join(" ")}
                               >
                                 View Drivers
                               </a>
                               <a
                                 href="/driver/sss-classes"
                                 className={[navbar["link--drawer"], navbar[""]].join(" ")}
                               >
                                 Available Drivers
                               </a>
                               <a
                                 href="/class/primary-classes"
                                 className={[navbar["link--drawer"], navbar[""]].join(" ")}
                               >
                                 Drivers Enroute
                               </a>
                              
                             </div>
                           </div>
           
                           {/* Vehicle Navbar Content */}
                           <div
                             style={{ cursor: "pointer" }}
                             onClick={() => toggleChevron("chevron-3")}
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
                                   <use href="/images/sprite.svg#vehicle"></use>
                                 </svg>
                                 <p className={navbar["collapsible__heading"]}>Vehicles</p>
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
                                   <use href="/images/sprite.svg#chevron"></use>
                                 </svg>
                               </span>
                             </header>
           
                             <div className={navbar["collapsible__content--drawer"]}>
                               <a
                                 href="/vehicle/view-vehicles"
                                 className={[navbar["link--drawer"], navbar[""]].join(" ")}
                               >
                                 View Vehicles
                               </a>
                              
                             </div>
                           </div>
           
                         
                           {/* Delivery Request  Navbar Content */}
                           
                           {/* Delivery Request  Navbar Content */}
                         
                           {/* Delivery Request  Navbar Content */}
                           <div
                             style={{ cursor: "pointer" }}
                             onClick={() => toggleChevron("chevron-4")}
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
                                   <use href="/images/sprite.svg#request"></use>
                                 </svg>
                                  <p className={navbar["collapsible__heading"]}>Delivery Status</p>
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
                                   <use href="/images/sprite.svg#chevron"></use>
                                 </svg>
                               </span>
                             </header>
           
                             <div className={navbar["collapsible__content--drawer"]}>
           
                              
           
           
                               <a
                                 href="/delivery/on-transit"
                                 className={[navbar["link--drawer"], navbar[""]].join(" ")}
                               >
                                 On Transit 
                               </a>
           
           
                     <a
                                 href="/delivery/awaiting-transit"
                                 className={[navbar["link--drawer"], navbar[""]].join(" ")}
                               >
                                 Awaiting Transit
                               </a>
           
                               <a
                                 href="/delivery/delivered"
                                 className={[navbar["link--drawer"], navbar[""]].join(" ")}
                               >
                                 Delivered
                               </a>
           
           
                                 <a
                                 href="/delivery/pending"
                                 className={[navbar["link--drawer"], navbar[""]].join(" ")}
                               >
                                 Pending
                               </a>
           
                                 <a
                                 href="/delivery/view-all-delivery"
                                 className={[navbar["link--drawer"], navbar[""]].join(" ")}
                               >
                                 View All Deliveries
                               </a>
                             
                               <a
                                 href="/delivery/add-delivery"
                                 className={[navbar["link--drawer"], navbar[""]].join(" ")}
                               >
                                 Add Deliveries
                               </a>
                             </div>
                           </div>
           
                        
           
                           {/* Location Navbar Content */}
                           <div
                             style={{ cursor: "pointer" }}
                             onClick={() => toggleChevron("chevron-6")}
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
                                   <use href="/images/sprite.svg#location"></use>
                                 </svg>
                                 <p className={navbar["collapsible__heading"]}>Locations</p>
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
                                   <use href="/images/sprite.svg#chevron"></use>
                                 </svg>
                               </span>
                             </header>
           
                             <div className={navbar["collapsible__content--drawer"]}>
                               <a
                                 href="/location/show-locations"
                                 className={[navbar["link--drawer"], navbar[""]].join(" ")}
                               >
                                 Live Location
                               </a>
                             </div>
                           </div>
           
                           {/* Payment Navbar Content */}
                             <div
                             style={{ cursor: "pointer" }}
                             onClick={() => toggleChevron("chevron-7")}
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
                                   <use href="/images/sprite.svg#fee"></use>
                                 </svg>
                                 <p className={navbar["collapsible__heading"]}>
                                   Payments
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
                                   <use href="/images/sprite.svg#chevron"></use>
                                 </svg>
                               </span>
                             </header>
           
                             <div className={navbar["collapsible__content--drawer"]}>
                               <a
                                 href="/payment/paid-deliveries"
                                 className={[navbar["link--drawer"], navbar[""]].join(" ")}
                               >
                                 Paid Deliveries
                               </a>
                    <a
                                 href="/payment/unpaid-deliveries"
                                 className={[navbar["link--drawer"], navbar[""]].join(" ")}
                               >
                                 Unpaid Deliveries
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
                                   <use href="/images/sprite.svg#profile"></use>
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
                                   <use href="/images/sprite.svg#chevron"></use>
                                 </svg>
                               </span>
                             </header>
           
                             <div className={navbar["collapsible__content--drawer"]}>
                               <a
                                 href="/customer/profile"
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
                <Formik
                  initialValues={
                    {
                      status: statuses[deliveryStatus],
                      feedback: ""
                    }
                  }
                  validationSchema={requestConfirmationSchema}
                  onSubmit={handleFormSubmit}
                >
                  {({
                    errors,
                    handleChange,
                    handleSubmit,
                    values,
                    isSubmitting,
                    touched,
                    handleBlur,
                    setFieldValue
                  }) => { 
                    
                  // const handleFromStateChange = (event) => {
                  //   setFieldValue("from.state", event.target.value);
                  //   setFieldValue("from.lga", ""); // reset LGA when state changes
                  // };


                      
                  // const handleToStateChange = (event) => {
                  //   setFieldValue("to.state", event.target.value);
                  //   setFieldValue("to.lga", ""); // reset LGA when state changes
                  // };


                 
                
                
         
                    return ( 
                    <Card>
               
                      {/*Card Header*/}
                      <p className={style["form-header"]}>{headings[step]}</p>
          
          
                      {step === 1 && 
                      (
                        <>
          
                      
                      
                    <div
                  class={[
             dashboard["card--confirmation"],
               dashboard["card--primary"],
                                          ].join(" ")}
                                        >
                                          <div class={dashboard["card_body"]}>
                                            <div  
                                             style={{
                                             width: "100%",
                                             display: "flex",
                                             justifyContent: "center",
                                             zIndex: 1
                                             }} 
                                             class={dashboard["card--small-head"]}>
                                              <button
                                              
                                                onClick={handleAcceptanceChange}
                                                className={[
                                                  dashboard["btn"],
                                                  dashboard["btn--block"],
                                                  dashboard["btn--primary"],
                                                ].join(" ")}
                                              >
                                                ACCEPT
                                              </button>

                                                 <button
                                              
                                                onClick={handleRejectionChange}
                                                className={[
                                                  dashboard["btn"],
                                                  dashboard["btn--block"],
                                                  dashboard["btn--secondary"],
                                                ].join(" ")}
                                              >
                                                REJECT
                                              </button>
                                            </div>
                                          </div>
                                        </div>

                  <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>Type:</span>

                    {state.item?.type}
                  </div>

                   <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>weight:</span>

                    {state.item?.weight}
                  </div>


                    <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>Type:</span>

                    {state.item?.type}
                  </div>



                     <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>Distance:</span>

                    {state.distancekm}
                  </div>


                  
                     <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>Fee:</span>

                    {state.deliveryFee}
                  </div>


                        <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>Picker Name:</span>

                    {state.pickerName}
                  </div>


                       <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>Picker Name:</span>

                    {state.pickerPhone}
                  </div>


                  <p className={style["form-header"]}>FROM Destination</p>

                  <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>State:</span>

                    {state.from?.state}
                  </div>

                 <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>LGA:</span>

                    {state.from?.lga}
                  </div>

                    <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>City:</span>

                    {state.from?.city}
                  </div>


                     <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>Street:</span>

                    {state.from?.street}
                  </div>

                  <p className={style["form-header"]}>To Destination</p>
                     <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>State:</span>

                    {state.to?.state}
                  </div>

                 <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>LGA:</span>

                    {state.to?.lga}
                  </div>

                    <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>City:</span>

                    {state.to?.city}
                  </div>


                     <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>Street:</span>

                    {state.to?.street}
                  </div>

          
                        </>
                      )}
          
                      
                       
                         {step === 2 && 
                      (

                          <>
            
            <TextField
                                  
        label="Feedback"
       name="feedback"
       value={values.feedback}
        multiline
         rows={4}
          onChange={handleChange}
           onBlur={handleBlur}
           error={touched.feedback && Boolean(errors.feedback)}
             helperText={touched.feedback && errors.feedback}
            fullWidth
              margin="normal"
                      
                                     slotProps={{
                                      formHelperText: {
                                        sx: { fontSize: 15 }, // Increase font size of helper text
                                      },
                                      input: {
                                        style: { fontSize: 18 }, // font size for input text
                                      },
                                      inputLabel: {
                                        style: { fontSize: 16 }, // font size for label text
                                      },
                                    }}
                                  >
                                   
                                
                                  
                                  </TextField>
          
                         <button
                       disabled={isSubmitting}
                      type="submit"
                      onClick={handleSubmit}
                      className={[
                      style["btn"],
                    style["btn--block"],
                      style["btn--primary"],].join(" ")}
                                                      >
                {isSubmitting ? "Submitting..." : "Add Delivery"}
                        </button>
          
                        </>
                     
                      )}
          


          
                      
                      
                
          
          
                    </Card>
                  )}}
                </Formik>
          
                <div className={style.footer__brand}>
                  <img src="/images/logo.png" alt="" />
                  <p className={style.footer__copyright}>
                    {" "}
                    (c) 2025 We Deliver, All Rights Reserved
                  </p>
                </div>
          
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
            </Box>
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
                            <CloseIcon
                              sx={{ fontSize: 30, color: "#018965" }}
                            />
                          </IconButton>
                        </span>

                        <span class={dashboard["icon-container"]}>
                          <svg
                            class={[
                              dashboard["icon--big"],
                              dashboard["icon--success"],
                            ].join(" ")}
                          >
                            <use href="/images/sprite.svg#success-icon"></use>
                          </svg>
                        </span>

                        <Typography sx={{ fontSize: 21 }}>
                          <p class={dashboard["alert-message"]}>{message}</p>
                        </Typography>
                      </div>
                      <Typography sx={{ fontSize: 20 }}>
                        <p class={dashboard["card_footer"]}>success</p>
                      </Typography>
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
                            <CloseIcon sx={{ fontSize: 30 }} />
                          </IconButton>
                        </span>

                        <span class={dashboard["icon-container"]}>
                          <svg
                            class={[
                              dashboard["icon--big"],
                              dashboard["icon--error"],
                            ].join(" ")}
                          >
                            <use href="/images/sprite.svg#error-icon"></use>
                          </svg>
                        </span>
                        <Typography sx={{ fontSize: 21 }}>
                          <p class={dashboard["alert-message"]}>{message}</p>
                        </Typography>
                      </div>
                      <Typography sx={{ fontSize: 20 }}>
                        <p class={dashboard["card_footer"]}>error</p>
                      </Typography>
                    </div>
                  )}
                </Dialog>
              </div>
            </Snackbar>
          </Box>
        </ClickAwayListener>
      )}
    </>
  );
};

export default RequestConfirmation;
