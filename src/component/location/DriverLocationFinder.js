import React, { useState, useEffect, useRef, useCallback } from 'react';
import dashboard from "../style/dashboard/CustomerDashboard.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Box, Paper } from "@mui/material";
import { useDispatch } from 'react-redux';
import { updateMovementLocation } from '../../redux/reducer/movementSlice';

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Component to update map center when location changes
const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 13);
    }
  }, [center, map]);
  return null;
};

const DriverLocationIdentifier = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationInfo, setLocationInfo] = useState(null);
  const [locationPermission, setLocationPermission] = useState('prompt');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLocationPrompt, setShowLocationPrompt] = useState(true);
  const [isTracking, setIsTracking] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState(null);
  const [nextUpdateIn, setNextUpdateIn] = useState(null);
  const [updateStatus, setUpdateStatus] = useState('');

  // Refs to store intervals and watch ID
  const watchIdRef = useRef(null);
  const updateIntervalRef = useRef(null);
  const geocodeIntervalRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const dispatch = useDispatch();

  // Configuration for update intervals (in milliseconds)
  const DB_UPDATE_INTERVAL = 3 * 60 * 1000; // 3 minutes
  const GEOCODE_INTERVAL = 2 * 60 * 1000; // 2 minutes

  // Check location permission status
  const checkLocationPermission = async () => {
    if ('permissions' in navigator) {
      try {
        const permission = await navigator.permissions.query({ name: 'geolocation' });
        setLocationPermission(permission.state);

        permission.addEventListener('change', () => {
          setLocationPermission(permission.state);
        });
      } catch (error) {
        console.log('Permission API not supported');
      }
    }
  };

  // Reverse geocode using Nominatim
  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'LocationTrackerApp/1.0'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.address) {
        return {
          place_id: data.place_id,
          display_name: data.display_name,
          address: {
            house_number: data.address.house_number,
            road: data.address.road,
            suburb: data.address.suburb || data.address.neighbourhood,
            city: data.address.city || data.address.town || data.address.village,
            lga: data.address.county || data.address.local_government_area,
            state: data.address.state,
            postcode: data.address.postcode,
            country: data.address.country,
            country_code: data.address.country_code
          },
          coordinates: {
            latitude: parseFloat(data.lat),
            longitude: parseFloat(data.lon)
          },
          type: data.type,
          class: data.class,
          importance: data.importance
        };
      }
      return null;
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
      throw error;
    }
  };

  // Update database with location
  const updateDatabase = useCallback(async (location, addressInfo) => {
    if (location?.lat && location?.lng) {
      dispatch(updateMovementLocation({
        latitude: location.lat,
        longitude: location.lng
      }));
      setLastUpdateTime(new Date());
    }
  }, [dispatch]);

  // Handle location update
  const handleLocationUpdate = useCallback((position) => {
    const { latitude, longitude, accuracy } = position.coords;
    const newLocation = {
      lat: latitude,
      lng: longitude,
      accuracy: accuracy,
      timestamp: position.timestamp
    };

    console.log('📍 Location updated:', newLocation);
    setUserLocation(newLocation);
    setShowLocationPrompt(false);
  }, []);

  // Start countdown timer
  const startCountdown = useCallback(() => {
    let secondsLeft = DB_UPDATE_INTERVAL / 1000;

    const updateCountdown = () => {
      secondsLeft -= 1;
      if (secondsLeft <= 0) {
        secondsLeft = DB_UPDATE_INTERVAL / 1000;
      }

      const minutes = Math.floor(secondsLeft / 60);
      const seconds = secondsLeft % 60;
      setNextUpdateIn(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    };

    updateCountdown();
    countdownIntervalRef.current = setInterval(updateCountdown, 1000);
  }, [DB_UPDATE_INTERVAL]);

  // Start location tracking
  const startTracking = useCallback(async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    console.log('🚀 Starting location tracking...');
    setLoading(true);
    setError(null);
    setIsTracking(true);

    // Watch position with high accuracy
    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        handleLocationUpdate(position);
        if (loading) setLoading(false);
      },
      (error) => {
        setLoading(false);
        let errorMessage;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location access.";
            setLocationPermission('denied');
            setIsTracking(false);
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
          default:
            errorMessage = "An unknown error occurred.";
            break;
        }
        setError(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0
      }
    );

    // Get initial location and geocode it
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        const initialLocation = {
          lat: latitude,
          lng: longitude,
          accuracy: accuracy,
          timestamp: position.timestamp
        };

        setUserLocation(initialLocation);

        try {
          const locationData = await reverseGeocode(latitude, longitude);
          setLocationInfo(locationData);

          // Initial database update
          console.log('📊 Performing initial database update...');
          await updateDatabase(initialLocation, locationData);
        } catch (error) {
          console.error('Initial geocoding failed:', error);
        }

        setLoading(false);
      },
      (error) => {
        console.error('Initial position error:', error);
        setLoading(false);
      }
    );

    // Start countdown
    startCountdown();

  }, [handleLocationUpdate, loading, updateDatabase, startCountdown]);

  // Setup intervals after we have location
  useEffect(() => {
    if (!isTracking || !userLocation) return;

    console.log('⏰ Setting up intervals...');

    // Set up interval for geocoding (every 2 minutes)
    geocodeIntervalRef.current = setInterval(async () => {
      console.log('🗺️ Running periodic geocode...');
      if (userLocation) {
        try {
          const locationData = await reverseGeocode(userLocation.lat, userLocation.lng);
          setLocationInfo(locationData);
          console.log('✅ Geocode completed');
        } catch (error) {
          console.error('❌ Periodic geocoding failed:', error);
        }
      }
    }, GEOCODE_INTERVAL);

    // Set up interval for database updates (every 3 minutes)
    updateIntervalRef.current = setInterval(async () => {
      console.log('💾 Running periodic database update...');
      if (userLocation) {
        await updateDatabase(userLocation, locationInfo);
      }
    }, DB_UPDATE_INTERVAL);

    console.log('✅ Intervals set up successfully', {
      geocodeInterval: geocodeIntervalRef.current,
      updateInterval: updateIntervalRef.current
    });

    return () => {
      if (geocodeIntervalRef.current) {
        clearInterval(geocodeIntervalRef.current);
      }
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
    };
  }, [isTracking, userLocation, locationInfo, updateDatabase, GEOCODE_INTERVAL, DB_UPDATE_INTERVAL]);

  // Stop location tracking
  const stopTracking = useCallback(() => {
    console.log('🛑 Stopping location tracking...');

    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    if (updateIntervalRef.current) {
      clearInterval(updateIntervalRef.current);
      updateIntervalRef.current = null;
    }

    if (geocodeIntervalRef.current) {
      clearInterval(geocodeIntervalRef.current);
      geocodeIntervalRef.current = null;
    }

    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }

    setIsTracking(false);
    setNextUpdateIn(null);
    console.log('✅ Tracking stopped');
  }, []);

  // Toggle tracking
  const toggleTracking = () => {
    if (isTracking) {
      stopTracking();
    } else {
      startTracking();
    }
  };

  // Cleanup on unmount
useEffect(() => {
  if (!isTracking) return;

  // set up intervals
  geocodeIntervalRef.current = setInterval(() => {
    console.log("⏱ geocode tick");
    // you can use latest location from store here
  }, GEOCODE_INTERVAL);

  updateIntervalRef.current = setInterval(() => {
    console.log("⏱ updating DB...");
    updateDatabase(); // will run every 3 min
  }, DB_UPDATE_INTERVAL);

  console.log("✅ Intervals set up");

  // clean up when tracking stops or component unmounts
  return () => {
    clearInterval(geocodeIntervalRef.current);
    clearInterval(updateIntervalRef.current);
  };
}, [isTracking]); // ✅ only re-run if tracking toggles


  const coordinatePosition = userLocation
    ? [userLocation.lat, userLocation.lng]
    : [51.505, -0.09];

  const renderMap = () => (
    <MapContainer
      center={coordinatePosition}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "400px", width: "100%", borderRadius: "8px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {userLocation && (
        <>
          <Marker position={coordinatePosition}>
            <Popup>
              Your current location
              <br />
              Lat: {userLocation.lat ? userLocation.lat.toFixed(6) : "N/A"}
              <br />
              Lng: {userLocation.lng ? userLocation.lng.toFixed(6) : "N/A"}
            </Popup>
          </Marker>
          <MapUpdater center={coordinatePosition} />
        </>
      )}
    </MapContainer>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className={[dashboard["card--confirmation"], dashboard["card--primary"]].join(" ")}>
          <div className={dashboard["card_body"]}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                zIndex: 1
              }}
              className={dashboard["card--small-head"]}
            >
              <button
                onClick={toggleTracking}
                disabled={loading}
                className={[
                  dashboard["btn"],
                  dashboard["btn--block"],
                  isTracking ? dashboard["btn--secondary"] : dashboard["btn--primary"],
                ].join(" ")}
              >
                {loading ? 'Getting Location...' : isTracking ? 'Stop Tracking' : 'Start Tracking'}
              </button>
              {/* Removed Update Now button */}
            </div>
          </div>
        </div>

        {/* Tracking Status */}
        {isTracking && (
            <div>
                <p className={{fontSize: "10px"}}>
                  🟢 Location Tracking Active
                </p>
                <p className={{}}>
                  Your location is being tracked. 
                </p>
        
          </div>
        )}



        
        {/* Tracking Status */}
        {isTracking && (
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
                                     <use href="../images/sprite.svg#location"></use>
                                   </svg>
                                 </span>
         
                                 
                                     {nextUpdateIn && (
                  <span
                                   class={[dashboard["badge"], dashboard[""]].join(" ")}
                                 >
                     {nextUpdateIn}
                   </span>
                )}
                               
                               </div>
                               Next Update
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
                                     <use href="../images/sprite.svg#location"></use>
                                   </svg>
                                 </span>
         
                                
                                  {lastUpdateTime && (
                   <span
                   class={[dashboard["badge"], dashboard[""]].join(" ")}
                   >
                 {lastUpdateTime.toLocaleTimeString()}
                  </span>
                )}
                                
                               </div>
                               Last Update Time
                             </div>
                           </div>
         
                         </div>
        )}





        {/* Location Permission Prompt */}
        {showLocationPrompt && locationPermission !== 'granted' && !isTracking && (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <div className="flex items-center">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-blue-800">
                  Location Access Required
                </h3>
                <p className="mt-1 text-sm text-blue-700">
                  Please enable location access to start tracking your location.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div>
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
                {locationPermission === 'denied' && (
                  <p className="mt-2 text-xs text-red-600">
                    To enable location: Go to your browser settings → Privacy & Security → Site Settings → Location
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Identifying your location...</p>
          </div>
        )}

        {/* Location Information Display */}
        {userLocation && locationInfo && (
          <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg p-6 mb-6">
            {renderMap()}

               <div style={{ width: "100%" }}>
                                  <Box sx={{ overflowX: "auto", width: "100%" }}>
                                    <TableContainer component={Paper} sx={{ marginTop: 1 }}>
                                      <Table
                                        sx={{ minWidth: 650 }}
                                        aria-label="simple table"
                                      >
                                        
                                        <TableBody>
                                         
                                            <StyledTableRow >
                                              <StyledTableCell component="th" scope="row">
                                                  {locationInfo.address.road && (
                                                    <div>
                                                        <span className="font-medium">Street:</span>
                                                        <span className="ml-2">{locationInfo.address.road}</span>
                                                    </div>
                                                    )}
                                              </StyledTableCell>
                                              <StyledTableCell align="left">
                                                  {locationInfo.address.suburb && (
                                                    <div>
                                                        <span className="font-medium">Area/Suburb:</span>
                                                        <span className="ml-2">{locationInfo.address.suburb}</span>
                                                    </div>
                                                    )}
                                              </StyledTableCell>
                                               <StyledTableCell align="left">
                                                  {locationInfo.address.city && (
                                                    <div>
                                                        <span className="font-medium">City:</span>
                                                        <span className="ml-2">{locationInfo.address.city}</span>
                                                    </div>
                                                    )}
                                              </StyledTableCell>
                                              <StyledTableCell align="left">
                                                {locationInfo.address.lga && (
                                                <div>
                                                    <span className="font-medium">LGA/County:</span>
                                                    <span className="ml-2">{locationInfo.address.lga}</span>
                                                </div>
                                                )}
                                              </StyledTableCell>

                                               <StyledTableCell align="left">
                                               {locationInfo.display_name}
                                              </StyledTableCell>
                                                <StyledTableCell component="th" scope="row">
                                               Latitude: {userLocation.lat.toFixed(6)}, Longitude: {userLocation.lng.toFixed(6)}
                                              </StyledTableCell>
                                            </StyledTableRow>
                                  
                                        </TableBody>
                                      </Table>
                                    </TableContainer>
            
                                    <div
                                      class={[
                                        dashboard["card--add"],
                                        dashboard["card--primary"],
                                      ].join(" ")}
                                    >
                                      <div class={dashboard["card_body"]}>
                                        <div class={dashboard["card--small-head"]}>
                                        </div>
                                      </div>
                                    </div>
                                  </Box>
                                </div>
          </div>
        )}

        {/* If user location but no address yet */}
        {userLocation && !locationInfo && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-sm text-yellow-700">
              Location coordinates obtained. Reverse geocoding in progress...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverLocationIdentifier;
