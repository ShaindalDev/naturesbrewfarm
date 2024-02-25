import React, { createContext, useEffect, useState } from "react";

//Api imports
import axios from "../api/axios";

//Test API with json-server import 
//uncomment the line below and comment out the import above to use testAPI
// import axios from "../api/axiosTest";

//create context
export const VenueContext = createContext();

const VenueProvider = ({ children }) => {
  const [venues, setVenues] = useState([]);
  const [adults, setAdults] = useState("1 Adult");
  const [kids, setKids] = useState("0 Kids");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const getVenues = async (id) => {
      try {
        const response = await axios.get('/venues');
        setVenues(response.data);
        // console.log(response.data)
      } catch (err) {
        setError(err);
        if (err.response) {
          //not in the 200 response range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        } else {
          //no response or 404 error
          console.log(`Error: ${err.message}`)
        }
      }
      setTotal(Number(adults[0]) + Number(kids[0]));
    }
    
    getVenues();
  }, [adults, setAdults, kids, setKids, total, setTotal]);

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    //filter venues based on total (people)
    const newVenues = venues.filter((venue) => {
      return total <= venue.maxGuests;
    });
    setTimeout(() => {
      setVenues(newVenues);
      setLoading(false);
    }, 3000);
    
  };

  return (
    <VenueContext.Provider
      value={{ venues, adults, setAdults, kids, setKids, handleClick, loading, error}}
    >
      {children}
    </VenueContext.Provider>
  );
};

export default VenueProvider;