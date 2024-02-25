import React from "react";
import { changeTimeFormat } from "../../js/changeTimeFormat";

import {
  CalendarIcon,
  UsersIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/20/solid";

const MyBookings = ({ data }) => {

  if (!data) {
    
    return <h1>There is no data to display!</h1>;
  }

  return (
    <section id="myBookings" className="mt-12 py-12 border-y solid">
      <h2 className="m-3 text-base font-semibold leading-6 text-gray-900">
        Upcoming bookings
      </h2>
      <div className="grid grid-cols-4 gap-y-8 divide-y divide-gray-300">
        {data.map((bookings) => (
          <>
            <div className="col-span-1 pl-3">
              <img src={bookings.venue.media[0]} alt="" />
            </div>
            <div className="col-span-2 pl-3 py-5">
              <div className="justify-content-between flex gap-2">
                <div>
                  <CalendarIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <span>
                  <time dateTime={changeTimeFormat(bookings.dateFrom)}>
                    {changeTimeFormat(bookings.dateFrom)} to{" "}
                    {changeTimeFormat(bookings.dateTo)}
                  </time>
                </span>
              </div>
            </div>
            <div className="col-span-1 py-5 pl-1 pr-4">
              <div className="justify-content-between flex gap-2">
                <div>
                  <CurrencyDollarIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <span>{bookings.venue.price}</span>
                <UsersIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span>{bookings.guests}</span>
              </div>
            </div>
          </>
        ))}
      </div>
    </section>
  );
};

export default MyBookings;
