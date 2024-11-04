"use client";

import { fetchLeads_Action } from "@/app/redux/lead_Slice";
import Header from "@/components/Header";
import LeadTable from "@/components/Lead_Components/Lead_Table";
import Lead_Create_Dialog from "@/components/Lead_Components/Leads_Create_Dialog";
import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Leads() {
  const pathName = usePathname();
  const locationName = pathName.split("/")[3];
  const { locationId } = useParams();
  const dispatch = useDispatch();
  const { leads } = useSelector((state) => state.leads);

  useEffect(() => {
    dispatch(fetchLeads_Action(locationId));
  }, [dispatch, locationId]);

  return (
    <div className="space-y-10">
      <div>
        <Header content={`${locationName}`} />
      </div>
      <div>
        <Lead_Create_Dialog action={"create"} />
      </div>
      <div className="mt-10">
        <LeadTable leads={leads} locationId={locationId} />
      </div>
    </div>
  );
}
