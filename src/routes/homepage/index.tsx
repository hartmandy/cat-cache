import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
import PatientTable from "./components/patient-table.tsx";
import OnboardModal from "./components/onboard-modal.tsx";
import IntakeModal from "./components/intake-modal.tsx";
import { getVisits } from "../../data/visits.ts";
import Pagination from "../../components/pagination.tsx";

const Homepage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showOnboardModal, setShowOnboardModal] = useState(false);
  const [showIntakeModal, setShowIntakeModal] = useState(false);
  const [visitData, setVisitData] = useState<any>({});
  const query = searchParams.get("query") || "";

  const formattedDate = formatDate(new Date());

  const handleOnboardModal = () => setShowOnboardModal(true);
  const handleIntakeModal = () => setShowIntakeModal(true);

  const handleCloseModal = () => {
    setShowOnboardModal(false);
    setShowIntakeModal(false);
  };

  const fetchVisits = async () => {
    const page = parseInt(searchParams.get("page") || "1");
    const perPage = 8;
    const queryParam = searchParams.get("query") || "";
    const visitsData = await getVisits(page, perPage, queryParam);
    setVisitData(visitsData);
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString(), query });
  };

  const debouncedSetSearchParams = useCallback(
    debounce((newQuery) => {
      setSearchParams({ page: "1", query: newQuery });
    }, 500),
    []
  );

  const handleQueryChange = (e) => {
    const newQuery = e.target.value;
    debouncedSetSearchParams(newQuery);
  };

  useEffect(() => {
    fetchVisits();
  }, [searchParams]);

  return (
    <>
      <div className="items-center flex justify-between p-6">
        <div>
          <div className="text-gray-500 text-sm">Today is {formattedDate}</div>
          <h1 className="md:text-3xl lg:text-4xl text-2xl font-bold text-gray-600">
            Good Morning!
          </h1>
        </div>
        <div className="flex">
          <button
            className="text-slate-200 bg-[#2a2f38] border rounded-md w-80 flex items-center px-4 shadow-md mr-6 p-4 hover:scale-105 transition-transform duration-150"
            onClick={handleOnboardModal}
          >
            <img src="/images/dog.png" alt="Dog" className="w-10 h-10 mr-4" />
            <span className="text-xl font-medium">Onboard New Patient</span>
          </button>
          <button
            className="text-slate-200 bg-[#2a2f38] border rounded-md w-80 flex items-center px-4 shadow-md p-4 hover:scale-105 transition-transform duration-150"
            onClick={handleIntakeModal}
          >
            <img src="/images/cat.png" alt="Cat" className="w-10 h-10 mr-4" />
            <span className="text-xl font-medium">Intake Patient</span>
          </button>
        </div>
      </div>
      <hr className="border-slate-200" />

      <div className="p-6">
        <PatientTable
          visits={visitData.visits}
          onChange={handleQueryChange}
          searchQuery={query}
        />
        <Pagination
          currentPage={parseInt(searchParams.get("page") || "1")}
          totalItems={visitData.total}
          itemsPerPage={8}
          onPageChange={handlePageChange}
        />
      </div>
      <OnboardModal
        show={showOnboardModal}
        onClose={handleCloseModal}
        onSubmit={fetchVisits}
      />

      <IntakeModal
        show={showIntakeModal}
        onClose={handleCloseModal}
        onSubmit={fetchVisits}
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
