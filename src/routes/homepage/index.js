import React, { useState } from "react";

const Homepage = () => {
  const [now] = useState(new Date());
  const formattedDate = formatDate(now);

  return (
    <>
      <div className="flex">
        <h1 className="md:text-3xl lg:text-4xl text-2xl font-bold mt-10 mr-1">
          Good morning!
        </h1>
        <h1 className="md:text-3xl lg:text-4xl text-2xl font-bold text-gray-600 mt-10">
          Today is {formattedDate}.
        </h1>
      </div>

      <div className="flex mt-8">
        <button className="bg-white rounded-md w-80 h-30 flex items-center px-4 shadow-md mr-6 p-4">
          <img src="/images/dog.png" alt="Dog" className="w-16= h-16 mr-4" />
          <span className="text-xl font-medium">Onboard New Patient</span>
        </button>
        <button className="bg-white rounded-md w-80 h-30 flex items-center px-4 shadow-md p-4">
          <img src="/images/cat.png" alt="Cat" className="w-16 h-16 mr-4" />
          <span className="text-xl font-medium">Intake Patient</span>
        </button>
      </div>
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
