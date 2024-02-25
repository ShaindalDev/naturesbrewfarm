import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";

//logo
import LogoDark from "../../assets/img/logo-dark.svg";
import LogoWhite from "../../assets/img/logo-white.svg";
import { getLocalStorageItem } from "../../js/getStorageItems";
import LogOut from "../../js/logOut";
import VenueSearch from "./SearchBar/venueSearch";

const Header = () => {
  const [header, setHeader] = useState(false);
  const isLoggedIn = getLocalStorageItem("isLoggedIn");
  // eslint-disable-next-line
  const storedData = getLocalStorageItem("UserProfile");
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 50 ? setHeader(true) : setHeader(false);
    });
  });

  const handleLogout = () => {
    LogOut();
  };
  return (
    <header
      className={`${
        header ? "bg-white py-6 shadow-lg" : "bg-transparent py-8"
      } fixed z-50 w-full transition-all duration-500`}
    >
      <div className='container mx-auto flex flex-col items-center gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0'>
        {/* Logo */}
        <a href='/'>
          {header ? (
            <img
              className='w-[160px]'
              src={LogoDark}
              alt='Holidaze logo in Dark'
            />
          ) : (
            <img
              className='w-[160px]'
              src={LogoWhite}
              alt='Holidaze logo in white'
            />
          )}
        </a>
        <div>
          <VenueSearch />
        </div>

        <nav
          className={`${
            header ? "text-primary" : "text-white"
          } flex gap-x-4 font-tertiary tracking-[3px] text-[15px] items-center uppercase lg:gap-x-8`}
        >
          <Link to='/' className='hover:text-accent transition'>
            Home
          </Link>
          {isLoggedIn ? (
            <Fragment>
              <Link to='/profile' className='hover:text-accent transition'>
                Profile
              </Link>
              <Link to={"/contact"} className='hover:text-accent transition'>
                Contact
              </Link>
              <button onClick={handleLogout}>LOGOUT</button>
            </Fragment>
          ) : (
            <Fragment>
              <Link to='/login'>LOGIN</Link>
              <Link to={"/contact"} className='hover:text-accent transition'>
                Contact
              </Link>
            </Fragment>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
