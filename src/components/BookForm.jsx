import React, { useContext } from "react";
//components
import AdultsDropdown from "./AdultsDropdown";
import KidsDropdown from "./KidsDropdown";
import CheckIn from "./CheckIn";
import CheckOut from "./CheckOut";
import { VenueContext } from "../context/VenueContext";
import useVenues from "../hooks/useVenues";

const BookForm = () => {
  const { handleClick } = useContext(VenueContext);
  // eslint-disable-next-line
  const { data, isLoading } = useVenues();

  return (
    <form className='h-[300px] w-full lg:h-[70px] '>
      <div className='flex flex-col w-full h-full lg:flex-row'>
        <div className='flex-1 border-r'>
          <CheckIn />
        </div>
        <div className='flex-1 border-r'>
          <CheckOut />
        </div>
        <div className='flex-1 border-r'>
          <AdultsDropdown />
        </div>
        <div className='flex-1 border-r'>
          <KidsDropdown />
        </div>
        <button
          onClick={(e) => handleClick(e)}
          type='submit'
          className='btn btn-primary'
        >
          Check now
        </button>
      </div>
    </form>
  );
};

export default BookForm;
