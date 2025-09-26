import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import dashboard from "../style/dashboard/CustomerDashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCountDelivery, getCountPending, getCountDelivered} from "../../redux/reducer/deliveryRequestSlice";


import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { getVehicleCount } from "../../redux/reducer/vehicleSlice";
import { allDriverCount } from "../../redux/reducer/driverSlice";
import { getallCustomerCount } from "../../redux/reducer/customerSlice";


const AdminDemographicsCharts = () => {
 
   const deliveryState = useSelector((state) => state.deliveryRequests);
   const {   countDelivery, countPending, countDelivered ,  fetchingStatus } = deliveryState;


   const driverState = useSelector((state) => state.drivers);
   const { driversCount  } = driverState;

   const customerState = useSelector((state) => state.customers);
   const { allCustomerCount  } = customerState;

   const vehicleState = useSelector((state) => state.vehicles);
   const {  vehicleCount  } = vehicleState;
   
   const dispatch = useDispatch();

  useEffect(() => {
    if (fetchingStatus === "idle") {
      fetchData();
    }
  }, []);

  const fetchData = () => {
    dispatch(getVehicleCount());
    dispatch(allDriverCount());
    dispatch(getallCustomerCount());
    
    dispatch(getCountDelivery());
    dispatch(getCountPending());
    dispatch(getCountDelivered());

  };

  const chartStyle = {
    container: {
      width: "100%",
      backgroundColor: "#f8f9fa",
      padding: "10px",
      fontFamily: "Roboto",
    },
    title: {
      fontSize: "20px",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "0px",
      color: "#018965",
    },
    chartGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
      gap: "10px",
      marginBottom: "0px",
    },
    chartCard: {
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      padding: "0px",
      margin: "0",
    },
    chartTitle: {
      fontSize: "20px",
      fontWeight: "500",
      marginBottom: "0px",
      textAlign: "center",
      color: "#9a99ac",
      fontFamily: "Roboto",
      fontStyle: "italic",
    },
    chartTotal: {
      marginTop: "16px",
      textAlign: "center",
      fontSize: "14px",
      color: "#018965",
    },
    summaryCard: {
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      padding: "10px",
    },
    summaryTitle: {
      fontSize: "15px",
      fontWeight: "500",
      marginBottom: "10px",
      textAlign: "center",
      color: "#018965",
    },
    summaryGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "16px",
    },
    summaryItem: {
      textAlign: "center",
      padding: "16px",
      borderRadius: "8px",
    },
    summaryItemTitle: {
      fontSize: "10px",
      fontWeight: "600",
      marginBottom: "8px",
    },
    summaryItemValue: {
      fontSize: "20px",
      fontWeight: "bold",
    },
  };

  const summaryStyles = {
    students: {
      ...chartStyle.summaryItem,
      backgroundColor: "#e3f2fd",
      color: "#018965",
    },
    staff: {
      ...chartStyle.summaryItem,
      backgroundColor: "#e8f5e8",
      color: "#018965",
    },
    classes: {
      ...chartStyle.summaryItem,
      backgroundColor: "#f3e5f5",
      color: "#018965",
    },
  };
  // Sample data for students by gender
  const driversAndVehicles = [
    { name: "Drivers", value: driversCount, color: "#018965" },
    { name: "Vehicles", value: vehicleCount, color: "#67bd50" },
  ];

  // Sample data for teachers
  const customerAndDelivery = [
  
    { name: "Total Customers", value: allCustomerCount, color: "#12ABA5" },
    { name: "Total Delivery", value: countDelivery, color: "#36e2a0ff" },
  ];

  // Sample data for classes
  const pendingAndDeliveredAndDelivery = [
    { name: "Total Pending", value: countPending, color: "#028766" },
    { name: "Total Delivery", value: countDelivery, color: "#67bd50" },
    { name: "Total Delivered", value: countDelivered, color: "#0cff86ff" },
  ];

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div style={chartStyle.container}>
      <div class={[dashboard["grid"], dashboard["grid--1x3"]].join(" ")}>

        <div style={chartStyle.chartCard}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={driversAndVehicles}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                fontFamily="Roboto"
              >
                {driversAndVehicles.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, ""]} />
              <Legend wrapperStyle={legendStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>

  
        <div style={chartStyle.chartCard}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={customerAndDelivery}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {customerAndDelivery.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, ""]} />
              <Legend wrapperStyle={legendStyle} />
            </PieChart>
          </ResponsiveContainer>
 
        </div>

        {/* Delivery Distribution */}
        <div style={chartStyle.chartCard}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pendingAndDeliveredAndDelivery}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pendingAndDeliveredAndDelivery.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, ""]} />
              <Legend wrapperStyle={legendStyle} />
            </PieChart>
          </ResponsiveContainer>
  
        </div>
      </div>

      {/* Summary Statistics
      <div style={chartStyle.summaryCard}>
        <h2 style={chartStyle.summaryTitle}>School Summary</h2>
        <div style={chartStyle.summaryGrid}>
          <div style={summaryStyles.students}>
            <h3 style={chartStyle.summaryItemTitle}>Total Students</h3>
            <p style={chartStyle.summaryItemValue}>
              {driversAndVehicles.reduce((sum, item) => sum + item.value, 0)}
            </p>
          </div>
          <div style={summaryStyles.staff}>
            <h3 style={chartStyle.summaryItemTitle}>Total Staff</h3>
            <p style={chartStyle.summaryItemValue}>
              {customerAndDelivery.reduce((sum, item) => sum + item.value, 0)}
            </p>
          </div>
          <div style={summaryStyles.classes}>
            <h3 style={chartStyle.summaryItemTitle}>Total Classes</h3>
            <p style={chartStyle.summaryItemValue}>
              {pendingAndDeliveredAndDelivery.reduce((sum, item) => sum + item.value, 0)}
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default AdminDemographicsCharts;

const legendStyle = {
  fontSize: "16px", // Make it larger
  fontWeight: "500", // Make it bolder
  color: "#9a99ac", // Change color
  fontFamily: "Roboto", // Change font family
  margin: "0px",
};
