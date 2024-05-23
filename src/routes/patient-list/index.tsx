import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";
import PatientListTable from "./components/patient-list-table.tsx";
import Pagination from "../../components/pagination.tsx";
import { getPatients } from "../../data/pet.ts";

const PatientList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [patientData, setPatientData] = useState<any>({});
  const query = searchParams.get("query") || "";

  const fetchPatients = async () => {
    const page = parseInt(searchParams.get("page") || "1");
    const perPage = 8;
    const queryParam = searchParams.get("query") || "";
    const patientsData = await getPatients(page, perPage, queryParam);
    setPatientData(patientsData);
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
    fetchPatients();
  }, [searchParams]);

  return (
    <div className="p-6">
      <PatientListTable
        patients={patientData.pets}
        onChange={handleQueryChange}
        searchQuery={query}
      />
      <Pagination
        currentPage={parseInt(searchParams.get("page") || "1")}
        totalItems={patientData.total}
        itemsPerPage={8}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PatientList;
