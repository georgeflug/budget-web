import axios from "axios";

export const budgetAxios = axios.create({
  baseURL: 'http://homelab.local:3000',
});
