"use client";

import { fetchVenues_Actions } from "@/app/redux/venue_Slice";
import Header from "@/components/Header";
import Venue_Dialog from "@/components/Venue_Componets/Venue_Dialog";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import getRandomLightColor from "@/constants/random_Color";
import Venue_Calendar from "@/components/Venue_Componets/Venue_Calendar";

export default function Venues() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { all_venues } = useSelector((state) => state.venues);

  const location_Id = pathname.split("/")[2];
  const locationName = pathname.split("/")[3];

  useEffect(() => {
    dispatch(fetchVenues_Actions(location_Id));
  }, [dispatch, location_Id]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Header content={`${locationName}`} />
      </div>
      <div className="flex justify-end items-center gap-4">
        <Venue_Calendar />
        <Venue_Dialog action="create" />
      </div>

      <div>
        {all_venues.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            {all_venues.map((venue) => (
              <div
                key={venue?.venue_id}
                className="max-md:w-[95vw] md:w-[300px]  p-4 rounded-lg h-[200px] border border-black/5 shadow-md flex flex-col items-center justify-center space-y-4"
                style={{ backgroundColor: getRandomLightColor() }}
              >
                <span className="text-xl font-bold capitalize">
                  {venue?.name}
                </span>
                <span className="text-sm bg-mainBg p-4 border border-black/5 rounded-xl shadow-lg font-semibold">
                  80%
                </span>
                <span className="text-sm ">Booked</span>
              </div>
            ))}
          </div>
        ) : (
          <div>No Venues Found </div>
        )}
      </div>
    </div>
  );
}
