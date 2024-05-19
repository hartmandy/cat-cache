import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/layout.tsx";
import Homepage from "./routes/homepage/index.tsx";
import PatientList from "./routes/patient-list/index.tsx";
import ErDashboard from "./routes/er-dashboard/index.tsx";
import PetProfile from "./routes/pet-profile/index.tsx";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/patient-list" element={<PatientList />} />
          <Route path="/er-dashboard" element={<ErDashboard />} />
          <Route path="/patient-profile/:id" element={<PetProfile />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
