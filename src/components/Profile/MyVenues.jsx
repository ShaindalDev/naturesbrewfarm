import React, { useState } from "react";
//context

//components
import MyVenue from "./MyVenue";
//Loader
import { SpinnerDotted } from "spinners-react";

const Venues = ({ data }) => {
  // eslint-disable-next-line
  const [loading, setisLoading] = useState(false);
  if (!data) {
    return <h1>There is no Venues to display!</h1>;
  }
  return (
    <section id='myVenues' className='py-24'>
      {/* overlay */}
      {loading && (
        <div className='h-screen fixed bottom-0 top-0 bg-black/90 w-full z-50 flex justify-center items-center'>
          <SpinnerDotted color='white' />
        </div>
      )}
      <div className='container mx-auto lg:px-0'>
        <div className='text-center'>
          <div className='font-tertiarty uppercase text-[15px] tracking-[6px]'>
            Your venues
          </div>
          <h2 className='font-primary text-[45px] mb-4'>Apartments & Cabins</h2>
        </div>
        {/* grid */}
        <div className='grid grid-cols-1 max-w-sm mx-auto gap-[30px] lg:grid-cols-3 lg:max-w-none lg:mx-0'>
          {data.map((venue) => {
            return <MyVenue venue={venue} key={venue.id} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Venues;
