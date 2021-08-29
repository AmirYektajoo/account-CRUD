import axios from "axios";
const baseURL = "http://localhost:8888";
export const getAccounts = () => {
  return axios.get(`${baseURL}/accounts`);
};

export const addAccounts = (body) => {
  return axios.post(`${baseURL}/accounts`, body);
};

export const deleteAccounts = (id) => {
  return axios.delete(`${baseURL}/accounts/${id}`);
};

export const updateAccounts = (body) => {
  return axios.put(`${baseURL}/accounts`, body);
};
