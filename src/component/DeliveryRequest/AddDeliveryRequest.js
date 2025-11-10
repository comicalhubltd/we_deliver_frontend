import dashboard from "../style/dashboard/CustomerDashboard.module.css";
import style from "../style/form/StudentRegistration.module.css";
import TextField from "@mui/material/TextField";
import { lazy, useState } from "react";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { IconButton, InputAdornment } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { Alert, Snackbar } from "@mui/material";
import { Formik } from "formik";
import { object, string, array, ref, number } from "yup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { saveDeliveryRequest, resetStatus } from "../../redux/reducer/deliveryRequestSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LngAndLatStateData } from "../utility/LngAndLatStateData";
import { useCallback } from "react";
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
import statesAndLgas from "../utility/NigerianStateAndLgas";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  borderRadius: "10px",
  padding: theme.spacing(4),
  gap: theme.spacing(0),
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
  width: "100%",
  minHeight: "100vh",
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
      backgroundImage: "radial-gradient(at 50% 50%,#002952, hsl(220, 30%, 5%))",
    }),
  },
}));

const AddDeliveryRequest = () => {
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

  // ABOVE IS DRAWER LOGIC BELOW IS THE APP LOGIC

   const deliveryRegistrationSchema = object({
     from: object({
     state: string()
            .max(45, "State must not exceed 30 characters")
            .required("State is required"),
     lga: string()
            .max(30, "L.G.A must not exceed 30 characters")
            .required("L.G.A is required"),
     city: string()
        .max(42, "City must not exceed 42 characters")
        .required("City is required"),
     street: string()
        .max(42, "Street must not exceed 42 characters")
        .required("Street is required"),
       }),

     to: object({
      state: string()
             .max(45, "State must not exceed 30 characters")
             .required("State is required"),
      lga: string()
             .max(30, "L.G.A must not exceed 30 characters")
             .required("L.G.A is required"),
     city: string()
        .max(42, "City must not exceed 42 characters")
        .required("City is required"),
     street: string()
        .max(42, "Street must not exceed 42 characters")
        .required("Street is required"),
    }),

 item: object({
     name: string()
    .max(15, "Name must not exceed 15 characters"),
   
    weight: string()
      .max(5, "Weight must not exceed 5 characters")
      .required("weight is required"),
    type: string()
    .max(15, "Type must not exceed 15 characters"),
    description: string()
    .max(200, "Description must not exceed 200 characters"),
     size: object({ 
     unit: string()
      .max(5, "Unit must not exceed 5 characters")
      .required("Unit is required"),
     width:  number()
      .positive("Must be positive number")
      .min(0.01, "Width must be greater than 0")
      .required("Width is required"),
      height: number()
      .positive("Must be positive number")
      .min(0.01, "Height must be greater than 0")
      .required("Height is required"),
      length: number()
      .positive("Must be positive number")
      .min(0.01, "Lenght must be greater than 0")
      .required("Length is required"),
      }),
     value: number()
    .min(0.01, "Value must be greater than 0")
    .required("Value Name is required")
    }),

    pickerName: string()
      .max(30, "Reciever Name must not exceed 30 characters")
      .required("Reciever Name is required"),

    pickerPhone: string()
          .max(11, "Phone number should not be more than 11")
          .min(11, "Phone number should not be less than 11")
          .required("Phone Number is required"),

    distancekm: number()
            .required("Distance is required"),
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const generateTrackingId = () => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
  const randomCode = Math.random().toString(36).substr(2, 6).toUpperCase(); // 6-char alphanumeric
  return `DLV_${date}_${randomCode}`;
};

  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [message, setMessage] = useState("");
  const classState = useSelector((state) => state.classes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedFromState, setSelectedFromState] = useState('');
  const [selectedToState, setSelectedToState] = useState('');
  const [distanceInfo, setDistanceInfo] = useState(null);

  const headings = {
    1: "Item Description",
    2: "Pickup Address",
    3: "Destination Address",
    4: "Size Measurement",
    5: "Picker Contact"
  }

  const logout = () => {
    localStorage.removeItem("token");
   navigate("/customer/login");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

 const initialValues = {
                    item: {
                    name: "",
                    weight: "",
                    type: "",
                    description: "",
                    size: {
                    unit: "",
                    width: 0,
                    height: 0,
                    length: 0
                    },
                    value: 0
                    },
          
                    from: {
                    state: "",
                    lga: "",
                    city: "",
                    street: ""
                    },
          
                    to: {
                    state: "",
                    lga: "",
                    city: "",
                    street: ""
                    },
                    
                    pickerName: "",
                    pickerPhone: "",
                    distancekm: 0.0,
                    payment: {
                      deliveryFee: 0,
                      insurance: 0,
                      vat: 0,
                      totalAmount: 0,
                      status: "pending"
                    }
                  };

  // Function to convert measurements to meters
  const convertToMeters = (value, unit) => {
    const conversions = {
      'Inch': 0.0254,
      'Feet': 0.3048,
      'CM': 0.01
    };
    return value * (conversions[unit] || 1);
  };

  // Function to calculate delivery fees
  const calculateDeliveryFees = (values) => {
    const itemValue = parseFloat(values.item?.value) || 0;
    const weight = parseFloat(values.item?.weight) || 0;
    const distance = distanceInfo?.distance ? parseFloat(distanceInfo.distance) : 0;
    const width = parseFloat(values.item?.size?.width) || 0;
    const length = parseFloat(values.item?.size?.length) || 0;
    const unit = values.item?.size?.unit || '';

    let deliveryFee = 0;

    // Weight charge (1% per kg)
    const weightCharge = (Math.ceil(weight) / 100) * itemValue;
    deliveryFee += weightCharge;

    // Distance charge (0.5% per 100km)
    const distanceCharge = (Math.ceil(distance / 100) * 0.5 / 100) * itemValue;
    deliveryFee += distanceCharge;

    // Size charge (1% per square meter)
    const widthInMeters = convertToMeters(width, unit);
    const lengthInMeters = convertToMeters(length, unit);
    const squareMeters = widthInMeters * lengthInMeters;
    const sizeCharge = (Math.ceil(squareMeters) / 100) * itemValue;
    deliveryFee += sizeCharge;

    // Insurance (2% of value)
    const insurance = (2 / 100) * itemValue;

    // VAT (assumed 7.5% of delivery fee)
    const vat = (7.5 / 100) * deliveryFee;

    // Total amount
    const totalAmount = deliveryFee + insurance + vat;

    return {
      deliveryFee: deliveryFee.toFixed(2),
      insurance: insurance.toFixed(2),
      vat: vat.toFixed(2),
      totalAmount: totalAmount.toFixed(2)
    };
  };

 const calculateDistance = useCallback(async () => {
  if (selectedFromState && selectedToState && LngAndLatStateData) {
    const fromStateData = LngAndLatStateData.find(state => state.name === selectedFromState);
    const toStateData = LngAndLatStateData.find(state => state.name === selectedToState);
    
    if (fromStateData && toStateData) {
      setIsCalculating(true);
      setDistanceInfo(null);
      
      const result = await calculateDrivingDistance(
        parseFloat(fromStateData.lat),
        parseFloat(fromStateData.lng),
        parseFloat(toStateData.lat),
        parseFloat(toStateData.lng)
      );
      
      if (!result.success) {
        // Show error to user
        setAlertType("error");
        setMessage("Failed to calculate distance. Please try again.");
        setOpen(true);
      }
      
      setDistanceInfo(result);
      setIsCalculating(false);
    }
  }
}, [selectedFromState, selectedToState]);
   useEffect(() => {
    calculateDistance();
  }, [selectedFromState, selectedToState]);

   const handleFromStateChange = async (value, setFieldValue) => {
    setSelectedFromState(value);
    setFieldValue('from.state', value);
    setFieldValue("from.lga", "");
    // setFieldValue('calculatedDistance', '');
    // setFieldValue('estimatedDuration', '');
  };

  const handleToStateChange = async (value, setFieldValue) => {
    setSelectedToState(value);
    setFieldValue('to.state', value);
    setFieldValue("to.lga", "");
    // setFieldValue('calculatedDistance', '');
    // setFieldValue('estimatedDuration', '');
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    // Calculate fees before submission
    const fees = calculateDeliveryFees(values);
    const submissionData = {
      ...values,
      distancekm: distanceInfo?.distance || 0,
      trackingId: generateTrackingId(),
      payment: {
        ...fees,
        status: "pending"
      }
    };

    console.log(submissionData);

    try {
      const result = await dispatch(saveDeliveryRequest(submissionData)).unwrap();
      console.log(result);
      setAlertType("success");
      setMessage(result.message);
      navigate("/delivery/pending");
    } catch (error) {
      console.log(error);
      setAlertType("error");
      setMessage(error.message);
    }

    setOpen(true);
    resetForm();
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <AppBar
          position="fixed"
          sx={{ zIndex: 2, background: "white", color: "#018965" }}
        >
          <Toolbar
            sx={{ zIndex: 2, display: "flex", justifyContent: "space-between" }}
          >
            {!isLargeScreen && (
              <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                <MenuIcon sx={{ color: "inherit", fontSize: 30 }} />
              </IconButton>
            )}

            <div>
              <IconButton
                onClick={profilePopup}
                sx={{
                  backgroundColor: "#018965",
                  "&:hover": {
                    backgroundColor: "#03684f",
                  },
                }}
              >
                <PersonOutlineOutlinedIcon
                  sx={{ color: "white", fontSize: 25 }}
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
                    <a href="#/customer/profile"   
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
              backgroundColor: "rgba(157, 152, 202, 0.3)",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
              borderBottom: "1px solid #ddd",
            }}
          >
            <Box sx={{ textAlign: "center", flexGrow: 1 }}>
              <a
                className={[navbar["logo__link"], navbar["logo"]].join(" ")}
                href="#"   
              >
                <img src="/images/logo.png" alt="miqwii logo" />
              </a>
            </Box>

            {!isLargeScreen && (
              <IconButton onClick={toggleDrawer}>
                <Cancel sx={{ color: "#018965", fontSize: 30 }} />
              </IconButton>
            )}
          </Box>

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
                                 <use href="../images/sprite.svg#dashboard"   ></use>
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
                                 <use href="../images/sprite.svg#chevron"   ></use>
                               </svg>
                             </span>
                           </header>
         
                           <div className={navbar["collapsible__content--drawer"]}>
                               <a href="#/admin/home"   
                               className={[navbar["link--drawer"], navbar[""]].join(" ")}
                             >
                               Home
                             </a>
         
                              <a href="#/delivery/add-delivery"   
                               className={[navbar["link--drawer"], navbar[""]].join(" ")}
                             >
                               Request Delivery
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
                                 <use href="../images/sprite.svg#customer"   ></use>
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
                                 <use href="../images/sprite.svg#chevron"   ></use>
                               </svg>
                             </span>
                           </header>
         
                           <div className={navbar["collapsible__content--drawer"]}>
                          
                             <a href="#/customer/view-customers"   
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
                                 <use href="../images/sprite.svg#driver"   ></use>
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
                                 <use href="../images/sprite.svg#chevron"   ></use>
                               </svg>
                             </span>
                           </header>
         
                           <div className={navbar["collapsible__content--drawer"]}>
                              <a href="#/driver/register"   
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      Add Driver
                    </a>

		   <a href="#/driver/view-drivers"  
                               className={[navbar["link--drawer"], navbar[""]].join(" ")}
                             >
                               View Drivers
                             </a>
                               <a href="#/driver/assign-vehicle"   
                               className={[navbar["link--drawer"], navbar[""]].join(" ")}
                             >
                              Assign Vehicle
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
                                 <use href="../images/sprite.svg#vehicle"   ></use>
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
                                 <use href="../images/sprite.svg#chevron"   ></use>
                               </svg>
                             </span>
                           </header>
         
                           <div className={navbar["collapsible__content--drawer"]}>
                             <a href="#/vehicle/view-vehicles"   
                               className={[navbar["link--drawer"], navbar[""]].join(" ")}
                             >
                               View Vehicles
                             </a>
                            
                           </div>
                         </div>
         
                     
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
                                 <use href="../images/sprite.svg#request"   ></use>
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
                                 <use href="../images/sprite.svg#chevron"   ></use>
                               </svg>
                             </span>
                           </header>
         
                           <div className={navbar["collapsible__content--drawer"]}>
         
                           <a href="#/delivery/pending"   
                               className={[navbar["link--drawer"], navbar[""]].join(" ")}
                             >
                               Pending
                             </a>     
         
         
                             
                            <a href="#/delivery/awaiting-transit"   
                               className={[navbar["link--drawer"], navbar[""]].join(" ")}
                             >
                               Awaiting Transit
                             </a>
         
         
                             <a href="#/delivery/on-transit"   
                               className={[navbar["link--drawer"], navbar[""]].join(" ")}
                             >
                               On Transit 
                             </a>
                             
         
         
                             <a href="#/delivery/arrived"   
                               className={[navbar["link--drawer"], navbar[""]].join(" ")}
                             >
                               Arrived
                             </a>
         
         
                             <a href="#/delivery/delivered"   
                               className={[navbar["link--drawer"], navbar[""]].join(" ")}
                             >
                               Delivered
                             </a>
         
                               <a href="#/delivery/view-all-delivery"   
                               className={[navbar["link--drawer"], navbar[""]].join(" ")}
                             >
                               View All Deliveries
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
                                 <use href="../images/sprite.svg#location"   ></use>
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
                                 <use href="../images/sprite.svg#chevron"   ></use>
                               </svg>
                             </span>
                           </header>
         
                           <div className={navbar["collapsible__content--drawer"]}>
                             <a href="#/location"   
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
                                 <use href="../images/sprite.svg#fee"   ></use>
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
                                 <use href="../images/sprite.svg#chevron"   ></use>
                               </svg>
                             </span>
                           </header>
         
                           <div className={navbar["collapsible__content--drawer"]}>
                             <a href="#/payment/paid-deliveries"   
                               className={[navbar["link--drawer"], navbar[""]].join(" ")}
                             >
                               Paid Deliveries
                             </a>
                  <a href="#/payment/unpaid-deliveries"   
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
                                 <use href="../images/sprite.svg#profile"   ></use>
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
                                 <use href="../images/sprite.svg#chevron"   ></use>
                               </svg>
                             </span>
                           </header>
         
                           <div className={navbar["collapsible__content--drawer"]}>
                             <a href="#/customer/profile"   
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

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            marginTop: 6,
            fontSize: 20,
            transition: "margin-left 0.3s ease-in-out",
          }}
        >
            <SignInContainer>
                <Formik
                  initialValues={initialValues}
                  validationSchema={deliveryRegistrationSchema}
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
                    return ( 
                    <Card>
                      <section class={style.container__brand}>
                        <img src="/images/logo.png" alt="Logo" />
                      </section>
          
                      <p className={style["form-header"]}>{headings[step]}</p>
          
          
                      {step === 1 && 
                      (
                        <>

                          <TextField
                              label="Item Name"
                              variant="outlined"
                              fullWidth
                              margin="normal"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.item?.name}
                              name="item.name"
                              error={touched.item?.name && Boolean(errors.item?.name)}
                              helperText={touched.item?.name && errors.item?.name}
                              slotProps={{
                                formHelperText: {
                                  sx: { fontSize: 15 },
                                },
                                input: {
                                  style: { fontSize: 18 },
                                },
                                inputLabel: {
                                  style: { fontSize: 16 },
                                },
                              }}
                            />
                            
                         <TextField
                        select
                        label="Type"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.item?.type}
                        name="item.type"
                        error={touched.item?.type && Boolean(errors.item?.type)}
                        helperText={touched.item?.type && errors.item?.type}
                        slotProps={{
                          formHelperText: {
                            sx: { fontSize: 15 },
                          },
                          input: {
                            style: { fontSize: 18 },
                          },
                          inputLabel: {
                            style: { fontSize: 16 },
                          },
                        }}
                     >
               <MenuItem sx={{ fontSize: 18 }}  value={"Electronics"}>
                 Electronics
               </MenuItem>
               <MenuItem sx={{ fontSize: 18 }}  value={"Furniture"}>
                Furniture
               </MenuItem>
                <MenuItem sx={{ fontSize: 18 }}  value={"Percel"}>
                Percel
               </MenuItem>
                <MenuItem sx={{ fontSize: 18 }}  value={"Fragile Item"}>
                Fragile Item
               </MenuItem>
                <MenuItem sx={{ fontSize: 18 }}  value={"Medicine"}>
                Medicine
               </MenuItem>
                 <MenuItem sx={{ fontSize: 18 }}  value={"Food"}>
                Food
               </MenuItem>
                 <MenuItem sx={{ fontSize: 18 }}  value={"Other"}>
                Other
               </MenuItem>
               </TextField>
                  
                  

                          <TextField
                                    label="Description"
                                    name="item.description"
                                    value={values.item?.description}
                                    multiline
                                    rows={4}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.item?.description && Boolean(errors.item?.description)}
                                    helperText={touched.item?.description && errors.item?.description}
                                    fullWidth
                                    margin="normal"
                                     slotProps={{
                                      formHelperText: {
                                        sx: { fontSize: 15 },
                                      },
                                      input: {
                                        style: { fontSize: 18 },
                                      },
                                      inputLabel: {
                                        style: { fontSize: 16 },
                                      },
                                    }}
                                  />

                      <button
                        onClick={() => setStep(2)}
                        className={[
                          style["btn"],
                          style["btn--block"],
                          style["btn--primary"],
                        ].join(" ")}
                      >
                        {"Next"}
                      </button>
                        </>
                      )}
          
                         {step === 2 && 
                      (
                          <>
                      <TextField
                        select
                        label="State"
                        name="from.state"
                        value={values.from?.state}
                        onChange={(e) => handleFromStateChange(e.target.value, setFieldValue)}
                        onBlur={handleBlur}
                        error={touched.from?.state && Boolean(errors.from?.state)}
                        helperText={touched.from?.state && errors.from?.state}
                        fullWidth
                        margin="normal"
                         slotProps={{
                          formHelperText: {
                            sx: { fontSize: 15 },
                          },
                          input: {
                            style: { fontSize: 18 },
                          },
                          inputLabel: {
                            style: { fontSize: 16 },
                          },
                        }}
                      >
                        {Object.keys(statesAndLgas).map((state) => (
                          <MenuItem sx={{ fontSize: 18 }} key={state} value={state}>
                            {state}
                          </MenuItem>
                        ))}
                      </TextField>
          
                      <TextField
                        select
                        label="LGA"
                        name="from.lga"
                        value={values.from.lga}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.from?.lga && Boolean(errors.from?.lga)}
                        helperText={touched.from?.lga && errors.from?.lga}
                        disabled={!values.from?.state}
                        fullWidth
                        margin="normal"
                         slotProps={{
                          formHelperText: {
                            sx: { fontSize: 15 },
                          },
                          input: {
                            style: { fontSize: 18 },
                          },
                          inputLabel: {
                            style: { fontSize: 16 },
                          },
                        }}
                      >
                        {values.from.state &&
                          statesAndLgas[values.from.state].map((lga) => (
                            <MenuItem sx={{ fontSize: 18 }} key={lga} value={lga}>
                              {lga}
                            </MenuItem>
                          ))}
                      </TextField>

                         <TextField
                        label="City"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.from?.city}
                        name="from.city"
                        error={touched.from?.city && Boolean(errors.from?.city)}
                        helperText={touched.from?.city && errors.from?.city}
                        slotProps={{
                          formHelperText: {
                            sx: { fontSize: 15 },
                          },
                          input: {
                            style: { fontSize: 18 },
                          },
                          inputLabel: {
                            style: { fontSize: 16 },
                          },
                        }}
                      />   

                         <TextField
                        label="Street"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.from?.street}
                        name="from.street"
                        error={touched.from?.street && Boolean(errors.from?.street)}
                        helperText={touched.from?.street && errors.from?.street}
                        slotProps={{
                          formHelperText: {
                            sx: { fontSize: 15 },
                          },
                          input: {
                            style: { fontSize: 18 },
                          },
                          inputLabel: {
                            style: { fontSize: 16 },
                          },
                        }}
                      /> 

                      <button
                        onClick={() => setStep(1)}
                        className={[
                          style["btn"],
                          style["btn--block"],
                          style["btn--secondary"],
                        ].join(" ")}
                      >
                        {"Back"}
                      </button>

                      <button
                        onClick={() => setStep(3)}
                        className={[
                          style["btn"],
                          style["btn--block"],
                          style["btn--primary"],
                        ].join(" ")}
                      >
                        {"Next"}
                      </button>
                        </>
                      )}

                      {step === 3 && 
                      (
                          <>
                      <TextField
                        select
                        label="State"
                        name="to.state"
                        value={values.to?.state}
                        onChange={(e) => handleToStateChange(e.target.value, setFieldValue)}
                        onBlur={handleBlur}
                        error={touched.to?.state && Boolean(errors.to?.state)}
                        helperText={touched.to?.state && errors.to?.state}
                        fullWidth
                        margin="normal"
                         slotProps={{
                          formHelperText: {
                            sx: { fontSize: 15 },
                          },
                          input: {
                            style: { fontSize: 18 },
                          },
                          inputLabel: {
                            style: { fontSize: 16 },
                          },
                        }}
                      >
                        {Object.keys(statesAndLgas).map((state) => (
                          <MenuItem sx={{ fontSize: 18 }} key={state} value={state}>
                            {state}
                          </MenuItem>
                        ))}
                      </TextField>
          
                      <TextField
                        select
                        label="LGA"
                        name="to.lga"
                        value={values.to.lga}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.to?.lga && Boolean(errors.to?.lga)}
                        helperText={touched.to?.lga && errors.to?.lga}
                        disabled={!values.to?.state}
                        fullWidth
                        margin="normal"
                         slotProps={{
                          formHelperText: {
                            sx: { fontSize: 15 },
                          },
                          input: {
                            style: { fontSize: 18 },
                          },
                          inputLabel: {
                            style: { fontSize: 16 },
                          },
                        }}
                      >
                        {values.to.state &&
                          statesAndLgas[values.to.state].map((lga) => (
                            <MenuItem sx={{ fontSize: 18 }} key={lga} value={lga}>
                              {lga}
                            </MenuItem>
                          ))}
                      </TextField>

                         <TextField
                        label="City"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.to?.city}
                        name="to.city"
                        error={touched.to?.city && Boolean(errors.to?.city)}
                        helperText={touched.to?.city && errors.to?.city}
                        slotProps={{
                          formHelperText: {
                            sx: { fontSize: 15 },
                          },
                          input: {
                            style: { fontSize: 18 },
                          },
                          inputLabel: {
                            style: { fontSize: 16 },
                          },
                        }}
                      />   

                         <TextField
                        label="Street"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.to?.street}
                        name="to.street"
                        error={touched.to?.street && Boolean(errors.to?.street)}
                        helperText={touched.to?.street && errors.to?.street}
                        slotProps={{
                          formHelperText: {
                            sx: { fontSize: 15 },
                          },
                          input: {
                            style: { fontSize: 18 },
                          },
                          inputLabel: {
                            style: { fontSize: 16 },
                          },
                        }}
                      /> 

                      <button
                        onClick={() => setStep(2)}
                        className={[
                          style["btn"],
                          style["btn--block"],
                          style["btn--secondary"],
                        ].join(" ")}
                      >
                        {"Back"}
                      </button>

                      <button
                        onClick={() => setStep(4)}
                        className={[
                          style["btn"],
                          style["btn--block"],
                          style["btn--primary"],
                        ].join(" ")}
                      >
                        {"Next"}
                      </button>
                        </>
                      )}
          
                       {step === 4 && 
                      (
                       <>


                       
                            <div
                             style={{
                               width: "100%",
                               display: "flex",
                               justifyContent: "center",
                             }}
                           >

                    <FormControl sx={{ m: 1, minWidth: "30%" }}>

                        <TextField
                        label="Price Value (N)"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.item?.value}
                        name="item.value"
                        error={touched.item?.value && Boolean(errors.item?.value)}
                        helperText={touched.item?.value && errors.item?.value}
                        slotProps={{
                          formHelperText: {
                            sx: { fontSize: 15 },
                          },
                          input: {
                            style: { fontSize: 18 },
                          },
                          inputLabel: {
                            style: { fontSize: 16 },
                          },
                        }}
                     />

                    </FormControl>

                    <FormControl sx={{ m: 1, minWidth: "30%" }}>

                          <TextField
                        label="Weight (KG)"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.item?.weight}
                        name="item.weight"
                        error={touched.item?.weight && Boolean(errors.item?.weight)}
                        helperText={touched.item?.weight && errors.item?.weight}
                        slotProps={{
                          formHelperText: {
                            sx: { fontSize: 15 },
                          },
                          input: {
                            style: { fontSize: 18 },
                          },
                          inputLabel: {
                            style: { fontSize: 16 },
                          },
                        }}
                      />
                      
                    </FormControl>

                    <FormControl sx={{ m: 1, minWidth: "30%" }}>

                              <TextField
                        select
                        label="Unit"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.item?.size?.unit}
                        name="item.size.unit"
                        error={touched.item?.size?.unit && Boolean(errors.item?.size?.unit)}
                        helperText={touched.item?.size?.unit && errors.item?.size?.unit}
                        slotProps={{
                          formHelperText: {
                            sx: { fontSize: 15 },
                          },
                          input: {
                            style: { fontSize: 18 },
                          },
                          inputLabel: {
                            style: { fontSize: 16 },
                          },
                        }}
                     >
               <MenuItem sx={{ fontSize: 18 }}  value={"Inch"}>
                 Inch
               </MenuItem>
               <MenuItem sx={{ fontSize: 18 }}  value={"Feet"}>
                 Feet
               </MenuItem>
                <MenuItem sx={{ fontSize: 18 }}  value={"CM"}>
                 CM
               </MenuItem>
           </TextField>
                      
                    </FormControl>

                           </div>

                       
                   

                     

               

                            <div
                             style={{
                               width: "100%",
                               display: "flex",
                               justifyContent: "center",
                             }}
                           >
                                   <FormControl sx={{ m: 1, minWidth: "30%" }}>
               <TextField
                        label="Height"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.item?.size?.height}
                        name="item.size.height"
                        error={touched.item?.size?.height && Boolean(errors.item?.size?.height)}
                        helperText={touched.item?.size?.height && errors.item?.size?.height}
                        slotProps={{
                          formHelperText: {
                            sx: { fontSize: 15 },
                          },
                          input: {
                            style: { fontSize: 18 },
                          },
                          inputLabel: {
                            style: { fontSize: 16 },
                          },
                        }}
                      />              
         </FormControl>

           <FormControl sx={{ m: 1, minWidth: "30%" }}>
              <TextField
                        label="Width"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.item?.size?.width}
                        name="item.size.width"
                        error={touched.item?.size?.width && Boolean(errors.item?.size?.width)}
                        helperText={touched.item?.size?.width && errors.item?.size?.width}
                        slotProps={{
                          formHelperText: {
                            sx: { fontSize: 15 },
                          },
                          input: {
                            style: { fontSize: 18 },
                          },
                          inputLabel: {
                            style: { fontSize: 16 },
                          },
                        }}
                      />                
         </FormControl>

           <FormControl sx={{ m: 1, minWidth: "30%" }}>
                          <TextField
                        label="Length"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.item?.size?.length}
                        name="item.size.length"
                        error={touched.item?.size?.length && Boolean(errors.item?.size?.length)}
                        helperText={touched.item?.size?.length && errors.item?.size?.length}
                        slotProps={{
                          formHelperText: {
                            sx: { fontSize: 15 },
                          },
                          input: {
                            style: { fontSize: 18 },
                          },
                          inputLabel: {
                            style: { fontSize: 16 },
                          },
                        }}
                      />                 
         </FormControl>
                           </div>

                  <>
                                    <div
                                      style={{ whiteSpace: "normal" }}
                                      class={dashboard["card--details"]}
                                    >
                                      {"Distance: " + (distanceInfo !== null && isCalculating === false ? distanceInfo.distance + " km (" + distanceInfo.duration + " Minutes)" : "Calculating...")}
                                    </div>

                                       <div
                                      style={{ whiteSpace: "normal" }}
                                      class={dashboard["card--details"]}
                                    >
                                      {"Delivery Fee: ₦" + calculateDeliveryFees(values).deliveryFee}
                                    </div>

                                       <div
                                      style={{ whiteSpace: "normal" }}
                                      class={dashboard["card--details"]}
                                    >
                                      {"Insurance: ₦" + calculateDeliveryFees(values).insurance}
                                    </div>

                                <div
                                      style={{ whiteSpace: "normal" }}
                                      class={dashboard["card--details"]}
                                    >
                                      {"VAT: ₦" + calculateDeliveryFees(values).vat}
                                    </div>

                                       <div
                                      style={{ whiteSpace: "normal" }}
                                      class={dashboard["card--details"]}
                                    >
                                      {"Total: ₦" + calculateDeliveryFees(values).totalAmount}
                                    </div>
                  </>

                      <button
                        onClick={() => setStep(3)}
                        className={[
                          style["btn"],
                          style["btn--block"],
                          style["btn--secondary"],
                        ].join(" ")}
                      >
                        {"Back"}
                      </button>

                      <button
                        onClick={() => setStep(5)}
                        className={[
                          style["btn"],
                          style["btn--block"],
                          style["btn--primary"],
                        ].join(" ")}
                      >
                        {"Next"}
                      </button>
                        </>
                      )}

                        {step === 5 && 
                      (
                         <>
                         <TextField
                        label="Reciever Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.pickerName}
                        name="pickerName"
                        error={touched.pickerName && Boolean(errors.pickerName)}
                        helperText={touched.pickerName && errors.pickerName}
                        slotProps={{
                          formHelperText: {
                            sx: { fontSize: 15 },
                          },
                          input: {
                            style: { fontSize: 18 },
                          },
                          inputLabel: {
                            style: { fontSize: 16 },
                          },
                        }}
                      /> 

                         <TextField
                                    label="Reciever Tel"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.pickerPhone}
                                    name="pickerPhone"
                                    error={touched.pickerPhone && Boolean(errors.pickerPhone)}
                                    helperText={touched.pickerPhone && errors.pickerPhone}
                                    slotProps={{
                                      formHelperText: {
                                        sx: { fontSize: 15 },
                                      },
                                      input: {
                                        style: { fontSize: 18 },
                                      },
                                      inputLabel: {
                                        style: { fontSize: 16 },
                                      },
                                    }}
                                  />

                      <button
                        onClick={() => setStep(4)}
                        className={[
                          style["btn"],
                          style["btn--block"],
                          style["btn--secondary"],
                        ].join(" ")}
                      >
                        {"Back"}
                      </button>
            
                                 <button
                                   disabled={isSubmitting}
                                   type="submit"
                                   onClick={handleSubmit}
                                   className={[
                                     style["btn"],
                                     style["btn--block"],
                                     style["btn--primary"],
                                   ].join(" ")}
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
                    (c) 2025 We Deliver, All Rights Reserved
                  </p>
                </div>
          
                <Snackbar
                  open={open}
                  autoHideDuration={3000}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "center", horizontal: "center" }}
                >
                  <div>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      BackdropProps={{
                        sx: { backgroundColor: "rgba(157, 152, 202, 0.5)" },
                      }}
                      sx={{
                        "& .MuiDialog-paper": {
                          width: "100%",
                          borderRadius: "15px",
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
                                <use href="../images/sprite.svg#success-icon"   ></use>
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
                                <use href="../images/sprite.svg#error-icon"   ></use>
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

        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "center", horizontal: "center" }}
        >
          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              BackdropProps={{
                sx: { backgroundColor: "rgba(157, 152, 202, 0.5)" },
              }}
              sx={{
                "& .MuiDialog-paper": {
                  width: "100%",
                  borderRadius: "15px",
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
                        <CloseIcon sx={{ fontSize: 30, color: "#018965" }} />
                      </IconButton>
                    </span>

                    <span class={dashboard["icon-container"]}>
                      <svg
                        class={[
                          dashboard["icon--big"],
                          dashboard["icon--success"],
                        ].join(" ")}
                      >
                        <use href="../images/sprite.svg#success-icon"   ></use>
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
                        <use href="../images/sprite.svg#error-icon"   ></use>
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
  );
};

export default AddDeliveryRequest;

const calculateDrivingDistance = async (fromLat, fromLon, toLat, toLon) => {
  try {
    // Use the correct backend domain
    const url = `https://api.wedeleever.com/v1/api/routing/distance?fromLat=${fromLat}&fromLon=${fromLon}&toLat=${toLat}&toLon=${toLon}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch route');
    }
    
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Error calculating distance:', error);
    return {
      distance: null,
      duration: null,
      success: false,
      error: error.message
    };
  }
};