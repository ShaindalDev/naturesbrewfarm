import React from "react";
import LogoWhite from "../../assets/img/logo-white.svg";

const Footer = () => {
  return (
    <footer className="bg-primary py-12 static bottom-0">
      <div className="mx-auto max-w-7xl px-6 py-12 justify-between md:flex md:items-center md:justify-between lg:px-8 text-white flex">
        <a href="/">
          <img className="w-2/3" src={LogoWhite} alt="" />
        </a>
        <div>
        <p className="text-center text-xs leading-5">&copy; 2023 Johnsen-codes.no, Inc. All rights reserved.</p>
      </div>
        
      </div>
    </footer>
  );
};

export default Footer;