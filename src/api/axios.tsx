import axios from "axios";
export default axios.create({
  baseURL: "https://bak-app-backend.onrender.com/api",
  //for development purposes: 
  //baseURL: "http://localhost:4000/api", 
});
