import dashboard from '../style/dashboard/CustomerDashboard.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllDrivers } from "../../redux/reducer/driverSlice";
import Loading from '../Chunks/loading';
import { IconButton } from "@mui/material";
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

// Import for dashboard Below

import React from "react";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import navbar from '../style/dashboard/CustomerDashboard.module.css';
import { Menu as MenuIcon, Close as CloseIcon, Cancel } from "@mui/icons-material";
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';


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


const AssignVehicle = () => {

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
            
              const profilePopup  = (event) => {
                setAnchorProfile(anchorProfile ? null : event.currentTarget);
              };
            
              const openProfile = Boolean(anchorProfile);
              const idProfile = openProfile ? 'simple-popper' : undefined;
            
              const handleClickAway = () => {
                  setAnchorProfile(null);
              };
            
            
              // ABOVE IS DRAWER LOGIC BELOW IS THE APP LOGIC.........................................................................................
            




      const driverState = useSelector((state) => state.drivers);
      const { drivers,  fetchingStatus } = driverState;
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
  

    useEffect(() => {
      if (fetchingStatus === 'idle') {
       fetchData();
      }
     
    }, [location.pathname]);

    const fetchData = () => {
        dispatch(getAllDrivers());
    }


    const navigateToAddVehicle = (driverId) => {
      navigate(`/driver/add-vehicle/${driverId}`);
    }


    
const logout = () => {
localStorage.removeItem('token');
navigate("/school/login")
localStorage.setItem('authenticated', JSON.stringify(authenticated));
}

    return (

        <>
          {
            fetchingStatus === 'loading' ? (<Loading/>) : (

                  <ClickAwayListener onClickAway={handleClickAway}>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Navbar */}
      <AppBar position="fixed" sx={{ zIndex: 2, background: "white", color: "#0e387a" }}>
        <Toolbar sx={{ zIndex: 2, display: "flex", justifyContent: "space-between" }}>
          {!isLargeScreen && (
            <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
              <MenuIcon sx={{ color: "inherit", fontSize: 30 }} />
            </IconButton>
          )}
          

         
          <div>
 
          {/** Profile Setup */}
          
          <IconButton onClick={profilePopup}    sx={{
          backgroundColor: "#0e387a", // Custom background
          "&:hover": {
            backgroundColor: "#0c3371"
          }
        }}
      
        >

          <PersonOutlineOutlinedIcon
          sx={{ color: "white", fontSize: 25 }} // fontSize in px
          />
          </IconButton>

          <BasePopup sx={{zIndex: 2 }}   id={idProfile} open={openProfile} anchor={anchorProfile}>
          <div className={navbar['profile--selection__container']}>
          <div className={navbar['profile']}>
           <a href="/customer/customer-profile" className={[navbar['link--profile'], navbar['']].join(' ')}>Profile</a>
          </div>
          <div className={navbar['logout']}>
           <a onClick={logout} className={[navbar['link--profile'], navbar['']].join(' ')}>Logout</a>
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
          }
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
          <a className={[navbar["logo__link"], navbar["logo"]].join(' ')} href="#"><img src="/images/logo.png" alt="miqwii logo"/></a>
          </Box>

          {/* Close Button */}
          {!isLargeScreen && (
            <IconButton  onClick={toggleDrawer}>
              <Cancel sx={{ color: "#0e387a", fontSize: 30 }} />
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
                          href="/admin/home"
                          className={[navbar["link--drawer"], navbar[""]].join(" ")}
                        >
                          Home
                        </a>
                     
                      </div>
                    </div>
    
                    {/* Customer Navbar Content */}
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleChevron("chevron-1")}
                      className={[
                        navbar["collapsible"],
                        navbar[
                          activeChevron === "chevron-1"
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
                            <use href="../images/sprite.svg#customer"></use>
                          </svg>
                          <p className={navbar["collapsible__heading"]}>Customers</p>
                        </div>
    
                        <span
                          onClick={() => toggleChevron("chevron-1")}
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
                          href="/customer/view-customers"
                          className={[navbar["link--drawer"], navbar[""]].join(" ")}
                        >
                          View Customers
                        </a>
                   
                      </div>
                    </div>
    
                    {/* Driver Navbar Content */}
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleChevron("chevron-2")}
                      className={[
                        navbar["collapsible"],
                        navbar[
                          activeChevron === "chevron-2"
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
                            <use href="../images/sprite.svg#driver"></use>
                          </svg>
                          <p className={navbar["collapsible__heading"]}>Drivers</p>
                        </div>
    
                        <span
                          onClick={() => toggleChevron("chevron-2")}
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
                          href="/driver/view-drivers"
                          className={[navbar["link--drawer"], navbar[""]].join(" ")}
                        >
                          View Drivers
                        </a>
                        <a
                          href="/driver/assign-vehicle"
                          className={[navbar["link--drawer"], navbar[""]].join(" ")}
                        >
                         Assign Vehicle
                        </a>
                      
                       
                      </div>
                    </div>
    
                    {/* Vehicle Navbar Content */}
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleChevron("chevron-3")}
                      className={[
                        navbar["collapsible"],
                        navbar[
                          activeChevron === "chevron-3"
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
                            <use href="../images/sprite.svg#vehicle"></use>
                          </svg>
                          <p className={navbar["collapsible__heading"]}>Vehicles</p>
                        </div>
    
                        <span
                          onClick={() => toggleChevron("chevron-3")}
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
                          href="/vehicle/view-vehicles"
                          className={[navbar["link--drawer"], navbar[""]].join(" ")}
                        >
                          View Vehicles
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
                          href="/delivery/on-transit"
                          className={[navbar["link--drawer"], navbar[""]].join(" ")}
                        >
                          On Transit 
                        </a>
    
    
              <a
                          href="/delivery/awaiting-transit"
                          className={[navbar["link--drawer"], navbar[""]].join(" ")}
                        >
                          Awaiting Transit
                        </a>
    
                        <a
                          href="/delivery/delivered"
                          className={[navbar["link--drawer"], navbar[""]].join(" ")}
                        >
                          Delivered
                        </a>
    
    
                          <a
                          href="/delivery/pending"
                          className={[navbar["link--drawer"], navbar[""]].join(" ")}
                        >
                          Pending
                        </a>
    
                          <a
                          href="/delivery/view-all-delivery"
                          className={[navbar["link--drawer"], navbar[""]].join(" ")}
                        >
                          View All Deliveries
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
    
                    {/* Payment Navbar Content */}
                      <div
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleChevron("chevron-7")}
                      className={[
                        navbar["collapsible"],
                        navbar[
                          activeChevron === "chevron-7"
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
                            <use href="/images/sprite.svg#fee"></use>
                          </svg>
                          <p className={navbar["collapsible__heading"]}>
                            Payments
                          </p>
                        </div>
    
                        <span
                          onClick={() => toggleChevron("chevron-7")}
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
                          href="/payment/paid-deliveries"
                          className={[navbar["link--drawer"], navbar[""]].join(" ")}
                        >
                          Paid Deliveries
                        </a>
             <a
                          href="/payment/unpaid-deliveries"
                          className={[navbar["link--drawer"], navbar[""]].join(" ")}
                        >
                          Unpaid Deliveries
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
             fontSize: 18,
             overflowX: 'auto',
             width: '100%',
             color: '#9a99ac',
             transition: "margin-left 0.3s ease-in-out",
           }}
         >
  <div className={dashboard['secondary--container']}>
        
            <div class={[dashboard['grid'], dashboard['grid--1x3']].join(' ')}>
  
              {
                drivers.map((driver, index) => (
                  <>
  
  <div class={[dashboard['card--view'], dashboard[index % 2 === 0 ? 'card--primary' : 'card--secondary']].join(' ')}>
              <div class={dashboard['card_body']}>
  
              <span class={dashboard['icon-container']}>
                      <svg class={[dashboard['icon--big'], dashboard['icon--primary']].join(' ')}>
                          <use href="../images/sprite.svg#driver"></use>
                        </svg>
                  </span>
  
                  <div class={dashboard['card--small-head']}>
       {"Driver"}
      
       </div>
  
       <p>    {driver.profile?.firstname + " " + driver.profile?.surname + " " +  driver.profile?.lastname}</p>
            
              </div>
              <div onClick={() => navigateToAddVehicle(driver.id)} class={dashboard['card_footer']}>Assign Vehicle</div>
              </div>
                  </>
                ))
              }
          
            </div>
               
        
  
           </div>

             
       
      </Box>

    </Box>

     
    </ClickAwayListener> 
            )
          }
        </>
       
    

    );

}

export default AssignVehicle;