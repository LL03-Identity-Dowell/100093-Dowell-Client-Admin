import axios from "axios";
const BASE14_URL = "https://100014.pythonanywhere.com/api";

const BASE93_URL = "https://100093.pythonanywhere.com/api";

export const Axios14Base = axios.create({
  baseURL: BASE14_URL,
});
export const Axios93Base = axios.create({
  baseURL: BASE93_URL,
});
