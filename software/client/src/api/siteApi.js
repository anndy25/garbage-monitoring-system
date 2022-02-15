import axios from "axios";

export default axios.create({
  baseURL: process.env.React_App_BACK_END_URL,
  headers: {
    "authorization": localStorage.getItem("token")? localStorage.getItem("token"):null,
  }
});
