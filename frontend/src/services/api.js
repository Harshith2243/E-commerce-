import axios from "axios";

const API = axios.create({
  baseURL: "https://e-commerce-backend-500r.onrender.com/api",
});

export default API;