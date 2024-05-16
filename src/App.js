import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/layout.tsx";
import Homepage from "./routes/homepage/index.js";
import PatientList from "./routes/patient-list/index";
import ErDashboard from "./routes/er-dashboard/index";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/patient-list" element={<PatientList />} />
          <Route path="/er-dashboard" element={<ErDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
