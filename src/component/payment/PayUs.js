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
// import { getAuthSchool } from "../../redux/reducer/customerSlice";
import { getPaymentById } from "../../redux/reducer/paymentSlice";
import { useDispatch, useSelector } from "react-redux";
import { savePayment } from "../../redux/reducer/paymentSlice";
import { useEffect } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useLocation, useNavigate } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import Loading from "../Chunks/loading";

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
import { useParams } from "react-router-dom";

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

const PayUS = () => {
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

  //.....................START OF PAYMENT ZONE CONFIG.....................................

  const PaystackPaymentButton = ({
    values,
    publicKey,
    isDisabled,
    onSuccess,
    onError,
    onClose,
  }) => {
    const config = {
      reference: generatePaymentReference(),
      email: values.email,
      amount: totalAmount * 100,
      callbackUrl: "https://localhost:3000/payment-success",
      metadata: {
        deliveryFee: values.deliveryFee,
        insurance: values.insurance,
        vat: values.vat,
        email: values.email,
        paymentDate: values.paymentDate,
      },
      publicKey,
      text: `Pay ₦${totalAmount}`,
      onSuccess,
      onClose,
      onError,
    };

    return (
      <PaystackButton
        className={[
          style["btn"],
          style["btn--block"],
          style["btn--primary"],
        ].join(" ")}
        {...config}
        disabled={isDisabled}
      />
    );
  };


  const generatePaymentReference = () => {
    return `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const generatePaymentDate = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months start from 0
    const day = String(now.getDate()).padStart(2, "0");

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  //.....................END OF PAYMENT ZONE CONFIG.....................................

  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id } =  useParams();
  

  
  const logout = () => {
    localStorage.removeItem("token");
   navigate("/customer/login");
    
  };

  const [state, setState] = useState({
    id: "",
    email: "",
    deliveryFee: "",
    insurance: "",
    vat: "",
    totalAmount: "",
    status: "",
    paymentRef: "",
    paymentDate: "",
  });

  const totalAmount = state.totalAmount;

  //  FORM DATA DECLARATION

  const publicKey = "pk_test_e74ca0acbe3859f041743090c417cc95eb64cbd0";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await dispatch(getPaymentById(id))
        .unwrap()
        .then((result) => {
          
          setState({
            id: result.id,
            email: result.email,
            deliveryFee: result.deliveryFee,
            insurance: result.insurance,
            vat: result.vat,
            totalAmount: result.totalAmount,
            paymentDate: generatePaymentDate(),
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


  const handlePaymentSuccess = async (reference, values, { resetForm }) => {
    try {
      // Ensure we have the required reference data
      // if (!reference || !reference.reference) {
      //   throw new Error('Invalid payment reference received');
      // }
      const paymentData = {
        ...values,
        status: "Succesful",
        paymentRef: reference.reference,
      };


      console.log("Payment GET Request " + JSON.stringify(paymentData));

      const result = await dispatch(savePayment(paymentData)).unwrap();
      setAlertType("success");
      setMessage("Payment Completed Successfully");
      setOpen(true);
    } catch (error) {
      setAlertType("error");
      setMessage(
        "Payment successful but failed to save data. Please contact support."
      );
      console.log(error);
    }
  };

  const handlePaymentError = () => {
    console.log("Payment Close");
    setAlertType("error");
    setMessage("Payment failed please try again letter");
    setOpen(true);
  };

  const handlePaymentClose = () => {
    console.log("Payment Close");
    setAlertType("error");
    setMessage("Payment Cancelled");
    setOpen(true);
  };

  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
          <SignInContainer>
                <Formik
                  initialValues={{
                    id: state.id,
                    email: state.email,
                    totalAmount: totalAmount,
                    paymentDate: generatePaymentDate(),
                    deliveryFee: state.deliveryFee,
                    insurance: state.insurance,
                    vat: state.vat 
                  }}
                  onSubmit={{}}
                >
                  {({
                    handleChange,
                    handleSubmit,
                    values,
                    isSubmitting,
                    resetForm,
                  }) => (
                    <Card>
                      {/*Card Image*/}

                      <section class={style.container__brand}>
                        <img src="/images/logo.png" alt="Logo" />
                      </section>

                      {/*Card Header*/}
                      <p className={style["form-header"]}>Pay Delivery</p>

                      {/* Text Fields*/}
                      <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={values.email}
                        name="email"
                        slotProps={{
                          input: {
                            style: { fontSize: 18 }, // font size for input text
                          },
                          inputLabel: {
                            style: { fontSize: 16 }, // font size for label text
                          },
                        }}
                        disabled
                      />



                       <TextField
                        label="Delivery Fee"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={values.deliveryFee}
                        name="deliveryFee"
                        slotProps={{
                          input: {
                            style: { fontSize: 18 }, // font size for input text
                          },
                          inputLabel: {
                            style: { fontSize: 16 }, // font size for label text
                          },
                        }}
                        disabled
                      />

                      <TextField
                        label="Insurance"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={values.insurance}
                        name="insurance"
                        slotProps={{
                          input: {
                            style: { fontSize: 18 }, // font size for input text
                          },
                          inputLabel: {
                            style: { fontSize: 16 }, // font size for label text
                          },
                        }}
                        disabled
                      />

                      <TextField
                        label="Vat"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={values.vat}
                        name="vat"
                        slotProps={{
                          input: {
                            style: { fontSize: 18 }, // font size for input text
                          },
                          inputLabel: {
                            style: { fontSize: 16 }, // font size for label text
                          },
                        }}
                        disabled
                      />

                      <TextField
                        label="Payment Date"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={values.paymentDate}
                        name="paymentDate"
                        sx={{ display: "none" }}
                        slotProps={{
                          input: {
                            style: { fontSize: 18 }, // font size for input text
                          },
                          inputLabel: {
                            style: { fontSize: 16 }, // font size for label text
                          },
                        }}
                        disabled
                      />


                      
                      <TextField
                        label="Total Amount"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={values.totalAmount}
                        name="totalAmount"
                        slotProps={{
                          input: {
                            style: { fontSize: 18 }, // font size for input text
                          },
                          inputLabel: {
                            style: { fontSize: 16 }, // font size for label text
                          },
                        }}
                        disabled
                      />


                      {/* {BUTTON } */}
                      <PaystackPaymentButton
                        values={values}
                        publicKey={publicKey}
                        isDisabled={isSubmitting}
                        onSuccess={(reference) =>
                          handlePaymentSuccess(reference, values, { resetForm })
                        }
                        onError={handlePaymentError}
                        onClose={handlePaymentClose}
                      />
                      {/* <button  disabled={isSubmitting}  type="submit" onClick={handleSubmit} className={[style['btn'], style['btn--block'], style['btn--primary']].join(' ')}>{isSubmitting ? 'Submitting...' : 'Pay'}</button> */}
                    </Card>
                  )}
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
              </SignInContainer>
      )}
    </>
  );
};

export default PayUS;
