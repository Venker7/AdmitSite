import axios from "axios";

const instance = axios.create({
  baseURL: "https://library-mtu.vercel.app/",
  headers: {
    "Content-Type": "application/json",
    "Content-Type": "multipart/form-data",
  },
});

const attendance = axios.create({
  baseURL: "https://library-register.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

export { instance, attendance };
