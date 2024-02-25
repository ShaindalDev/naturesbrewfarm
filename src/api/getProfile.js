import { profiles } from "./constants";
import { headers } from "./headers";

export async function getProfile(credentials) {
 const Url = "https://api.noroff.dev/api/v1/holidaze";

 const storedData = localStorage.getItem("UserProfile");
 const data = JSON.parse(storedData);

 const name = data.name;

 const endPoint = profiles + `/${name}?_bookings=true&_venues=true`;

 return fetch(Url + endPoint, {
  method: "GET",
  headers: headers("application/json"),
  body: JSON.stringify(credentials),
 }).then((data) => data.json());
}