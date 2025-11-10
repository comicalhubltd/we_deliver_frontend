import dashboard from "../style/dashboard/CustomerDashboard.module.css";
import style from "../style/form/CustomerRegistration.module.css";
import { useState } from "react";
import React from "react";
import TextField from "@mui/material/TextField";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { useParams } from "react-router-dom";
import Loading from "../Chunks/loading";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import { ErrorMessage, Formik } from "formik";
import { object, string, ref } from "yup";
import { IconButton, InputAdornment, MenuItem } from "@mui/material";
import { saveDriver } from "../../redux/reducer/driverSlice";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import { Close as Cancel } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getDriverById } from "../../redux/reducer/driverSlice";
import { updateCustomer } from "../../redux/reducer/customerSlice";
import { getCustomerById } from "../../redux/reducer/customerSlice";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  minHeight: "550px",
  maxHeight: "77vh",
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

const UpdateCustomer = () => {
  const driverRegistrationSchema = object({
    // Profile
    profile: object({
      firstname: string()
        .max(15, "Firstname must not exceed 15 characters")
        .required("Firstname is required"),

      surname: string()
        .max(15, "Surname must not exceed 15 characters")
        .required("Surname is required"),
        
      othername: string()
        .max(15, "Othername must not exceed 15 characters"),
   
      gender: string()
        .max(15, "gender must not exceed 15 characters"),

      phoneNumber: string()
        .max(11, "Phone number should not be more than 11")
        .min(11, "Phone number should not be less than 11")
        .required("Phone Number is required"),
      
      address: string()
        .max(200, "Address must not exceed 200 characters")
        .required("Address is required"),
    }),
  });

  const [visibility, setVisibility] = useState(false);
  const [inputType, setInputType] = useState("password");
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setIsLoading] = useState(true);
  const location = useLocation();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const togglePasswordVisibility = () => {
    setVisibility(!visibility);
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

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
            user: result.user,
          });
        });
    } catch (error) {
      setAlertType("error");
      setMessage(error.message);
      console.log(error.message);
    }
    setIsLoading(false);
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    const requestBody = {
      profile: {
        firstname: values.profile?.firstname,
        surname: values.profile?.surname,
        othername: values.profile?.othername,
        gender: values.profile?.gender,
        phoneNumber: values.profile?.phoneNumber,
        address: values.profile?.address
      },  
    }

    console.log("Customer Form Values" + JSON.stringify(requestBody));
    try {
      const body = await dispatch(updateCustomer({id: id, customerData: requestBody})).unwrap();
      console.log(body);
      setAlertType("success");
      setMessage(body.message);
    } catch (error) {
      console.log(error.message);
      setAlertType("error");
      setMessage(error.message);
    }
    console.log("Form values:", values);
    setOpen(true);
    resetForm();
  };

  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <SignInContainer>
          <Formik
            initialValues={{
              profile: {
                firstname: state.profile?.firstname || "",
                surname: state.profile?.surname || "",
                othername: state.profile?.othername || "",
                gender: state.profile?.gender || "",
                phoneNumber: state.profile?.phoneNumber || "",
                address: state.profile?.address || "",
              },
            }}
            validationSchema={driverRegistrationSchema}
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
            }) => { 
              return ( 
                <Card>
                  <section class={style.container__brand}>
                    <img src="/images/logo.png" alt="Logo" />
                  </section>

                  <p className={style["form-header"]}>Update Customer</p>

                  <TextField
                    label="Firstname"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.profile?.firstname}
                    name="profile.firstname"
                    error={touched.profile?.firstname && Boolean(errors.profile?.firstname)}
                    helperText={touched.profile?.firstname && errors.profile?.firstname}
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
                    label="Surname"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.profile?.surname}
                    name="profile.surname"
                    error={touched.profile?.surname && Boolean(errors.profile?.surname)}
                    helperText={touched.profile?.surname && errors.profile?.surname}
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
                    label="Othername"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.profile?.othername}
                    name="profile.othername"
                    error={touched.profile?.othername && Boolean(errors.profile?.othername)}
                    helperText={touched.profile?.othername && errors.profile?.othername}
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
                    label="Gender"
                    name="profile.gender"
                    value={values.profile?.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.profile?.gender && Boolean(errors.profile?.gender)}
                    helperText={touched.profile?.gender && errors.profile?.gender}
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
                    <MenuItem sx={{ fontSize: 18 }} value={"Male"}>
                      Male
                    </MenuItem>
                    <MenuItem sx={{ fontSize: 18 }} value={"Female"}>
                      Female
                    </MenuItem>
                  </TextField>

                  <TextField
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.profile?.phoneNumber}
                    name="profile.phoneNumber"
                    error={touched.profile?.phoneNumber && Boolean(errors.profile?.phoneNumber)}
                    helperText={touched.profile?.phoneNumber && errors.profile?.phoneNumber}
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
                    label="Address"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.profile?.address}
                    name="profile.address"
                    error={touched.profile?.address && Boolean(errors.profile?.address)}
                    helperText={touched.profile?.address && errors.profile?.address}
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
                    disabled={isSubmitting}
                    type="submit"
                    onClick={handleSubmit}
                    className={[
                      style["btn"],
                      style["btn--block"],
                      style["btn--primary"],
                    ].join(" ")}
                  >
                    {isSubmitting ? "Updating..." : "Update"}
                  </button>
                </Card>
              )
            }}
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
                          <use href="/images/sprite.svg#success-icon"></use>
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
                          <use href="/images/sprite.svg#error-icon"></use>
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

export default UpdateCustomer;