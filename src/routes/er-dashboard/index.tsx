import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";
import ErDashboardTable from "./components/er-dashboard-table.tsx";
import Pagination from "../../components/pagination.tsx";
import { getErVisits } from "../../data/visits.ts"; // Assume there's a similar data fetching function

const ErDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [erData, setErData] = useState<any>({});
  const query = searchParams.get("query") || "";

  const fetchErData = async () => {
    const page = parseInt(searchParams.get("page") || "1");
    const perPage = 9;
    const queryParam = searchParams.get("query") || "";
    const erData = await getErVisits(page, perPage, queryParam);
    setErData(erData);
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
    fetchErData();
  }, [searchParams]);

  return (
    <div className="p-6">
      <ErDashboardTable
        patients={erData.data}
        onChange={handleQueryChange}
        searchQuery={query}
        refreshData={fetchErData}
      />
      <Pagination
        currentPage={parseInt(searchParams.get("page") || "1")}
        totalItems={erData.total}
        itemsPerPage={8}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ErDashboard;
