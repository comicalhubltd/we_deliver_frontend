import dashboard from "../style/dashboard/CustomerDashboard.module.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import PropTypes from "prop-types";
import DeliveryActionMenuDeleteEditView from "../utility/DeliveryActionMenuDeleteEditView";
import {
 getCustomerOnTransitDelivery, getCustomerAllDelivery
 
} from "../../redux/reducer/deliveryRequestSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteDeliveryRequest } from "../../redux/reducer/deliveryRequestSlice";
import ActionMenu from "../utility/ActionMenu";
import Loading from "../Chunks/loading";
import { useLocation } from "react-router-dom";
// import ClassScoreSheet from "../result/ClassScoreSheet";

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
import PreviewIcon from "@mui/icons-material/Preview";

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

const CustomerOnTransit = () => {
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
  const { customerOnTransitDelivery, customerDeliveryRequests,  fetchingStatus } =
    deliveryState;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  
  const logout = () => {
    localStorage.removeItem("token");
   navigate("/customer/login");
    
  };

  useEffect(() => {
    fetchData();

  }, [location.pathname]);

  const fetchData = () => {
    dispatch(getCustomerOnTransitDelivery());
    dispatch(getCustomerAllDelivery());
  };

  const rows = Array.isArray(customerOnTransitDelivery) ? customerOnTransitDelivery : [];

  

  const handleDelete = async (id) => {
    // Filter out the deleted row
    rows.filter((row) => row.id !== id);
    // const result = await dispatch(deleteSchool(id)).unwrap();
  };

  const handleEdit = (id) => {
    // Implement edit functionality
    navigate(`/delivery/edit/${id}`);
  };

   const handleViewDetails = (id) => {
     navigate(`/delivery/delivery-details/${id}`);
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
                          href="#/customer/profile"   
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
                        <use href="../images/sprite.svg#dashboard"   ></use>
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
                        <use href="../images/sprite.svg#chevron"   ></use>
                      </svg>
                    </span>
                  </header>

                  <div className={navbar["collapsible__content--drawer"]}>
                    <a href="#/customer/home"   
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
                        <use href="../images/sprite.svg#request"   ></use>
                      </svg>
                       <p className={navbar["collapsible__heading"]}>Delivery Status</p>
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
                        <use href="../images/sprite.svg#chevron"   ></use>
                      </svg>
                    </span>
                  </header>
 <div className={navbar["collapsible__content--drawer"]}>

                   <a href="#/delivery/customer-pending"   
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      Pending
                    </a>


                    
                     <a href="#/delivery/customer-awaiting-transit"   
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      Awaiting Transit
                    </a>


                    <a href="#/delivery/customer-on-transit"   
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      On Transit 
                    </a>





                     <a href="#/delivery/customer-arrived"   
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      Arrived
                    </a>



                    
                    <a href="#/delivery/customer-delivered"   
                      className={[navbar["link--drawer"], navbar[""]].join(" ")}
                    >
                      Delivered
                    </a>


                    <a href="#/delivery/add-delivery"   
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
                        <use href="../images/sprite.svg#location"   ></use>
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
                        <use href="../images/sprite.svg#chevron"   ></use>
                      </svg>
                    </span>
                  </header>

                  <div className={navbar["collapsible__content--drawer"]}>
                    <a href="#/location/show-locations"   
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
                        <use href="#/images/sprite.svg#profile"   ></use>
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
                        <use href="#/images/sprite.svg#chevron"   ></use>
                      </svg>
                    </span>
                  </header>

                  <div className={navbar["collapsible__content--drawer"]}>
                    <a href="#/customer/profile"   
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
                            <use href="../images/sprite.svg#request"   ></use>
                          </svg>
                        </span>

                        <span
                          class={[dashboard["badge"], dashboard[""]].join(" ")}
                        >
                          {customerOnTransitDelivery.length}
                        </span>
                      </div>
                      OnTransit Request
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
                            <use href="../images/sprite.svg#request"   ></use>
                          </svg>
                        </span>

                        <span
                          class={[dashboard["badge"], dashboard[""]].join(" ")}
                        >
                          {customerDeliveryRequests.length}
                        </span>
                      </div>
                      Total Delivery Made
                    </div>
                  </div>

             
                </div>
                {/* <div>{classNamesSpecific}</div> */}

              <TableContainer component={Paper} sx={{ marginTop: 1 }}>
                          <Table
                            sx={{ minWidth: 650 }}
                            aria-label="simple table"
                          >
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>Item Type</StyledTableCell>
                                <StyledTableCell align="left">
                                  From(State/City) 
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  To(State/City)
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  Date and Time
                                </StyledTableCell>
                                 <StyledTableCell align="left">
                                  Status
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                   Action &nbsp;
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {(rowsPerPage > 0
                                ? rows.slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                  )
                                : rows
                              ).map((row) => (
                                <StyledTableRow key={row.id}>
                                  <StyledTableCell component="th" scope="row">
                                    {row.item?.type}
                                  </StyledTableCell>
                                  <StyledTableCell align="left">
                                    {row.from?.state + "/" + row.from?.lga}
                                  </StyledTableCell>
                                   <StyledTableCell align="left">
                                    {row.to?.state + "/" + row.to?.lga}
                                  </StyledTableCell>
                                  <StyledTableCell align="left">
                                    {row.createdAt}
                                  </StyledTableCell>
                                   <StyledTableCell align="left">
                                     <span className={[dashboard["badge"], dashboard["badge--secondary"]].join(' ')}>{row.status}</span>  
                                  </StyledTableCell>
                                  <StyledTableCell align="right">
                                 <StyledTableCell component="th" align="right">
                                  
                  <IconButton onClick={() => handleViewDetails(row.id)}>
                    <PreviewIcon sx={{ color: "#018965", fontSize: 30 }} />
                  </IconButton>
                          </StyledTableCell>
                                  </StyledTableCell>
                                </StyledTableRow>
                              ))}
                            </TableBody>
                            <TableFooter>
                              <TableRow>
                                <TablePagination
                                  rowsPerPageOptions={[
                                    5,
                                    10,
                                    25,
                                    { label: "All", value: -1 },
                                  ]}
                                  colSpan={3}
                                  count={rows.length}
                                  rowsPerPage={rowsPerPage}
                                  page={page}
                                  slotProps={{
                                    select: {
                                      inputProps: {
                                        "aria-label": "rows per page",
                                      },
                                      native: true,
                                    },
                                  }}
                                  onPageChange={handleChangePage}
                                  onRowsPerPageChange={handleChangeRowsPerPage}
                                  ActionsComponent={TablePaginationActions}
                                  sx={{
                                    "& .MuiTablePagination-toolbar": {
                                      fontSize: 18,
                                    }, // Adjust font size
                                    "& .MuiTablePagination-selectLabel": {
                                      fontSize: 14,
                                    },
                                    "& .MuiTablePagination-input": {
                                      fontSize: 18,
                                    },
                                    "& .MuiTablePagination-displayedRows": {
                                      fontSize: 14,
                                    },
                                  }}
                                />
                              </TableRow>
                            </TableFooter>
                          </Table>
                        </TableContainer>
              </div>
            </Box>
          </Box>
        </ClickAwayListener>
      )}
    </>
  );
};

export default CustomerOnTransit;

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
