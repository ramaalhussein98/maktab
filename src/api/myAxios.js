import axios from "axios";
const token = localStorage.getItem("user_token");
export const myAxios = axios.create({
  baseURL: "https://dashboard.aqartik.com/",
  headers: {
    authorization: `Bearer ${token}`,
  },
});
