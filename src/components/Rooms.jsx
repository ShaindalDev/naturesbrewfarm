import React from "react";
//context
import useVenues from "../hooks/useVenues";
//components
import Venue from "./Room";
//Loader
import { SpinnerDotted } from "spinners-react";

const Venues = () => {
  const { data, isLoading } = useVenues();

  return (
    <section id='myVenues' className='py-24'>
      {/* overlay */}
      {isLoading && (
        <div className='h-screen fixed bottom-0 top-0 bg-black/90 w-full z-50 flex justify-center items-center'>
          <SpinnerDotted color='white' />
        </div>
      )}
      <div className='container mx-auto lg:px-0'>
        <div className='text-center'>
          <div className='font-tertiarty uppercase text-[15px] tracking-[6px]'>
            Luxury for rent Holidayze
          </div>
          <h2 className='font-primary text-[45px] mb-4'>Apartments & Cabins</h2>
        </div>
        {/* grid */}
        <div className='grid grid-cols-1 max-w-sm mx-auto gap-[30px] lg:grid-cols-3 lg:max-w-none lg:mx-0'>
          {data?.map((venue) => {
            return <Venue venue={venue} key={venue.id} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Venues;
