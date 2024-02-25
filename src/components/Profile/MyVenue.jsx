import React from "react";
import { Link } from "react-router-dom";
//Tanstack useQuery imports
import useDeleteVenue from "../../hooks/useDeleteVenue";

//icons
import { BsArrowsFullscreen, BsPeople, BsCurrencyDollar } from "react-icons/bs";

const MyVenue = ({ venue }) => {
  const [deleteVenue] = useDeleteVenue();

  const onDelete = async () => {
    await deleteVenue(id);
  };
  //destructure venue
  const { id, name, media, size, maxGuests, description, price } = venue;
  return (
    <div className='bg-white shadow-2xl min-h-[500px] group'>
      {/* img */}
      <div className='overflow-hidden'>
        <img
          className='group-hover:scale-110 transition-all duration-300 w-full aspect-[4/3]'
          src={media[0]}
          alt=''
        />
      </div>
      {/* details */}
      <div
        className='bg-white shadow-lg max-w-[300px] mx-auto h-[60px]
    -translate-y-1/2 flex justify-center items-center uppercase font-tertiary tracking-[1px] font-semibold text-base'
      >
        <div className='flex justify-between w-[80%]'>
          {/* size */}
          <div className='flex items-center gap-x-2'>
            <div className='text-accent'>
              <BsArrowsFullscreen className=' text-[15px]' />
            </div>
            <div className='flex gap-x-1'>
              <div>Size</div>
              <div>{size}m2</div>
            </div>
          </div>
          {/* venue capacity */}
          <div className='flex items-center gap-x-2'>
            <div className='text-accent'>
              <BsPeople className=' text-[18px]' />
            </div>
            <div className='flex gap-x-1'>
              <div>Max people</div>
              <div>{maxGuests}</div>
            </div>
          </div>
        </div>
      </div>
      {/* name & description */}
      <div className='text-center'>
        <Link to={`/room/${id}`}>
          <h3 className='h3'>{name}</h3>
        </Link>
        <p className='max-w-[300px] mx-auto mb-3 lg:mb-6'>
          {description.slice(0, 56)}
        </p>
        <div className='mb-4'>
          <BsCurrencyDollar className='mx-auto justify-center items-center' />
          {price}
        </div>
      </div>
      {/*btn */}
      <Link
        to={`/room/${id}`}
        className='btn btn-secondary mb-3 btn-sm max-w-[150px] mx-auto'
      >
        Edit here
      </Link>
      <button
        onClick={onDelete}
        className='btn btn-secondary mb-3 btn-sm max-w-[150px] mx-auto'
      >
        Delete Venue
      </button>
    </div>
  );
};

export default MyVenue;
