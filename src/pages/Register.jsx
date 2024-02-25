import React, { useEffect } from "react";
import HeroSlider from "../components/HeroSlider";
import RegisterForm from "../components/register";
const Register = () => {
 useEffect(() => {
  document.title = "Holidayze | Register";
 }, []);
  return (
    <>
      <HeroSlider />

      <RegisterForm />
    </>
  );
};

export default Register;