import { useState } from "react";
import { useForm } from "react-hook-form";
//yup form validation import
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import axios from "../../api/axios";

const CREATE_URL = "/venues";

export default function CreateNewVenue() {
  // eslint-disable-next-line
  const [submit, setSubmit] = useState(false);
  // eslint-disable-next-line
  const [isError, setIsError] = useState(null);
  const [venueImage, setVenueImage] = useState([]);

  const [venueMeta, setVenueMeta] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });

  const handleMetaChange = (metaKey) => {
    setVenueMeta((prevState) => ({
      ...prevState,
      [metaKey]: !prevState[metaKey],
    }));
  };

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(5, "Name must be atleast 5 characters"),
    description: yup
      .string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters"),
    price: yup.number().required("A price is required, must be number"),
    maxGuests: yup
      .number()
      .required("Max guests is required, must be a number"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  //form submit handler
  async function onSubmit(data) {
    setSubmit(true);
    setIsError(null);
    console.log(data);
    const token = localStorage.getItem("ApiToken");
    try {
      const response = await axios.post(
        CREATE_URL,
        {
          name: data.name,
          description: data.description,
          media: [...venueImage],
          price: data.price,
          maxGuests: data.maxGuests,
          meta: venueMeta,
       
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
      setIsError(error.toString());
    } finally {
      setSubmit(false);
    }
  }

  return (
    <>
      <section id='createNewVenue' className='py-12'>
        <div className='mx-auto py-8 px-5 border border-gray-300 mb-12 pb-4 shadow-lg shadow-gray-400 max-w-7xl justify-center items-center'>
          <h1 className='font-extrabold text-lg py-2'>Create a new venue</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-12'>
              <div className='border-b border-gray-900/10 pb-12'>
                <h2 className='text-base font-semibold leading-7 text-gray-900'>
                  New Venue
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
                          {...register("name")}
                          name='name'
                          id='name'
                          className='block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                          placeholder='ie. CherryHeaven avenue'
                        />
                      </div>
                      {errors && errors.name && (
                        <p className='text-xs italic text-red-500'>
                          {errors.name.message}
                        </p>
                      )}
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
                        {...register("description")}
                        rows={3}
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        defaultValue={""}
                      />
                      {errors && errors.description && (
                        <p className='text-xs italic text-red-500'>
                          {errors.description.message}
                        </p>
                      )}
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
                          {...register("media")}
                          name='venueImage'
                          value={venueImage}
                          multiple='multiple'
                          id='media'
                          className='block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                          placeholder='...formated url only'
                          onChange={(e) => setVenueImage(e.target.value)}
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
                          {...register("price")}
                          name='price'
                          id='price'
                          className='block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                          placeholder='price here'
                        />
                      </div>
                      {errors && errors.price && (
                        <p className='text-xs italic text-red-500'>
                          {errors.price.message}
                        </p>
                      )}
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
                          {...register("maxGuests")}
                          name='maxGuests'
                          id='maxGuests'
                          className='block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                          placeholder='max guests here'
                        />
                      </div>
                      {errors && errors.maxGuests && (
                        <p className='text-xs italic text-red-500'>
                          {errors.maxGuests.message}
                        </p>
                      )}
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
                            {...register("wifi")}
                            type='checkbox'
                            checked={venueMeta.wifi}
                            onChange={(e) => handleMetaChange("wifi")}
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
                            {...register("parking")}
                            type='checkbox'
                            checked={venueMeta.parking}
                            onChange={(e) => handleMetaChange("parking")}
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
                            {...register("breakfast")}
                            type='checkbox'
                            checked={venueMeta.breakfast}
                            onChange={(e) => handleMetaChange("breakfast")}
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
                            {...register("pets")}
                            type='checkbox'
                            checked={venueMeta.pets}
                            onChange={(e) => handleMetaChange("pets")}
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
