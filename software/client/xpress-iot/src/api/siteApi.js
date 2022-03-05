import axios from "axios";

export default axios.create({
  baseURL:process.env.REACT_APP_API_URL,
  headers: {
    "authorization": localStorage.getItem("token")? localStorage.getItem("token"):null,
  }
});
