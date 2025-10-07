// src/apiService.js
import axios from "axios";

const API_URL = "http://localhost:5000/users";

export const createUser = (data) => axios.post(API_URL, data);
export const getUsers = () => axios.get(API_URL);
export const getUser = (id) => axios.get(`${API_URL}/${id}`);
export const updateUser = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);
