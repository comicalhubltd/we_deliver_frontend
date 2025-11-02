import React, { useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useDispatch } from 'react-redux';
import { getAllCustomerLocationOnTransit } from '../../redux/reducer/locationSlice';
import CirculerProgressLoader from '../utility/CirculerProgressLoader';

const CustomerLocationIdentifier = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Fetch locations on component mount
  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      try {
        const result = await dispatch(getAllCustomerLocationOnTransit()).unwrap();
        // Assuming result is an array of objects with latitude and longitude
        console.log(result);
        setLocations(result);
      } catch (error) {
        console.error('Failed to fetch locations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [dispatch]);

  // Default center (will center on first location if available)
  const defaultCenter = locations.length > 0 
    ? [locations[0].latitude, locations[0].longitude]
    : [9.05785, 7.49508];

  return (
    <div>
     

        {loading ? (
        <CirculerProgressLoader/>
        ) : (
          <MapContainer
            center={defaultCenter}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "500px", width: "100%", borderRadius: "8px" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright"   >OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {locations.map((location, index) => (
              <Marker 
                key={index} 
                position={[location.latitude, location.longitude]}
              >
                <Popup>
                  Location {index + 1}
                  <br />
                  Lat: {location.latitude.toFixed(6)}
                  <br />
                  Lng: {location.longitude.toFixed(6)}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}

        {!loading && locations.length === 0 && (
          <p className="text-center text-gray-600 mt-4">No locations found</p>
        )}

        {!loading && locations.length > 0 && (
          <p className="text-center text-gray-600 mt-4">
            Showing {locations.length} location{locations.length > 1 ? 's' : ''}
          </p>
        )}
      </div>
    
  );
};

export default CustomerLocationIdentifier;