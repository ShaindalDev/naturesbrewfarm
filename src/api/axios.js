import axios from "axios";

const token = localStorage.getItem("ApiToken");

export default axios.create({
    baseURL: 'https://api.noroff.dev/api/v1/holidaze',
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    }
});