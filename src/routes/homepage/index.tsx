import React, { useState } from "react";
import PatientTable from "./components/patient-table.tsx";
import OnboardModal from "./components/onboard-modal.tsx";
import IntakeModal from "./components/intake-modal.tsx";

const Homepage = () => {
  const [now] = useState(new Date());
  const formattedDate = formatDate(now);

  const [showOnboardModal, setShowOnboardModal] = useState(false);
  const [showIntakeModal, setShowIntakeModal] = useState(false);

  const handleOnboardModal = () => setShowOnboardModal(true);
  const handleIntakeModal = () => setShowIntakeModal(true);

  const handleCloseModal = () => {
    setShowOnboardModal(false);
    setShowIntakeModal(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleCloseModal();
  };

  return (
    <>
      <h1 className="md:text-3xl lg:text-4xl text-2xl font-bold text-gray-600 pt-4">
        Good morning! Today is {formattedDate}.
      </h1>

      <div className="flex mt-8">
        <button
          className="bg-white rounded-md w-80 h-30 flex items-center px-4 shadow-md mr-6 p-4"
          onClick={handleOnboardModal}
        >
          <img src="/images/dog.png" alt="Dog" className="w-16= h-16 mr-4" />
          <span className="text-xl font-medium">Onboard New Patient</span>
        </button>
        <button
          className="bg-white rounded-md w-80 h-30 flex items-center px-4 shadow-md p-4"
          onClick={handleIntakeModal}
        >
          <img src="/images/cat.png" alt="Cat" className="w-16 h-16 mr-4" />
          <span className="text-xl font-medium">Intake Patient</span>
        </button>
      </div>
      <hr className="border-gray-300 my-10" />

      <PatientTable />

      <OnboardModal
        show={showOnboardModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />

      <IntakeModal
        show={showIntakeModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Homepage;

const formatDate = (date) => {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayName = dayNames[date.getDay()];
  const monthName = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${dayName}, ${monthName} ${day}, ${year}`;
};
