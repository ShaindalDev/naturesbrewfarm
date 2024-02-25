import { authLogin } from "./constants";

const Url = "https://api.noroff.dev/api/v1/holidaze";
const endPoint = authLogin;

export async function loginUser(credentials) {
 console.log(credentials);

 return fetch(Url + endPoint, {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify(credentials),
 }).then((data) => data.json());
}