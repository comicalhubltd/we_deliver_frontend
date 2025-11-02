import dashboard from "../style/dashboard/CustomerDashboard.module.css";
import style from "../style/form/CustomerRegistration.module.css";
import { useState } from "react";
import React from "react";
import { loginRequest, googleLoginRequest } from "../../redux/reducer/loginSlice";
import TextField from "@mui/material/TextField";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Alert, Snackbar } from "@mui/material";
import { ErrorMessage, Formik } from "formik";
import { object, string, ref } from "yup";
import { IconButton, InputAdornment, MenuItem } from "@mui/material";
import { saveCustomer } from "../../redux/reducer/customerSlice";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import { Close as Cancel } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import statesAndLgas from "../utility/NigerianStateAndLgas";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ReCAPTCHA from "react-google-recaptcha";
import { auth, googleProvider } from '../auth/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';

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

const CustomerRegistration = () => {
  const customerRegistrationSchema = object({

// Profile
 profile: object({
      
    firstname: string()
      .max(15, "Firstname must not exceed 15 characters")
      .required("Firstname is required"),

    surname: string()
      .max(15, "Surname must not exceed 15 characters")
      .required("Surname is required"),
        
    lastname: string()
      .max(15, "Lastname must not exceed 15 characters"),

    gender: string()
            .max(15, "Gender must not exceed 15 characters"),

     dob: string().required("Date of Birth is required"),

    phoneNumber: string()
      .max(11, "Phone number should not be more than 11")
      .min(11, "Phone number should not be less than 11")
      .required("Phone Number is required"),
    }),


    // Address
     address: object({
    
     nationality: string()
        .max(10, "nationality must not exceed 10 characters")
        .required("nationality is required"),
     
     state: string()
        .max(30, "State must not exceed 30 characters")
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


     postalCode: string()
     .max(42, "Postal Code must not exceed 42 characters")
     .required("Postal Code is required")
 
    }),

    user: object({
      username: string().email("Invalid email").required("Email required"),

      password: string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),

      confirmPassword: string()
        .min(8, "Password must be at least 8 characters")
        .oneOf([ref("password"), null], "Passwords must match")
        .required("Password is required"),
    }),
  });

  const [visibility, setVisibility] = useState(false);
  const [inputType, setInputType] = useState("password");
  const [open, setOpen] = useState(false); // Controls the Snackbar state
  const [alertType, setAlertType] = useState(""); // "success" or "error"
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
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
  

  const handleFormSubmit = async (values, { resetForm }) => {
     
    const requestBody = {

       profile: {
          firstname: values.profile?.firstname,
          surname: values.profile?.surname,
          lastname: values.profile?.lastname,
          gender: values.profile?.gender,
          dob: values.profile?.dob,
          phoneNumber: values.profile?.phoneNumber,
          address: values.address
       },

         user: {
            username: values.user?.username,
            password: values.user?.password,
            role: values.user?.role,
            captchaToken: values.user?.captchaToken
          },      
    }



    console.log("Customer Form Values" + JSON.stringify(requestBody));
    try {
      const body = await dispatch(saveCustomer(requestBody)).unwrap();
      console.log(body);
      setAlertType("success");
      setMessage(body.message); 
      navigate("/customer/login");
    } catch (error) {
      console.log(error.message);
      setAlertType("error");
      setMessage(error.message);
    }
    // Handle form submission logic
    console.log("Form values:", values);
    setOpen(true);
    resetForm(); // This will reset the form to the initial values
  };

  return (
    <SignInContainer>
      <Formik
        initialValues={{
          profile: {
          firstname: "",
          surname: "",
          lastname: "",
          gender: "",
          dob: "",
          phoneNumber: "",
          },

          address: {
          nationality: "",
          state: "",
          lga: "",
          city: "",
          street: "",
          postalCode: ""
          },

          user: {
            username: "",
            password: "",
            confirmPassword: "",
            role: "CUSTOMER",
            captchaToken: ""
          },
        }}
        validationSchema={customerRegistrationSchema}
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
          
        const handleStateChange = (event) => {
          setFieldValue("address.state", event.target.value);
          setFieldValue("address.lga", ""); // reset LGA when state changes
        };
          
          
          return ( 
          <Card>
            {/*Card Image*/}

            <section class={style.container__brand}>
              <img src="/images/logo.png" alt="Logo" />
            </section>

            {/*Card Header*/}
            <p className={style["form-header"]}>Customer Registration</p>


            {step === 1 && 
            (
              <>

              {/* Text Fields*/}
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
              label="Lastname"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.profile?.lastname}
              name="profile.lastname"
              error={touched.profile?.lastname && Boolean(errors.profile?.lastname)}
              helperText={touched.profile?.lastname && errors.profile?.lastname}
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
                         
                            <MenuItem sx={{ fontSize: 18 }}  value={"Male"}>
                              Male
                            </MenuItem>
            
                               <MenuItem sx={{ fontSize: 18 }}  value={"Female"}>
                              Female
                            </MenuItem>
                        
                        </TextField>


                <TextField
              label=""
              variant="outlined"
              fullWidth
              type="date"
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.profile?.dob}
              name="profile.dob"
              error={touched.profile?.dob && Boolean(errors.profile?.dob)}
              helperText={touched.profile?.dob && errors.profile?.dob}
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
                                                                                                                                                                                                                                          
              <TextField
              select
              label="Nationality"
              name="address.nationality"
              value={values.address?.nationality}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.address?.nationality && Boolean(errors.address?.nationality)}
              helperText={touched.address?.nationality && errors.address?.nationality}
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
             
                <MenuItem sx={{ fontSize: 18 }}  value={"Nigerian"}>
                  Nigerian
                </MenuItem>

                   <MenuItem sx={{ fontSize: 18 }}  value={"Other"}>
                  Other
                </MenuItem>
            
            </TextField>


            {/* STATE DROPDOWN */}
            <TextField
              select
              label="State"
              name="address.state"
              value={values.address?.state}
              onChange={handleStateChange}
              onBlur={handleBlur}
              error={touched.address?.state && Boolean(errors.address?.state)}
              helperText={touched.address?.state && errors.address?.state}
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
              name="address.lga"
              value={values.address.lga}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.address?.lga && Boolean(errors.address?.lga)}
              helperText={touched.address?.lga && errors.address?.lga}
              disabled={!values.address?.state}
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
              {values.address.state &&
                statesAndLgas[values.address.state].map((lga) => (
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
              value={values.address?.city}
              name="address.city"
              error={touched.address?.city && Boolean(errors.address?.city)}
              helperText={touched.address?.city && errors.address?.city}
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
              value={values.address?.street}
              name="address.street"
              error={touched.address?.street && Boolean(errors.address?.street)}
              helperText={touched.address?.street && errors.address?.street}
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
              label="Postal Code"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address?.postalCode}
              name="address.postalCode"
              error={touched.address?.postalCode && Boolean(errors.address?.postalCode)}
              helperText={touched.address?.postalCode && errors.address?.postalCode}
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

             
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.user?.username}
              name="user.username"
              error={touched.user?.username && Boolean(errors.user?.username)}
              helperText={touched.user?.username && errors.user?.username}
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
              value={values.user?.password}
              name="user.password"
              error={touched.user?.password && Boolean(errors.user?.password)}
              helperText={touched.user?.password && errors.user?.password}
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
              label="Confirm Password"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.user?.confirmPassword}
              name="user.confirmPassword"
              error={
                touched.user?.confirmPassword &&
                Boolean(errors.user?.confirmPassword)
              }
              helperText={
                touched.user?.confirmPassword && errors.user?.confirmPassword
              }
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
              {isSubmitting ? "Submitting..." : "Register"}
            </button>



              </>
            )}


           
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
                Already Have an Account:{" "}
                <a className={style["link__register"]} href="#/customer/login"   >
                  Login
                </a>
              </span>
            </div>
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
  );
};

export default CustomerRegistration;
