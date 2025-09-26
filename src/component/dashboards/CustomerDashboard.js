import dashboard from "../style/dashboard/CustomerDashboard.module.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllSession } from "../../redux/reducer/sessionSlice";
import {
  getCustomerDeliveredDelivery, getCustomerAllDelivery
 
} from "../../redux/reducer/deliveryRequestSlice";
import { object, string, array } from "yup";
import { Alert, Snackbar } from "@mui/material";
import { setCurrentSession } from "../../redux/reducer/sessionSlice";
import { Dialog } from "@mui/material";
import ActionMenu from "../utility/ActionMenu";
import Loading from "../Chunks/loading";
import { useLocation, useParams } from "react-router-dom";
import { getExpiryDate } from "../../redux/reducer/paymentSlice";

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#018965",
    color: theme.palette.common.white,
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CustomerDashboard = () => {
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

 

   const deliveryState = useSelector((state) => state.deliveryRequests);
   const { customerDeliveredDelivery, customerDeliveryRequests,  fetchingStatus } = deliveryState;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openAnchor = Boolean(anchorEl);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [message, setMessage] = useState("");
  const [initialSelectedId, setInitialSelectedId] = useState(null);
  const rows = Array.isArray(customerDeliveredDelivery) ? customerDeliveredDelivery : [];
  const params = useParams();
  const location = useLocation();

  
  const logout = () => {
    localStorage.removeItem("token");
   navigate("/customer/login");
    
  };

  useEffect(() => {
    fetchData();
  }, [location.pathname]);

 
   const fetchData = () => {
     dispatch(getCustomerDeliveredDelivery());
     dispatch(getCustomerAllDelivery());
   };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return; // Prevent closing if the user clicks away
    }
    setOpen(false); // Close the Snackbar
  };


   const navigateToFeedback = () => {
    navigate("/delivery/customer-view-feedback");
  };

  console.log("ARRAY " + rows);

  const handleCheckboxChange = (id) => {
    // formik.setFieldValue("selectedId", id);
  };

  const navigateAddDeliveryRequest = () => {
    navigate("/delivery/add-delivery");
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    //   console.log(values);
    //    console.log("from inside the useeff" + rows)
    // const selected = rows.forEach(r => r.current === true);
    // console.log("from inside the effect " + selected);
    // setInitialSelectedId(selected?.id ?? null);
    try {
      const resultAction = await dispatch(
        setCurrentSession(values.selectedId)
      ).unwrap();
      setAlertType("success");
      setMessage(resultAction.message);
    } catch (error) {
      setAlertType("error");
      setMessage(error);
    }

    setOpen(true);
    resetForm(); // This will reset the forto the initial values
  };

  return (
    <>
      {fetchingStatus === "loading" ? (
        <Loading />
      ) : (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />

            {/* Navbar */}
            <AppBar
              position="fixed"
              sx={{ zIndex: 2, background: "white", color: "#018965" }}
            >
              <Toolbar
                sx={{
                  zIndex: 2,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {!isLargeScreen && (
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={toggleDrawer}
                  >
                    <MenuIcon sx={{ color: "inherit", fontSize: 30 }} />
                  </IconButton>
                )}

                <div>
                  {/** Profile Setup */}

                  <IconButton
                    onClick={profilePopup}
                    sx={{
                      backgroundColor: "#018965", // Custom background
                      "&:hover": {
                        backgroundColor: "#03684f",
                      },
                    }}
                  >
                    <PersonOutlineOutlinedIcon
                      sx={{ color: "white", fontSize: 25 }} // fontSize in px
                    />
                  </IconButton>

                  <BasePopup
                    sx={{ zIndex: 2 }}
                    id={idProfile}
                    open={openProfile}
                    anchor={anchorProfile}
                  >
                    <div className={navbar["profile--selection__container"]}>
                      <div className={navbar["profile"]}>
                        <a
                          href="/customer/customer-profile"
                          className={[navbar["link--profile"], navbar[""]].join(
                            " "
                          )}
                        >
                          Profile
                        </a>
                      </div>
                      <div className={navbar["logout"]}>
                        <a
                          onClick={logout}
                          className={[navbar["link--profile"], navbar[""]].join(
                            " "
                          )}
                        >
                          Logout
                        </a>
                      </div>
                    </div>
                  </BasePopup>
                </div>
              </Toolbar>
            </AppBar>

            {/* Drawer */}
            <Drawer
              variant={isLargeScreen ? "persistent" : "temporary"}
              open={isLargeScreen || isDrawerOpen}
              onClose={!isLargeScreen ? toggleDrawer : undefined}
              sx={{
                width: 240,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: 240,
                  boxSizing: "border-box",
                },
                "& .MuiBackdrop-root": {
                  backgroundColor: "rgba(157, 152, 202, 0.3)", // Transparent backdrop
                },
              }}
            >
              {/* Drawer Header */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  borderBottom: "1px solid #ddd",
                }}
              >
                {/* Logo in the center */}
                <Box sx={{ textAlign: "center", flexGrow: 1 }}>
                  <a
                    className={[navbar["logo__link"], navbar["logo"]].join(" ")}
                    href="#"
                  >
                    <img src="/images/logo.png" alt="miqwii logo" />
                  </a>
                </Box>

                {/* Close Button */}
                {!isLargeScreen && (
                  <IconButton onClick={toggleDrawer}>
                    <Cancel sx={{ color: "#018965", fontSize: 30 }} />
                  </IconButton>
                )}
              </Box>

              {/* Drawer Content */}
              <List>
                {/* Dashboard Navbar Content */}
                {/* Dashboard Navbar Content */}
            <div
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleChevron("chevron-0")}
                  className={[
                    navbar["collapsible"],
                    navbar[
                      activeChevron === "chevron-0"
                        ? "collapsible--expanded"
                        : null
                    ],
                  ].join(" ")}
                >
                  <header className={navbar["collapsible__header"]}>
                    <div className={navbar["collapsible__icon"]}>
                      <svg
                        class={[
                          navbar["collapsible--icon"],
                          navbar["icon--primary"],
                        ].join(" ")}
                      >
                        <use href="../images/sprite.svg#dashboard"></use>
                      </svg>
                      <p className={navbar["collapsible__heading"]}>
                        Dashboard
                      </p>
                    </div>

                    <span
                      onClick={() => toggleChevron("chevron-0")}
                      className={navbar["icon-container"]}
                    >
                      <svg
                        className={[
                          navbar["icon"],
                          navbar["icon--primary"],
                          navbar["icon--white"],
                          navbar["collapsible--chevron"],
                        ].join(" ")}
                      >
                        <use href="../images/sprite.svg#chevron"></use>
                      </svg>
                    </span>
                  </header>

                  <div className={navbar["collapsible__content--drawer"]}>
                    <a
                      href="/customer/home"
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      Home
                    </a>
                 
                  </div>
                </div>

        
          

              
                {/* Delivery Request  Navbar Content */}
                
                {/* Delivery Request  Navbar Content */}
              
                {/* Delivery Request  Navbar Content */}
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleChevron("chevron-4")}
                  className={[
                    navbar["collapsible"],
                    navbar[
                      activeChevron === "chevron-4"
                        ? "collapsible--expanded"
                        : null
                    ],
                  ].join(" ")}
                >
                  <header className={navbar["collapsible__header"]}>
                    <div className={navbar["collapsible__icon"]}>
                      <svg
                        class={[
                          navbar["collapsible--icon"],
                          navbar["icon--primary"],
                        ].join(" ")}
                      >
                        <use href="../images/sprite.svg#request"></use>
                      </svg>
                      <p className={navbar["collapsible__heading"]}>Deliveries</p>
                    </div>

                    <span
                      onClick={() => toggleChevron("chevron-4")}
                      className={navbar["icon-container"]}
                    >
                      <svg
                        className={[
                          navbar["icon"],
                          navbar["icon--primary"],
                          navbar["icon--white"],
                          navbar["collapsible--chevron"],
                        ].join(" ")}
                      >
                        <use href="../images/sprite.svg#chevron"></use>
                      </svg>
                    </span>
                  </header>
 <div className={navbar["collapsible__content--drawer"]}>

                   <a
                      href="/delivery/customer-pending"
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      Pending
                    </a>


                    
                     <a
                      href="/delivery/customer-awaiting-transit"
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      Awaiting Transit
                    </a>


                    <a
                      href="/delivery/customer-on-transit"
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      On Transit 
                    </a>





                     <a
                      href="/delivery/customer-arrived"
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      Arrived
                    </a>



                    
                    <a
                      href="/delivery/customer-delivered"
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      Delivered
                    </a>


                    <a
                      href="/delivery/add-delivery"
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      Add Deliveries
                    </a>
                  </div>
                </div>


                {/* Location Navbar Content */}
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleChevron("chevron-6")}
                  className={[
                    navbar["collapsible"],
                    navbar[
                      activeChevron === "chevron-6"
                        ? "collapsible--expanded"
                        : null
                    ],
                  ].join(" ")}
                >
                  <header className={navbar["collapsible__header"]}>
                    <div className={navbar["collapsible__icon"]}>
                      <svg
                        class={[
                          navbar["collapsible--icon"],
                          navbar["icon--primary"],
                        ].join(" ")}
                      >
                        <use href="../images/sprite.svg#location"></use>
                      </svg>
                      <p className={navbar["collapsible__heading"]}>Locations</p>
                    </div>

                    <span
                      onClick={() => toggleChevron("chevron-6")}
                      className={navbar["icon-container"]}
                    >
                      <svg
                        className={[
                          navbar["icon"],
                          navbar["icon--primary"],
                          navbar["icon--white"],
                          navbar["collapsible--chevron"],
                        ].join(" ")}
                      >
                        <use href="../images/sprite.svg#chevron"></use>
                      </svg>
                    </span>
                  </header>

                  <div className={navbar["collapsible__content--drawer"]}>
                    <a
                      href="/location/show-locations"
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      Live Location
                    </a>
                  </div>
                </div>


                
              

                {/* Profile Navbar Content */}
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleChevron("chevron-9")}
                  className={[
                    navbar["collapsible"],
                    navbar[
                      activeChevron === "chevron-9"
                        ? "collapsible--expanded"
                        : null
                    ],
                  ].join(" ")}
                >
                  <header className={navbar["collapsible__header"]}>
                    <div className={navbar["collapsible__icon"]}>
                      <svg
                        class={[
                          navbar["collapsible--icon"],
                          navbar["icon--primary"],
                        ].join(" ")}
                      >
                        <use href="/images/sprite.svg#profile"></use>
                      </svg>
                      <p className={navbar["collapsible__heading"]}>Profile</p>
                    </div>

                    <span
                      onClick={() => toggleChevron("chevron-9")}
                      className={navbar["icon-container"]}
                    >
                      <svg
                        className={[
                          navbar["icon"],
                          navbar["icon--primary"],
                          navbar["icon--white"],
                          navbar["collapsible--chevron"],
                        ].join(" ")}
                      >
                        <use href="/images/sprite.svg#chevron"></use>
                      </svg>
                    </span>
                  </header>

                  <div className={navbar["collapsible__content--drawer"]}>
                    <a
                      href="/customer/customer-profile"
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      Profile
                    </a>
                    <a
                      onClick={logout}
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      Logout
                    </a>
                  </div>
                </div>
              </List>
            </Drawer>

            {/* Main Content */}
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                marginTop: 8,
                fontSize: 23,
                overflowX: "auto",
                width: "100%",
                color: "#9a99ac",
                transition: "margin-left 0.3s ease-in-out",
              }}
            >
              <div className={dashboard["secondary--container"]}>
                <div
                  class={[dashboard["grid"], dashboard["grid--1x3"]].join(" ")}
                >
                   <div
                                     class={[
                                       dashboard["card--count"],
                                       dashboard["card--primary"],
                                     ].join(" ")}
                                   >
                                     <div class={dashboard["card_body"]}>
                                       <div class={dashboard["card_button_and_icon"]}>
                                         <span class={dashboard["icon-container"]}>
                                           <svg
                                             class={[
                                               dashboard["icon--big"],
                                               dashboard["icon--primary"],
                                             ].join(" ")}
                                           >
                                             <use href="../images/sprite.svg#request"></use>
                                           </svg>
                                         </span>
                 
                                         <div>
                                           {"Total Deliveries Made: "}
                                            <p
                                             style={{
                                               color: "#018965",
                                               fontSize: "2.5rem",
                                               fontWeight: "bold",
                                             }}
                                           >
                                           {customerDeliveryRequests.length}
                                           </p>
                                         </div>
                                       </div>
                                     </div>
                                   </div>
                 
                                   <div
                                     class={[
                                       dashboard["card--count"],
                                       dashboard["card--primary"],
                                     ].join(" ")}
                                   >
                                     <div class={dashboard["card_body"]}>
                                       <div class={dashboard["card_button_and_icon"]}>
                                         <span class={dashboard["icon-container"]}>
                                           <svg
                                             class={[
                                               dashboard["icon--big"],
                                               dashboard["icon--primary"],
                                             ].join(" ")}
                                           >
                                             <use href="../images/sprite.svg#request-approve"></use>
                                           </svg>
                                         </span>
                 
                                         <div>
                                           {"Delivered: "}
                                           <p
                                             style={{
                                               color: "#018965",
                                               fontSize: "2.5rem",
                                               fontWeight: "bold",
                                             }}
                                           >
                                           {customerDeliveredDelivery.length}
                                           </p>
                                         </div>
                                       </div>
                                     </div>
                                   </div>


                     <div
                                      class={[
                                        dashboard["card--add"],
                                        dashboard["card--primary"],
                                      ].join(" ")}
                                    >
                                      <div class={dashboard["card_body"]}>
                                        <div class={dashboard["card--small-head"]}>
                                          View Feedback
                                        </div>
                  
                                        <button
                                          onClick={navigateToFeedback}
                                          className={[
                                            dashboard["btn"],
                                            dashboard["btn--block"],
                                            dashboard["btn--secondary"],
                                          ].join(" ")}
                                        >
                                          {" "}
                                          View Feedback
                                        </button>
                                      </div>
                                    </div>
                </div>

                {/* <div class={[dashboard['card--count'], dashboard['card--primary']].join(' ')}>
            <div class={dashboard['card_body']}>
            
            <div class={dashboard['card_button_and_icon']}>
            
            <span class={dashboard['icon-container']}>
            <svg class={[dashboard['icon--big'], dashboard['icon--primary']].join(' ')}>
            <use href="../images/sprite.svg#school"></use>
            </svg>
            </span>

            <div>{rows.find((r) => r.school.name)?.school.name ?? 0}</div>
            
          
            </div>
            
            
            
           
            
            </div>
            
            </div> */}

                <div
                  class={[dashboard["grid"], dashboard["grid--1x2"]].join(" ")}
                >
                  <div
                    class={[
                      dashboard["card--count"],
                      dashboard["card--primary"],
                    ].join(" ")}
                  >
                    <div class={dashboard["card_body"]}>
                      <div class={dashboard["card_button_and_icon"]}>
                        <span class={dashboard["icon-container"]}>
                          <svg
                            class={[
                              dashboard["icon--big"],
                              dashboard["icon--primary"],
                            ].join(" ")}
                          >
                            <use href="../images/sprite.svg#display"></use>
                          </svg>
                        </span>

                        <span
                          class={[dashboard["badge"], dashboard[""]].join(" ")}
                        >
                          { 0}
                        </span>
                      </div>
                      Current Movements
                    </div>
                  </div>


                  <div
                    class={[
                      dashboard["card--add"],
                      dashboard["card--primary"],
                    ].join(" ")}
                  >
                    <div class={dashboard["card_body"]}>
                      <div class={dashboard["card--small-head"]}>
                        Accept Request
                      </div>

                      <button
                        onClick={navigateAddDeliveryRequest}
                        className={[
                          dashboard["btn"],
                          dashboard["btn--block"],
                          dashboard["btn--primary"],
                        ].join(" ")}
                      >
                        {" "}
                        Add Delivery Requests
                      </button>
                    </div>
                  </div>
                </div>

               
              </div>
            </Box>
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
                            <use href="../images/sprite.svg#success-icon"></use>
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
                            <use href="../images/sprite.svg#error-icon"></use>
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
          </Box>
        </ClickAwayListener>
      )}
    </>
  );
};

export default CustomerDashboard;

const ITEM_HEIGHT = 48;
const options = ["None", "Atria", "Callisto"];

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? (
          <LastPageIcon sx={{ fontSize: 30 }} />
        ) : (
          <FirstPageIcon sx={{ fontSize: 30 }} />
        )}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight sx={{ fontSize: 30 }} />
        ) : (
          <KeyboardArrowLeft sx={{ fontSize: 30 }} />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft sx={{ fontSize: 30 }} />
        ) : (
          <KeyboardArrowRight sx={{ fontSize: 30 }} />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? (
          <FirstPageIcon sx={{ fontSize: 30 }} />
        ) : (
          <LastPageIcon sx={{ fontSize: 30 }} />
        )}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
