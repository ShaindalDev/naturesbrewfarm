import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
//scroll to component
import ScrollToTop from "../components/ScrollToTop";
import VenueFacilities from "../components/Venue/Facilities";
import BookingSection from "../components/Venue/BookingSection";
import VenueMediaGallery from "../components/Venue/VenueMediaGallery";
import VenueMainMedia from "../components/Venue/VenueMainMedia";
import VenueDescription from "../components/Venue/VenueDescription";
//context
import { VenueContext } from "../context/VenueContext";

const RoomDetails = () => {
  useEffect(() => {
    document.title = "Holidaze | Details";
  }, []);

  const { venues } = useContext(VenueContext);

  if (venues.length !== 0) {
    window.sessionStorage.setItem("venues", JSON.stringify(venues));
  }
  const stored = JSON.parse(window.sessionStorage.getItem("venues"));

  let { id } = useParams();
  //get room
  const venue = stored.find((venue) => {
    return venue.id === String(id);
  });

  //destructure Venues
  const { name, description, maxGuests, meta, media } = venue;
  // console.log(venue.media);

  //destructure meta
  const { wifi, parking, breakfast, pets } = meta;

  return (
    <section>
      <ScrollToTop />
      <div className='bg-room bg-cover h-[560px] bg-center relative flex justify-center items-center'>
        <div className='absolute w-full h-full bg-black/70'></div>
        <h1 className='text-6xl text-white z-20 font-primary text-center'>
          {name} Details
        </h1>
      </div>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row h-full py-24'>
          {/* left */}
          <div className='w-full h-full lg:w-[60%] px-6'>
            <VenueDescription name={name} description={description} />
            <VenueMainMedia media={media} />
            <div>
              {/* grid */}
              <VenueFacilities
                wifi={wifi}
                breakfast={breakfast}
                parking={parking}
                pets={pets}
                maxGuests={maxGuests}
              />
            </div>
            <VenueMediaGallery media={media} />
          </div>
          {/* right */}
          {/* <CalenderBooking venueId={venue.id} /> */}
          <BookingSection venueId={venue.id}  />
        </div>
      </div>
    </section>
  );
};

export default RoomDetails;
