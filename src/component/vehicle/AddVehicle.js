import dashboard from "../style/dashboard/CustomerDashboard.module.css";
import style from "../style/form/CustomerRegistration.module.css";
import { useState } from "react";
import React from "react";
import TextField from "@mui/material/TextField";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { Alert, Snackbar } from "@mui/material";
import { ErrorMessage, Formik } from "formik";
import { object, string, ref } from "yup";
import { IconButton, InputAdornment, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import { Close as Cancel } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { identity } from "lodash";
import { useParams } from "react-router-dom";
import { saveVehicle } from "../../redux/reducer/vehicleSlice";


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

const AddVehicle = () => {
  const vehicleRegistrationSchema = object({



    // Address

    
     plateNumber: string()
        .max(15, "Plate Number must not exceed 15 characters")
        .required("Plate Number is required"),
     
     color: string()
        .max(10, "Color must not exceed 10 characters")
        .required("Color is required"),

     type: string()
        .max(10, "Type must not exceed 10 characters")
        .required("Type is required"),

     made: string()
        .max(10, "Made must not exceed 10 characters")
        .required("Made is required"),


  });

  const [open, setOpen] = useState(false); // Controls the Snackbar state
  const [alertType, setAlertType] = useState(""); // "success" or "error"
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { id } = useParams();;


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return; // Prevent closing if the user clicks away
    }
    setOpen(false); // Close the Snackbar
  };

 

   const handleFormSubmit = async (values, { resetForm }) => {
     
     const requestBody = {
        
          plateNumber: values.plateNumber,
          color: values.color,
          type: values.type,
          made: values.made
     }


    console.log("Customer Form Values" + JSON.stringify(requestBody));

    try {
      const body = await dispatch(saveVehicle({vehicleData: requestBody, driverId:  id})).unwrap();
      console.log(body);
      setAlertType("success");
      setMessage(body.message); 
    //   navigate("/customer/login");
    } catch (error) {
      console.log(error.message);
      setAlertType("error");
      setMessage(error.message);
    }
    console.log("Form values:", values);
    setOpen(true);
    resetForm(); // This will reset the form to the initial values
  };

  return (
    <SignInContainer>
      <Formik
        initialValues={{
          plateNumber: "",
          color: "",
          type: "",
          made: "",
        }}

        validationSchema={vehicleRegistrationSchema}
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
            <p className={style["form-header"]}>Add Vehicle</p>




            <TextField
              label="Plate Numner"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.plateNumber}
              name="plateNumber"
              error={touched.plateNumber && Boolean(errors.plateNumber)}
              helperText={touched.plateNumber && errors.plateNumber}
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
              label="Color"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.color}
              name="color"
              error={touched.color && Boolean(errors.color)}
              helperText={touched.color && errors.color}
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
              label="Type"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.type}
              name="type"
              error={touched.type && Boolean(errors.type)}
              helperText={touched.type && errors.type}
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
              label="Made"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.made}
              name="made"
              error={touched.made && Boolean(errors.made)}
              helperText={touched.made && errors.made}
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
              {isSubmitting ? "Adding..." : "Add"}
            </button>

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
                      <use href="/images/sprite.svg#success-icon"   ></use>
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
                      <use href="/images/sprite.svg#error-icon"   ></use>
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

export default AddVehicle;
