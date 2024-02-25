export function clearProfileData() {
    localStorage.setItem("UserDataAuth", ["No user data"]);
    localStorage.setItem("ApiToken", ["No token"]);
    localStorage.setItem("isLoggedIn", [false]);
   }
   