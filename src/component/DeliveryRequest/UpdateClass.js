import dashboard from "../style/dashboard/CustomerDashboard.module.css";
import style from "../style/form/StudentRegistration.module.css";
import { lazy, useState } from "react";
import React from "react";
import TextField from "@mui/material/TextField";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { Alert, Snackbar } from "@mui/material";
import { Formik } from "formik";
import { object, string, array } from "yup";
import { Close as Cancel } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  getDeliveryRequest,
  udateClass,
  saveDeliveryRequest,
  resetStatus,
  // updateClass,
} from "../../redux/reducer/deliveryRequestSlice";
import { useEffect } from "react";
import Loading from "../Chunks/loading";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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

const UpdateClass = () => {
  const classRegistrationSchema = object({
    name: string().required("Class is required"),
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const { className } = useParams();
  const navigate = useNavigate();
  const classState = useSelector((state) => state.classes);
  const { fetchingStatus } = classState;

  const authenticated = false;
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/school/login");
    localStorage.setItem("authenticated", JSON.stringify(authenticated));
  };

  const [state, setState] = useState({
    id: "",
    name: "",
  });

  useEffect(() => {
    dispatch(getDeliveryRequest(className))
      .unwrap()
      .then((result) => {
        console.log("ganinan" + result.name);
        setState({
          id: result.id,
          name: result.name,
        });
      });
  }, []);

  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return; // Prevent closing if the user clicks away
    }
    setOpen(false); // Close the Snackbar
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    const updatedClass = {
      id: state.id,
      name: values.name,
    };
    console.log("Test for name " + updatedClass.name);
    try {
      // const result = await dispatch(
      //   updateClass({ classData: updatedClass, className: state.name })
      // ).unwrap();
      // console.log(result);
      // setAlertType("success");
      // setMessage(result.message);
      if (className.startsWith("P")) {
        navigate("/class/primary-classes");
      } else if (className.startsWith("J")) {
        navigate("/class/jss-classes");
      } else if (className.startsWith("S")) {
        navigate("/class/sss-classes");
      }
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
      {fetchingStatus === "loading" ? (
        <Loading />
      ) : (
        <SignInContainer>
          <Formik
            initialValues={{
              name: className || "",
            }}
            validationSchema={classRegistrationSchema}
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
              setFieldValue,
              resetForm,
            }) => (
              <Card>
                {/*Card Image*/}

                <section class={style.container__brand}>
                  <img src="/images/logo.png" alt="Logo" />
                </section>

                {/*Card Header*/}
                <p className={style["form-header"]}>Update Class</p>

                {/*Input Field*/}

                <TextField
                  label={"Class Name"}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="name"
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  value={values.name}
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
                  {isSubmitting ? "Submitting..." : "Update Class"}
                </button>
                <span className={style["form-link"]}>
                  Class name convention must be JSS, SSS, PRI
                </span>
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
      )}
    </>
  );
};

export default UpdateClass;
