import { useState, useEffect } from "react";

import { useParams } from "react-router";

const UPDATE_VENUE_URL = "https://api.noroff.dev/api/v1/holidaze/venues";

export default function EditMyVenue() {
  const { id } = useParams();
  const [media, setMedia] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [venue, setVenue] = useState({
    name: "",
    description: "",
    price: 0,
    maxGuests: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
  });

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true); 
      setIsError(false); 

      try {
        const response = await fetch(UPDATE_VENUE_URL + `/${id}`);
        const json = await response.json();
        setVenue(json);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false); 
      }
    }

    fetchData();
  }, [id]);

  if (isLoading) {
    return <div>Loading venue details...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("ApiToken");
    console.log("ApiToken:", token);

    const updatedVenue = {
      name: venue.name,
      description: venue.description,
      price: parseInt(venue.price),
      maxGuests: parseInt(venue.maxGuests),
      rating: 0,
      meta: venue.meta,
      location: venue.location,
    };

    if (media) {
      updatedVenue.media = [media];
    }

    try {
      console.log(JSON.stringify(updatedVenue));
      const response = await fetch(UPDATE_VENUE_URL + `/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedVenue),
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    if (type === "checkbox") {
      setVenue((prevState) => ({
        ...prevState,
        meta: { ...prevState.meta, [name]: checked },
      }));
    } else if (name.startsWith("location")) {
      const locationKey = name.split(".")[1];
      setVenue((prevState) => ({
        ...prevState,
        location: { ...prevState.location, [locationKey]: value },
      }));
    } else {
      setVenue((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleMediaChange = (event) => {
    setMedia(event.target.value);
  };

  return (
    <>
      <section id='editVenue' className='py-12'>
        <div className='mx-auto py-8 px-5 border border-gray-300 mb-12 pb-4 shadow-lg shadow-gray-400 max-w-7xl justify-center items-center'>
          <h1 className='font-extrabold text-lg py-2'>Edit </h1>
          <form onSubmit={handleSubmit}>
            <div className='space-y-12'>
              <div className='border-b border-gray-900/10 pb-12'>
                <h2 className='text-base font-semibold leading-7 text-gray-900'>
                  Edit Venue
                </h2>
                <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                  <div className='sm:col-span-4'>
                    <label
                      htmlFor='name'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Name of venue
                    </label>
                    <div className='mt-2'>
                      <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                        <input
                          type='text'
                          value={venue.name || ""}
                          name='name'
                          id='name'
                          className='block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                          placeholder='ie. CherryHeaven avenue'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='col-span-full max-w-lg'>
                    <label
                      htmlFor='description'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Description
                    </label>
                    <div className='mt-2'>
                      <textarea
                        id='description'
                        name='description'
                        value={venue.description || ""}
                        rows={3}
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        defaultValue={""}
                      />
                    </div>
                    <p className='mt-3 text-sm leading-6 text-gray-600'>
                      Write a few sentences about the venue.
                    </p>
                  </div>
                  {/* Photo for the venue*/}
                  <div className='sm:col-span-4'>
                    <label
                      htmlFor='cover-photo'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Photos
                    </label>
                    <div className='mt-2'>
                      <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                        <input
                          type='text'
                          name='venueImage'
                          value={media || ""}
                          multiple='multiple'
                          id='media'
                          className='block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                          placeholder='...formated url only'
                          onChange={handleMediaChange}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Price for the venue*/}
                  <div className='sm:col-span-4'>
                    <label
                      htmlFor='price'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Price
                    </label>
                    <div className='mt-2'>
                      <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                        <input
                          type='number'
                          value={venue.price || ""}
                          name='price'
                          id='price'
                          className='block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                          placeholder='price here'
                        />
                      </div>
                    </div>
                  </div>
                  {/* max Guests*/}
                  <div className='sm:col-span-4'>
                    <label
                      htmlFor='maxGuests'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Max Guests
                    </label>
                    <div className='mt-2'>
                      <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                        <input
                          type='number'
                          value={venue.maxGuests || ""}
                          name='maxGuests'
                          id='maxGuests'
                          className='block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                          placeholder='max guests here'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='border-b border-gray-900/10 pb-12'>
                <h2 className='text-base font-semibold leading-7 text-gray-900'>
                  Facilities
                </h2>
                <p className='mt-1 text-sm leading-6 text-gray-600'>
                  what type of facilities is there?
                </p>

                <div className='mt-10 space-y-10'>
                  <fieldset>
                    <div className='mt-6 space-y-6'>
                      <div className='relative flex gap-x-3'>
                        <div className='flex h-6 items-center'>
                          <input
                            id='venueMetaWifi'
                            name='venueMetaWifi'
                            type='checkbox'
                            checked={venue.meta.wifi || ""}
                            onChange={handleChange}
                            className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                          />
                        </div>
                        <div className='text-sm leading-6'>
                          <label
                            htmlFor='venueMetaWifi'
                            className='font-medium text-gray-900'
                          >
                            Wifi
                          </label>
                        </div>
                      </div>
                      <div className='relative flex gap-x-3'>
                        <div className='flex h-6 items-center'>
                          <input
                            id='venueMetaParking'
                            name='venueMetaParking'
                            type='checkbox'
                            checked={venue.meta.parking || ""}
                            onChange={handleChange}
                            className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                          />
                        </div>
                        <div className='text-sm leading-6'>
                          <label
                            htmlFor='venueMetaParking'
                            className='font-medium text-gray-900'
                          >
                            Parking
                          </label>
                        </div>
                      </div>
                      <div className='relative flex gap-x-3'>
                        <div className='flex h-6 items-center'>
                          <input
                            id='venueMetaBreakfast'
                            name='venueMetaBreakfast'
                            type='checkbox'
                            checked={venue.meta.breakfast || ""}
                            onChange={handleChange}
                            className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                          />
                        </div>
                        <div className='text-sm leading-6'>
                          <label
                            htmlFor='venueMetaBreakfast'
                            className='font-medium text-gray-900'
                          >
                            Breakfast
                          </label>
                        </div>
                      </div>
                      <div className='relative flex gap-x-3'>
                        <div className='flex h-6 items-center'>
                          <input
                            id='venueMetaPets'
                            name='venueMetaPets'
                            type='checkbox'
                            checked={venue.meta.pets || ""}
                            onChange={handleChange}
                            className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                          />
                        </div>
                        <div className='text-sm leading-6'>
                          <label
                            htmlFor='venueMetaPets'
                            className='font-medium text-gray-900'
                          >
                            Pets
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>

            <div className='mt-6 flex items-center justify-end gap-x-6'>
              <button
                type='reset'
                value='Reset'
                className='text-sm font-semibold leading-6 text-gray-900'
              >
                Cancel
              </button>
              <button
                className='rounded-md bg-accent/70 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                type='submit'
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
