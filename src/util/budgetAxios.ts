import axios from "axios";

export const budgetAxios = axios.create({
  baseURL: 'http://192.168.1.132:3000',
});
