// import * as dotenv from "dotenv";
// dotenv.config();
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

export default api;
