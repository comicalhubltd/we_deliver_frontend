import dashboard from "../style/dashboard/CustomerDashboard.module.css";
import style from "../style/form/StudentRegistration.module.css";
import { lazy, useState } from "react";
import React from "react";
import TextField from "@mui/material/TextField";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { Alert as Alert, Snackbar } from "@mui/material";
import { Formik } from "formik";
import { object, string, array } from "yup";
import { IconButton, InputAdornment } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import StudentApi from "../proxy/StudentApi";
import { Close as Cancel } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { saveSubject, resetStatus } from "../../redux/reducer/subjectSlice";
import { getClassNames } from "../../redux/reducer/deliveryRequestSlice";
import { useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";

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

const SuccessAlert = () => {
  const studentRegistrationSchema = object({
    subjects: array()
      .of(object())
      .min(1, "Please select at least one subject")
      .required("Subjects are required"),

    class1: object({
      name: string().required("Name required"),
    }),
  });

  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [message, setMessage] = useState("");
  const studentState = useSelector((state) => state.students);
  const classState = useSelector((state) => state.classes);
  const { status: subjectStatus, error: subjectError } = studentState;
  const {
    classNames: classNames,
    status: classStatus,
    error: classError,
  } = classState;
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return; // Prevent closing if the user clicks away
    }
    setOpen(false); // Close the Snackbar
  };

  return (
    <div>
      <div style={{ width: "50rem", padding: "4rem" }}>
        <div class={[dashboard["card--alert-error"]].join(" ")}>
          <div class={dashboard["card_body"]}>
            <span
              class={[
                dashboard["icon-container"],
                dashboard["alert-close"],
              ].join(" ")}
            >
              <IconButton>
                <Cancel sx={{ fontSize: 30 }} />
              </IconButton>
            </span>

            <span class={dashboard["icon-container"]}>
              <svg
                class={[dashboard["icon--big"], dashboard["icon--error"]].join(
                  " "
                )}
              >
                <use href="../images/sprite.svg#error-icon"   ></use>
              </svg>
            </span>

            <p class={dashboard["alert-message"]}>
              No class available add classes
            </p>
          </div>
          <p class={dashboard["card_footer"]}>error</p>
        </div>
      </div>

      <div style={{ width: "50rem", padding: "4rem" }}>
        <div class={[dashboard["card--alert-success"]].join(" ")}>
          <div class={dashboard["card_body"]}>
            <span
              class={[
                dashboard["icon-container"],
                dashboard["alert-close"],
              ].join(" ")}
            >
              <IconButton>
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

            <p class={dashboard["alert-message"]}>Added Successfully</p>
          </div>
          <p class={dashboard["card_footer"]}>success</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessAlert;
