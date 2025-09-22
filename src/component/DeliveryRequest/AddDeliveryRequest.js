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
  overflowY: "auto", // Enables vertical scrolling
  "&::-webkit-scrollbar": {
    display: "none",
  },
  // Hide scrollbar for Firefox
  scrollbarWidth: "none", // Firefox
  msOverflowStyle: "none", // IE and Edge
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

  // ABOVE IS DRAWER LOGIC BELOW IS THE APP LOGIC.........................................................................................

   const deliveryRegistrationSchema = object({




    // from
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

         // to
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


    // item
 item: object({
      
   
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
    .min(0.01, "Lenght must be greater than 0")
    .required("Value Name is required")
    }),


    pickerName: string()
      .max(30, "Picker Name must not exceed 30 characters")
      .required("Picker Name is required"),

    pickerPhone: string()
          .max(11, "Phone number should not be more than 11")
          .min(11, "Phone number should not be less than 11")
          .required("Phone Number is required"),


   deliveryFee: number()
            .min(0.01, "Delivery Fee must be greater than 0")
            .positive("Fee Must be positive number")
            .required("Delivery Fee is required"),

    distancekm: number()
            .required("Distance is required"),

  
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000); // Delay before showing content
    return () => clearTimeout(timer);
  }, []);

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

  const authenticated = false;
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/school/login");
    localStorage.setItem("authenticated", JSON.stringify(authenticated));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return; // Prevent closing if the user clicks away
    }
    setOpen(false); // Close the Snackbar
  };


 const initialValues = {
                

                    item: {
                  
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
                    deliveryFee: 2
                  };
 // Calculate distance when both states are selected
  const calculateDistance = async () => {
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
        
        setDistanceInfo(result);
        console.log("Resulta" + result);
        setIsCalculating(false);
      }
    } else {
      setDistanceInfo(null);
    }
  };



   useEffect(() => {
    calculateDistance();
  }, [selectedFromState, selectedToState]);


   const handleFromStateChange = async (value, setFieldValue) => {
    setSelectedFromState(value);
    setFieldValue('from.state', value);
    setFieldValue("from.lga", ""); // reset LGA when state changes
    setFieldValue('calculatedDistance', '');
    setFieldValue('estimatedDuration', '');
  };

  const handleToStateChange = async (value, setFieldValue) => {
    setSelectedToState(value);
    setFieldValue('to.state', value);
    setFieldValue("to.lga", ""); // reset LGA when state changes
    setFieldValue('calculatedDistance', '');
    setFieldValue('estimatedDuration', '');
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    console.log(values);

    try {
      const result = await dispatch(saveDeliveryRequest(values)).unwrap();
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
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {/* Navbar */}
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
                      href="/school/school-profile"
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
                        <use href="../images/sprite.svg#dashboard"></use>
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
                        <use href="../images/sprite.svg#chevron"></use>
                      </svg>
                    </span>
                  </header>

                  <div className={navbar["collapsible__content--drawer"]}>
                    <a
                      href="/customer/home"
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      Home
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
                        <use href="../images/sprite.svg#request"></use>
                      </svg>
                      <p className={navbar["collapsible__heading"]}>Deliveries</p>
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
                        <use href="../images/sprite.svg#chevron"></use>
                      </svg>
                    </span>
                  </header>

                  <div className={navbar["collapsible__content--drawer"]}>

                   


                    <a
                      href="/delivery/customer-on-transit"
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      On Transit 
                    </a>


          <a
                      href="/delivery/customer-yet-to-delivered"
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      Yet to Delivered
                    </a>

                    <a
                      href="/delivery/customer-delivered"
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      Delivered
                    </a>


                      <a
                      href="/delivery/customer-pending"
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      Pending
                    </a>

                      <a
                      href="/delivery/customer-view-all-delivery"
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
                        <use href="../images/sprite.svg#location"></use>
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
                        <use href="../images/sprite.svg#chevron"></use>
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
                      href="/school/school-profile"
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
                      {/*Card Image*/}
          
                      <section class={style.container__brand}>
                        <img src="/images/logo.png" alt="Logo" />
                      </section>
          
                      {/*Card Header*/}
                      <p className={style["form-header"]}>{headings[step]}</p>
          
          
                      {step === 1 && 
                      (
                        <>
          
                        {/* Text Fields*/}


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
                            sx: { fontSize: 15 }, // Increase font size of helper text
                          },
                          input: {
                            style: { fontSize: 18 }, // font size for input text
                          },
                          inputLabel: {
                            style: { fontSize: 16 }, // font size for label text
                          },
                        }}
                      />

                     
                
          
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
          
          
        
            {/* {  NEXT BUTTON } */}
          
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
            
          
                      {/* STATE DROPDOWN */}
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
                        {Object.keys(statesAndLgas).map((state) => (
                          <MenuItem sx={{ fontSize: 18 }} key={state} value={state}>
                            {state}
                          </MenuItem>
                        ))}
                      </TextField>
          
                      {/* LGA DROPDOWN */}
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
                            sx: { fontSize: 15 }, // Increase font size of helper text
                          },
                          input: {
                            style: { fontSize: 18 }, // font size for input text
                          },
                          inputLabel: {
                            style: { fontSize: 16 }, // font size for label text
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
                            sx: { fontSize: 15 }, // Increase font size of helper text
                          },
                          input: {
                            style: { fontSize: 18 }, // font size for input text
                          },
                          inputLabel: {
                            style: { fontSize: 16 }, // font size for label text
                          },
                        }}
                      /> 
          
     
                       {/* {  BACK BUTTON BUTTON } */}
          
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
          
          
          
            {/* {  NEXT BUTTON } */}
          
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
                                                                                                                                                                                                                                                    
                    
          
          
                      {/* STATE DROPDOWN */}
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
                        {Object.keys(statesAndLgas).map((state) => (
                          <MenuItem sx={{ fontSize: 18 }} key={state} value={state}>
                            {state}
                          </MenuItem>
                        ))}
                      </TextField>
          
                      {/* LGA DROPDOWN */}
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
                            sx: { fontSize: 15 }, // Increase font size of helper text
                          },
                          input: {
                            style: { fontSize: 18 }, // font size for input text
                          },
                          inputLabel: {
                            style: { fontSize: 16 }, // font size for label text
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
                            sx: { fontSize: 15 }, // Increase font size of helper text
                          },
                          input: {
                            style: { fontSize: 18 }, // font size for input text
                          },
                          inputLabel: {
                            style: { fontSize: 16 }, // font size for label text
                          },
                        }}
                      /> 
          
                    
          
                       {/* {  BACK BUTTON BUTTON } */}
          
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
          
          
          
            {/* {  NEXT BUTTON } */}
          
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
                            sx: { fontSize: 15 }, // Increase font size of helper text
                          },
                          input: {
                            style: { fontSize: 18 }, // font size for input text
                          },
                          inputLabel: {
                            style: { fontSize: 16 }, // font size for label text
                          },
                        }}


                     />

            
       
                  
          
                        
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
                            sx: { fontSize: 15 }, // Increase font size of helper text
                          },
                          input: {
                            style: { fontSize: 18 }, // font size for input text
                          },
                          inputLabel: {
                            style: { fontSize: 16 }, // font size for label text
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
                            sx: { fontSize: 15 }, // Increase font size of helper text
                          },
                          input: {
                            style: { fontSize: 18 }, // font size for input text
                          },
                          inputLabel: {
                            style: { fontSize: 16 }, // font size for label text
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
                            sx: { fontSize: 15 }, // Increase font size of helper text
                          },
                          input: {
                            style: { fontSize: 18 }, // font size for input text
                          },
                          inputLabel: {
                            style: { fontSize: 16 }, // font size for label text
                          },
                        }}
                      />                 
                                 
         </FormControl>


                           </div>

            
                     
                     <TextField
                        disabled
                        label="Distance"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={(distanceInfo !== null && isCalculating === true  ) ? "Calculating..." : distanceInfo.distance + " km " + distanceInfo.duration + " Minutes "}
                        name="item.distancekm"
                        error={touched.distancekm && Boolean(errors.distancekm)}
                        helperText={touched.distancekm && errors.distancekm}
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


                     />
                     <TextField
                        disabled
                        label="Delivery Fee"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.deliveryFee}
                        name="item.deliveryFee"
                        error={touched.deliveryFee && Boolean(errors.deliveryFee)}
                        helperText={touched.deliveryFee && errors.deliveryFee}
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


                     />

             
              {/* {  BACK BUTTON BUTTON } */}
          
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
          
          
          
            {/* {  NEXT BUTTON } */}
          
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
                        label="Picker Name"
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
                            sx: { fontSize: 15 }, // Increase font size of helper text
                          },
                          input: {
                            style: { fontSize: 18 }, // font size for input text
                          },
                          inputLabel: {
                            style: { fontSize: 16 }, // font size for label text
                          },
                        }}
                      /> 
          
                    



                         <TextField
                                    label="Picker Tel"
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
                                        sx: { fontSize: 15 }, // Increase font size of helper text
                                      },
                                      input: {
                                        style: { fontSize: 18 }, // font size for input text
                                      },
                                      inputLabel: {
                                        style: { fontSize: 16 }, // font size for label text
                                      },
                                    }}
                                  />
          
          
                       
                       {/* {  BACK BUTTON BUTTON } */}
          
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
            
          
                      {/* {  SUBMIT BUTTON BUTTON } */}
                     
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
                        <use href="../images/sprite.svg#success-icon"></use>
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
                        <use href="../images/sprite.svg#error-icon"></use>
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
    const url = `http://router.project-osrm.org/route/v1/driving/${fromLon},${fromLat};${toLon},${toLat}?overview=false`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch route');
    }
    
    const data = await response.json();
    
    if (data.routes && data.routes.length > 0) {
      const distanceInKm = (data.routes[0].distance / 1000).toFixed(2);
      const durationInMinutes = Math.round(data.routes[0].duration / 60);
      return {
        distance: distanceInKm,
        duration: durationInMinutes,
        success: true
      };
    } else {
      throw new Error('No route found');
    }
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