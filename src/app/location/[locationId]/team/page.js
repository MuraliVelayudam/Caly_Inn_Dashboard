"use client";

import { fetchAllMembers } from "@/app/redux/team_Slice";
import Header from "@/components/Header";
import Team_Create_Dialog from "@/components/Team_Components/Team_Create_Dialog";
import TeamTable from "@/components/Team_Components/Team_Table";
import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Team() {
  const dispatch = useDispatch();
  const { locationId } = useParams();
  const pathName = usePathname();
  const locationName = pathName.split("/")[3];
  const { members } = useSelector((state) => state.members);

  useEffect(() => {
    dispatch(fetchAllMembers(locationId));
  }, [dispatch, locationId]);

  return (
    <div className="space-y-10">
      <div>
        <Header content={`${locationName}`} />
      </div>

      <div className="mt-10 flex items-center justify-between">
        <Team_Create_Dialog action={"create"} locationId={locationId} />
      </div>

      <div>
        <TeamTable members={members} locationId={locationId} />
      </div>
    </div>
  );
}
