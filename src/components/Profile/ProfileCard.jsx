import React, { useEffect } from "react";
import UpdateAvatar from "./UpdateAvatar";

//Hente all profil data i axios request i denne filen her.
const ProfileCard = ({ name, avatar, venueManager }) => {
  const localUserData = localStorage.getItem("UserProfile");
  // eslint-disable-next-line
  const userData = JSON.parse(localUserData);

  useEffect(() => {});
  if (!name) {
    return <h1>There is no data available</h1>;
  }

  return (
    <>
      <section className='flex flex-col justify-center antialiased text-gray-600 p-4'>
        <div className='h-full'>
          <div className='max-w-lg mx-auto bg-white shadow-lg rounded-sm border border-gray-200'>
            <div className='flex flex-col h-full'>
              <div className='flex-grow p-5'>
                <div className='flex justify-between items-start'>
                  <header>
                    <div className='flex mb-2'>
                      <a
                        className='relative inline-flex items-start mr-5'
                        href='#0'
                      >
                        <div
                          className='absolute top-0 right-0 -mr-2 bg-white rounded-full shadow'
                          aria-hidden='true'
                        ></div>
                        <img
                          className='rounded-full'
                          src={avatar}
                          width='82'
                          height='82'
                          alt='User 01'
                        />
                      </a>
                      <div className='mt-1 pr-1'>
                        <a
                          className='inline-flex text-gray-800 hover:text-gray-900'
                          href='#0'
                        >
                          <h2 className='text-xl leading-snug justify-center font-semibold'>
                            {name}
                          </h2>
                        </a>
                        <div className='flex items-center'>
                          <span className='text-sm font-medium text-gray-400 -mt-0.5 mr-1'></span>{" "}
                          <span>{venueManager ? "Manager" : "Customer"}</span>
                        </div>
                      </div>
                    </div>
                  </header>
                  <UpdateAvatar name={name} />
                </div>
                {/* profile Card content*/}
                <div className='mt-2'>
                  <div className='text-sm'>
                    Here you will see an overview of your venues, your bookings
                    and you can change profile picture.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileCard;
