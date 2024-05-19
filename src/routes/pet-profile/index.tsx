import React, { useState, useEffect } from "react";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { NavLink } from "react-router-dom";
import ProfileTable from "./profile-table.tsx";
import { getVisits } from "../../data/visits.ts";

export default function PetProfile() {
  const [visits, setVisits] = useState<any[]>([]);

  useEffect(() => {
    fetchVisits();
  }, []);

  const fetchVisits = async () => {
    const visitsData = await getVisits();
    setVisits(visitsData);
  };

  return (
    <>
      <div className="items-center flex justify-between p-6">
        <div>
          <NavLink to=".." className="text-gray-500 text-sm flex gap-2 pb-2">
            <ArrowLeftIcon /> Go back
          </NavLink>
          <h1 className="md:text-3xl lg:text-4xl text-2xl font-bold text-gray-600">
            Pet Name
          </h1>
          <div className="text-gray-500 text-sm">Pet Type | Pet Breed</div>
          <div className="text-gray-500 text-sm">
            Owner Name | Owner Contact
          </div>
        </div>
      </div>
      <hr className="border-slate-200" />

      <div className="p-6">{/* <ProfileTable visits={visits} /> */}</div>
    </>
  );
}
