import axios from "axios";
import { BACKEND_URL } from "@/utils/privateKey";

const instance = axios.create({
  baseURL: BACKEND_URL,
  timeout: 240000,
});

export default instance;