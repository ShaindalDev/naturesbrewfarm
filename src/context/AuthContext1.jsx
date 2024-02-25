import { createContext, useState } from "react";
import { getProfile } from "../api/getProfile";

const AuthContext = createContext({
 userData: [],
 getStoredUserData: () => {},
 storeUserData: () => {},
 getUserStatus: () => {},
 clearUserData: () => {},
 getProfileData: () => {},
});

export const AuthProvider = ({ children }) => {
 const [auth, setAuth] = useState();

 function storeUserData() {
  const userData = localStorage.getItem("UserData");
  const localData = localStorage.setItem("UserDataAuth", userData);
  setAuth(localData);
 }

 function getStoredUserData() {
  const localData = localStorage.getItem("UserDataAuth");
  return JSON.parse(localData);
 }

 function getUserStatus() {
  const localData = localStorage.getItem("UserDataAuth");
  const data = JSON.parse(localData);
  return data;
 }

 function getProfileData() {
  return getProfile();
 }

 function clearUserData() {
  localStorage.setItem("UserDataAuth", ["No user data"]);
  localStorage.setItem("ApiToken", ["No token"]);
  localStorage.setItem("isLoggedIn", [false]);
 }

 const contextValue = {
  userData: auth,
  getStoredUserData,
  storeUserData,
  getUserStatus,
  clearUserData,
  getProfileData,
 };

 return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;