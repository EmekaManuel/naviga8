import instance from "./AxiosInstance";
import { BACKEND_URL } from "@/utils/privateKey";

interface Message {
  name:string,
  email: string,
  phone:string,
  companyName?: string            
}

export default function sendMessage (message: Message) {
  return instance.post(`${BACKEND_URL}/marketing/send-message`, message);
}