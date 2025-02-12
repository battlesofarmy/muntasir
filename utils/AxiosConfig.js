import axios from "axios";

const api = axios.create({
  baseURL: "https://muntasir-backend.vercel.app", // Replace with your API base URL
  // baseURL: "https://applications.muntasir3301.xyz", // Replace with your API base URL
  timeout: 10000, // Optional: Set timeout (in ms)
  headers: { "Content-Type": "application/json" }, // Optional: Default headers
});

export default api;