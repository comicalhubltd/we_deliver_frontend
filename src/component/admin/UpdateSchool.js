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
import { updateSchool } from "../../redux/reducer/customerSlice";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import { Close as Cancel } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
// import { getSchoolById } from "../../redux/reducer/customerSlice";
import Loading from "../Chunks/loading";

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

const UpdateSchool = () => {
  const CustomerRegistrationSchema = object({
    name: string()
      .max(80, "School Name must not exceed 80 characters")
      .required("School Name is required"),

    address: string()
      .max(80, "Address must not exceed 80 characters")
      .required("Address is required"),

    motto: string()
      .max(80, "Motto must not exceed 80 characters")
      .required("Motto is required"),

    contact: string()
      .max(11, "Phone number should not be more than 11")
      .min(11, "Phone number should not be less than 11")
      .required("Phone Number is required"),
  });

  const [open, setOpen] = useState(false); // Controls the Snackbar state
  const [alertType, setAlertType] = useState(""); // "success" or "error"
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setIsLoading] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return; // Prevent closing if the user clicks away
    }
    setOpen(false); // Close the Snackbar
  };

  const authenticated = false;
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/school/login");
    localStorage.setItem("authenticated", JSON.stringify(authenticated));
  };

  const [state, setState] = useState({
    id: "",
    name: "",
    address: "",
    contact: "",
    motto: "",
    email: "",
  });

  useEffect(() => {
    fetchSchool();
  }, []);

  const fetchSchool = async () => {
    // try {
    //   setIsLoading(true);
    //   await dispatch(getSchoolById(id))
    //     .unwrap()
    //     .then((result) => {
    //       console.log("ganinan" + result.regNo);
    //       setState({
    //         id: result.id,
    //         name: result.name,
    //         address: result.address,
    //         contact: result.contact,
    //         motto: result.motto,
    //       });
    //     });
    // } catch (error) {
    //   setAlertType("error");
    //   setMessage(error.message);
    //   console.log(error.message);
    // }
    // setIsLoading(false);
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    const updatedSchool = {
      id: state.id,
      name: values.name,
      address: values.address,
      motto: values.motto,
      contact: values.contact,
    };

    try {
      const body = await dispatch(
        updateSchool({ id: state.id, schoolData: updatedSchool })
      ).unwrap();
      console.log(body);
      setAlertType("success");
      setMessage(body.message);
      navigate("/admin/schools");
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
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <SignInContainer>
          <Formik
            initialValues={{
              name: state.name || "",
              address: state.address || "",
              motto: state.motto || "",
              contact: state.contact || "",
            }}
            validationSchema={CustomerRegistrationSchema}
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
                <p className={style["form-header"]}>Update School</p>

                {/* Text Fields*/}
                <TextField
                  label="School Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  name="name"
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
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
                  label="Address"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  name="address"
                  error={touched.address && Boolean(errors.address)}
                  helperText={touched.address && errors.address}
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
                  label="Motto"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.motto}
                  name="motto"
                  error={touched.motto && Boolean(errors.motto)}
                  helperText={touched.motto && errors.motto}
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
                  label="Tel"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.contact}
                  name="contact"
                  error={touched.contact && Boolean(errors.contact)}
                  helperText={touched.contact && errors.contact}
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
                  {isSubmitting ? "Updating..." : "Update"}
                </button>

                <div className={style["form-link--container"]}>
                  <span className={style["form-link"]}>
                    {" "}
                    Already Have an Accoutn:{" "}
                    <a className={style["link__register"]} href="/school/login">
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

export default UpdateSchool;
