import dashboard from "../style/dashboard/CustomerDashboard.module.css";
import style from "../style/form/CustomerRegistration.module.css";
import { useState } from "react";
import React from "react";
import TextField from "@mui/material/TextField";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Alert, Snackbar } from "@mui/material";
import { ErrorMessage, Formik } from "formik";
import { object, string, ref } from "yup";
import { useNavigate } from "react-router-dom";
import { IconButton, InputAdornment } from "@mui/material";
import { sendPasswordResetCustomer } from "../../redux/reducer/passwordSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  minHeight: "auto",
  maxHeight: "auto", // Fixed height
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

const ResetPasswordCustomer = () => {
  const resetPasswordSchema = object({
    password: string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),

    confirmPassword: string()
      .min(8, "Password must be at least 8 characters")
      .oneOf([ref("password"), null], "Passwords must match")
      .required("Password is required"),
  });

  const [visibility, setVisibility] = useState(false);
  const [inputType, setInputType] = useState("password");
  const [open, setOpen] = useState(false); // Controls the Snackbar state
  const [alertType, setAlertType] = useState(""); // "success" or "error"
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  const queryParam = new URLSearchParams(location.search);
  const resetToken = queryParam.get("resetToken");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return; // Prevent closing if the user clicks away
    }
    setOpen(false); // Close the Snackbar
  };

  const togglePasswordVisibility = () => {
    setVisibility(!visibility);
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    console.log(resetToken);
    console.log(values.password);
    try {
      const body = await dispatch(
        sendPasswordResetCustomer({ resetToken: resetToken, password: values.password })
      ).unwrap();
      console.log(body);
      setAlertType("success");
      setMessage(body.message);
    } catch (error) {
      console.log(error.message);
      setAlertType("error");
      setMessage(error.message);
    }
    // Handle form submission logic
    console.log("Form values:", values.password);
    setOpen(true);
    resetForm(); // This will reset the form to the initial values
  };

  return (
    <SignInContainer>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        validationSchema={resetPasswordSchema}
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
        }) => (
          <Card>
            {/*Card Image*/}

            <section class={style.container__brand}>
              <img src="/images/logo.png" alt="Logo" />
            </section>

            {/*Card Header*/}
            <p className={style["form-header"]}>Reset Password</p>

            <TextField
              type={inputType}
              label="New Password"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              name="password"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              slotProps={{
                formHelperText: {
                  sx: { fontSize: 15 }, // Increase font size of helper text
                },
                inputLabel: {
                  style: { fontSize: 16 }, // font size for label text
                },
                input: {
                  style: { fontSize: 18 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {visibility ? (
                          <VisibilityIcon
                            sx={{ fontSize: 22, color: "#018965" }}
                          />
                        ) : (
                          <VisibilityOffIcon
                            sx={{ fontSize: 22, color: "#018965" }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              type={inputType}
              label="Confirm New Password"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
              name="confirmPassword"
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
              slotProps={{
                formHelperText: {
                  sx: { fontSize: 15 }, // Increase font size of helper text
                },
                inputLabel: {
                  style: { fontSize: 16 }, // font size for label text
                },
                input: {
                  style: { fontSize: 18 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {visibility ? (
                          <VisibilityIcon
                            sx={{ fontSize: 22, color: "#018965" }}
                          />
                        ) : (
                          <VisibilityOffIcon
                            sx={{ fontSize: 22, color: "#018965" }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* {BUTTON } */}

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
              {isSubmitting ? "Resetting..." : "Reset"}
            </button>

            <div className={style["form-link--container"]}>
              <span className={style["form-link"]}>
                {" "}
                Already Have an Account:{" "}
                <a className={style["link__register"]} href="#/customer/login"   >
                  Login
                </a>
              </span>
            </div>
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
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Position at the top center
      >
        <Alert
          onClose={handleClose}
          severity={alertType}
          sx={{
            width: "100%",
            fontSize: "2rem",
            padding: "16px",
            textAlign: "center",
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </SignInContainer>
  );
};

export default ResetPasswordCustomer;
