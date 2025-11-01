import dashboard from "../style/dashboard/CustomerDashboard.module.css";
import style from "../style/form/SchoolLogin.module.css";
import { useState } from "react";
import React from "react";
import TextField from "@mui/material/TextField";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Alert, Snackbar } from "@mui/material";
import { Formik } from "formik";
import { object, string, ref } from "yup";
import { useNavigate } from "react-router-dom";
import { IconButton, InputAdornment } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest, googleLoginRequest } from "../../redux/reducer/loginSlice";
import ReCAPTCHA from "react-google-recaptcha";
import { auth, googleProvider } from '../auth/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import Loading from "../Chunks/loading";

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

const LoginCustomer = () => {
  const loginSchema = object({
    username: string()
      .max(35, "ID must not exceed 35 characters")
      .required("ID is required"),

    password: string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const [displayText, setDisplayText] = useState("School");
  const [role, setRoles] = useState([
    {
      id: 1,
      text: "School",
      isSelected: true,
      color: "#fff",
      backgroundColor: "#028766",
    },
    {
      id: 2,
      text: "Teacher",
      isSelected: false,
      color: "#028766",
      backgroundColor: "#fff",
    },
    {
      id: 3,
      text: "Student",
      isSelected: false,
      color: "#028766",
      backgroundColor: "#fff",
    },
  ]);

  const [visibility, setVisibility] = useState(false);
  const [inputType, setInputType] = useState("password");
  const [open, setOpen] = useState(false); // Controls the Snackbar state
  const [alertType, setAlertType] = useState(""); // "success" or "error"
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [googleLoading, setGoogleLoading] = useState(false);
  

  

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

  const handleRoleClick = (id) => {
    setRoles((prevRole) =>
      prevRole.map(
        (role) =>
          role.id === id
            ? {
                ...role,
                isSelected: true,
                color: "#fff",
                backgroundColor: "#028766",
              }
            : {
                ...role,
                isSelected: false,
                color: "#028766",
                backgroundColor: "#fff",
              } // Reset other tags
      )
    );
    setDisplayText(role.find((role) => role.id === id).text);
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      const body = await dispatch(loginRequest(values)).unwrap();

      localStorage.setItem("token", JSON.stringify(body.jwt));
     

      setAlertType("success");
        setMessage("Login Successfully")
      // if statement here
      if (body.redirectUrl !== "error") {
        navigate(body.redirectUrl);
      }
    } catch (error) {
      setAlertType("error");
      console.log("Error Single " + JSON.stringify(error) );
      console.log("Error with Message " + error.message)
      setMessage(error.message);
    }

    setOpen(true);
    resetForm(); // This will reset the forto the initial values
  };




   const handleGoogleSignIn = async () => {


  
  try {
    setGoogleLoading(true)
    // Step 1: Sign in with Firebase
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Step 2: Get Firebase token
    const firebaseToken = await user.getIdToken();

    const values = {
      token: firebaseToken,
      displayName: user.displayName,
      email: user.email,
    }
    
    const body = await dispatch(googleLoginRequest(values)).unwrap();

      localStorage.setItem("token", JSON.stringify(body.jwt));
     

         setAlertType("success");
        setMessage("Login Successfully")
      // if statement here

      if (body.redirectUrl !== "error") {
        navigate(body.redirectUrl);
      }
    
    
  } catch (error) {
      setAlertType("error");
      setMessage("Google eigning error");
  } 

  setGoogleLoading(false)
}

  return (

   <>

   {googleLoading === true ? (
           <Loading />
         ) : (
          <SignInContainer>
      <Formik
        initialValues={{
          username: "",
          password: "",
          captchaToken: ""
        }}
        validationSchema={loginSchema}
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
        }) => (
          <Card>
            {/*Card Image*/}

            <section class={style.container__brand}>
              <img src="/images/logo.png" alt="Logo" />
            </section>

            {/*Card Header*/}
            <p className={style["form-header"]}>Customer Login</p>


            {/* Text Fields*/}
            <TextField
              label={"Email"}
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              name="username"
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
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
              type={inputType}
              label="Password"
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



            <ReCAPTCHA
    sitekey="6Lf2k84rAAAAAE621IbyMYN7_MgrAcQTypvqpMTU"
    onChange={(token) => setFieldValue("captchaToken", token)}
    size="compact"
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
              {isSubmitting ? "Wait..." : "Login"}
            </button>

            {/*Google Authentication*/}




           <button
  onClick={handleGoogleSignIn}
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '10px 24px',
    backgroundColor: '#fff',
    color: '#3c4043',
    border: '1px solid #dadce0',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    fontFamily: 'Roboto, arial, sans-serif',
    transition: 'all 0.2s'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = '#f8f9fa';
    e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(60,64,67,0.3)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = '#fff';
    e.currentTarget.style.boxShadow = 'none';
  }}
>
  <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </g>
  </svg>
  Continue with Google
</button>




























            <div className={style["form-link--container"]}>
              <span className={style["form-link"]}>
                {" "}
                Register here:{" "}
                <a className={style["link__register"]} href="#/
             customer/register">
                  Register
                </a>
              </span>
              <span className={style["form-link"]}>
                {" "}
                <a
                  className={style["link__register"]}
                  href="#/
             password/password-request-customer"
                >
                  Forgot Password
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
         )}
   
   </>
    
  );
};

export default LoginCustomer;
