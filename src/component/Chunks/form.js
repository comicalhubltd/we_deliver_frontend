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
import { IconButton, InputAdornment } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import StudentApi from "../proxy/StudentApi";
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

const Form = () => {
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
    status: fetchingStatus,
    error: classError,
  } = classState;
  const dispatch = useDispatch();

  useEffect(() => {
    if (classStatus === "idle") {
      dispatch(getClassNames());
    }
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return; // Prevent closing if the user clicks away
    }
    setOpen(false); // Close the Snackbar
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    console.log(values);
    try {
      const resultAction = await dispatch(saveSubject(values)).unwrap();
      console.log(subjectStatus);
      setAlertType("success");
      setMessage("Student Added Successfully!");
    } catch (error) {
      setAlertType("error");
      setMessage("Error Occured Try Again!");
    }

    setOpen(true);
    resetForm(); // This will reset the forto the initial values
  };

  return (
    <SignInContainer>
      <Formik
        initialValues={{
          subjects: [],
          class1: { name: "" },
        }}
        validationSchema={studentRegistrationSchema}
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
        }) => (
          <Card>
            {/*Card Image*/}

            <section class={style.container__brand}>
              <img src="/images/logo.png" alt="Logo" />
            </section>

            {/*Card Header*/}
            <p className={style["form-header"]}>Add Subject</p>

            {/*Input Field*/}

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <FormControl sx={{ m: 1, minWidth: "100%" }}>
                <InputLabel sx={{ fontSize: 18 }}>Select Class</InputLabel>
                <Select
                  label="class"
                  name="class1.name"
                  variant="filled"
                  onChange={(event) =>
                    setFieldValue("class1.name", event.target.value)
                  }
                  onBlur={handleBlur}
                  value={values.class1?.name}
                  sx={{ fontSize: 18 }}
                  error={touched.gender && Boolean(errors.class1?.gender)}
                >
                  {classNames.map((className) => (
                    <MenuItem sx={{ fontSize: 18 }} value={className}>
                      {className}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={{ fontSize: 15 }}>
                  {touched.class1?.name && errors.class1?.name}
                </FormHelperText>
              </FormControl>
            </div>

            <Autocomplete
              multiple
              limitTags={1}
              id="multiple-limit-tags"
              options={subjects}
              getOptionLabel={(option) => option.name}
              onChange={(event, value) => setFieldValue("subjects", value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Subjects"
                  placeholder="Subjects"
                  variant="filled"
                  fullWidth
                  margin="normal"
                  name="subjects"
                  error={touched.subjects && Boolean(errors.subjects)}
                  helperText={touched.subjects && errors.subjects}
                  value={values.subjects?.name}
                  slotProps={{
                    formHelperText: {
                      sx: { fontSize: 15 }, // Increase font size of helper text
                    },

                    inputLabel: {
                      style: { fontSize: 16 }, // font size for label text
                    },
                  }}
                />
              )}
              sx={{
                "& .MuiAutocomplete-tag": {
                  fontSize: "14px", // Customize the font size of the tags
                  backgroundColor: "#e0f7fa", // Optional: Change tag background color
                },
                "& .MuiAutocomplete-option": {
                  fontSize: "16px", // Customize the font size of dropdown options
                },
              }}
              slotProps={{
                textField: {
                  InputLabelProps: {
                    style: { fontSize: "18px", color: "blue" }, // Customize label
                  },
                  inputProps: {
                    style: { fontSize: "16px" }, // Customize input font size
                  },
                },
                popper: {
                  sx: {
                    "& .MuiAutocomplete-option": {
                      fontSize: "16px", // Customize dropdown option font size
                    },
                  },
                },
                tag: {
                  style: { fontSize: "14px", backgroundColor: "#e0f7fa" }, // Tag styles
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
              {isSubmitting ? "Submitting..." : "Add Subjects"}
            </button>
            <span className={style["form-link"]}>
              {" "}
              Did not Have Class:{" "}
              <a className={style["link__register"]} href="/class/add-class">
                Add Class
              </a>
            </span>
            <span className={style["form-link"]}>
              Add classes to be able to add subject to a particuler class entity
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

export default Form;

const subjects = [
  { name: "Mathematics" },
  { name: "English" },
  { name: "Biolgy" },
  { name: "Physics" },
  { name: "Chemistry" },
  { name: "Geography" },
  { name: "Basic Science" },
  { name: "Basic Technology" },
];
