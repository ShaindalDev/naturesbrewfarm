import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function VenueSearch() {
  const [venues, setVenues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
// eslint-disable-next-line
  const [hasInput, setHasInput] = useState(false);

  useEffect(() => {
    axios
      .get("https://api.noroff.dev/api/v1/holidaze/venues")
      .then((response) => {
        setVenues(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredVenues = venues.filter((venue) =>
    venue.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        className='w-full md:w-60 h-8 p-1 rounded-md outline outline-1'
        type='text'
        placeholder='Search...'
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      {searchTerm !== "" && (
        <div
          className={`absolute pt-1 w-4/12 ${hasInput ? "bg-topaz/90" : ""}`}
        >
          <ul className='w-1/3 rounded-md px-3 py-2  bg-white flex flex-col overflow-y-hidden mt-2 divide-y divide-gray-300'>
            {filteredVenues.map((venue) => (
              <li
                key={venue.id}
                className='block odd:bg-topaz/90 even:bg-fawn/20 hover:bg-accent/40 px-1 py-3 w-full rounded-md'
              >
                <Link to={`/Room/${venue.id}`} className='px-3'>
                  {venue.name}
                </Link>
                ${venue.price}
              </li>
            ))}
          </ul>
          <div className=''>
            {searchTerm !== "" && filteredVenues.length === 0 && (
              <p className='w-1/3 rounded-md px-3 py-2 bg-red-300 font-medium text-black'>
                No results found.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default VenueSearch;
