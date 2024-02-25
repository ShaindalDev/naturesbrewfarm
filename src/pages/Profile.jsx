//react imports
import React, { Fragment, useEffect } from "react";
// API functions
import useApi from "../hooks/useApi";
import { profiles } from "../api/constants";
//Componentes
import HeroSlider from "../components/HeroSlider";
import ProfileNavigation from "../components/ProfileNavigation";
import CreateNewVenue from "../components/Profile/CreateVenue";
import MyVenues from "../components/Profile/MyVenues";
import ProfileCard from "../components/Profile/ProfileCard";

import MyBookings from "../components/Profile/MyBookings";


const Profile = () => {
  useEffect(() => {
    document.title = "Holidayze | Profile";
  }, []);

  const getLocalData = localStorage.getItem("UserProfile");
  const userProfile = JSON.parse(getLocalData);
  const name = userProfile.name;

  const url = profiles + `/${name}?_bookings=true&_venues=true`;
  const method = "get";

  const { data, isLoading, IsError } = useApi(url, method);

  const profileData = {
    name: data.name,
    avatar: data.avatar,
    venueManager: data.venueManager,
  };

  if (!profileData) {
    return;
  }
  if (isLoading) return <h1>Loading...</h1>;

  if (IsError) console.log(IsError);

  return (
    <>
      <Fragment>
        <HeroSlider />
      
      <div className="container mx-auto relative">
        <div className="bg-white mt-4 p-4 lg:shadow-xl lg:absolute  lg:left-0 lg:right-0 lg:p-0 lg:z-30 lg:-top-12">
          <ProfileNavigation />
        </div>
      </div>
      
      <section className="mt-14">
        {/* User info */}
          <ProfileCard name={data.name}
          avatar={data.avatar}
          venueManager={data.venueManager}  />
      </section>
      
      {/* Users bookings*/}
      <MyBookings data={data.bookings} />
      
      <MyVenues data={data.venues} />
      
        <CreateNewVenue />
      </Fragment>
    </>
  );
};

export default Profile;
