import React, { useState, useEffect } from "react";

import { API_URL, bookings, venues } from "../../api/constants";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { BsCalendar } from "react-icons/bs";

function CalenderBooking({ venueId }) {
  
  const [formData, setFormData] = useState({
    dateFrom: "",
    dateTo: "",
    guests: 1,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [bookedDates, setBookedDates] = useState([]);
  const [maxCheckOutDate, setMaxCheckOutDate] = useState(null);

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const token = localStorage.getItem("ApiToken");
        if (!venueId) {
          return; // If venueId is undefined, exit the function to prevent the API request
        }
        const response = await fetch(
          API_URL + venues + `/${venueId}?_bookings=true&_owner=true`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const bookedData = await response.json();
          bookedData.bookings.sort(
            (a, b) => new Date(a.dateFrom) - new Date(b.dateFrom)
          );
          setBookedDates(bookedData.bookings);
        } else {
          console.error("Error:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchBookedDates();
  }, [venueId]);

  const handleCheckInChange = (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      dateFrom: date,
    }));

    const nextBookedDate = bookedDates.find(
      (booking) => new Date(booking.dateFrom) > date
    );

    if (nextBookedDate) {
      setMaxCheckOutDate(new Date(nextBookedDate.dateFrom));
    } else {
      setMaxCheckOutDate(null);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "guests" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setIsError(false);
    setSuccessMessage("");

    const bookingData = {
      ...formData,
      venueId: venueId,
    };

    console.log("Booking information:", bookingData);

    try {
      const token = localStorage.getItem("ApiToken");

      const response = await fetch(API_URL + bookings, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setSuccessMessage("BOOKING SUCCESSFUL!");
        setFormData({
          dateFrom: "",
          dateTo: "",
          guests: 1,
        });
      } else {
        const errorData = await response.json();
        console.error("Error data:", errorData);
        setIsError(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsError(true);
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <div className='w-full h-full lg:w-[40%]'>
        <form onSubmit={handleSubmit}>
          <div className='py-8 px-6 bg-accent/20 mb-12'>
            <div className='flex flex-col space-y-4 mb-4'>
              <h2 className='text-xl leading-snug justify-center font-semibold'>
                Book now
              </h2>
              {/* check in */}
              <div className='h-[60px]'>
                <div className='relative flex items-center justify-end h-full'>
                  <div className='absolute z-10 pr-8'>
                    <div>
                      <BsCalendar className='text-accent text-base' />
                    </div>
                  </div>
                  <label htmlFor='dateFrom'>Check In</label>
                  <DatePicker
                    selected={formData.dateFrom}
                    minDate={new Date()}
                    excludeDates={bookedDates.map(
                      (booking) => new Date(booking.dateFrom)
                    )}
                    onChange={handleCheckInChange}
                    className='w-full h-full'
                  />
                </div>
              </div>
              {/* check out */}
              <div className='h-[60px]'>
                <div className='relative flex items-center justify-end h-full'>
                  <div className='absolute z-10 pr-8'>
                    <div>
                      <BsCalendar className='text-accent text-base' />
                    </div>
                  </div>
                  <label htmlFor='dateTo'>Check Out</label>
                  <DatePicker
                    selected={formData.dateTo}
                    excludeDates={bookedDates.map(
                      (booking) => new Date(booking.dateFrom)
                    )}
                    minDate={formData.dateFrom || new Date()}
                    maxDate={maxCheckOutDate}
                    onChange={(date) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        dateTo: date,
                      }))
                    }
                    className='w-1/2 h-full'
                  />
                </div>
              </div>
              <div className='h-[60px]'>
                <div className='relative flex items-center justify-end h-full'>
                  <input
                    type='number'
                    className='w-full h-1/2 p-3'
                    id='guests'
                    name='guests'
                    value={
                      Number.isInteger(formData.guests) ? formData.guests : ""
                    }
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            <button
              type='submit'
              className='btn btn-lg w-full btn-primary'
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Book Now"}
            </button>
            {isError && (
              <div
                className=' px-2 bg-red-300 border border-red-600 mt-3 font-medium tracking-wide'
                role='alert'
              >
                Something went wrong, please try again
              </div>
            )}
            {successMessage && (
              <div className='px-2 bg-green-300 border border-green-600 mt-3 font-medium tracking-wide' role='alert'>
                {successMessage}
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default CalenderBooking;
