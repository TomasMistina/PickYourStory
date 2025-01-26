import axios from "axios";
export default axios.create({
  baseURL: "https://bak-app-backend.onrender.com",
  //for development purposes: http://localhost:4000/api
});
