import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

export const getJuegos = async () => {
  const res = await axios.get(`${BASE_URL}/api/juegos`);
  return res.data;
};

export const getJuego = async (id) => {
  const res = await axios.get(`${BASE_URL}/api/juegos/${id}`);
  return res.data;
};

export const crearJuego = async (data) => {
  const res = await axios.post(`${BASE_URL}/api/juegos`, data);
  return res.data;
};

export const editarJuego = async (id, data) => {
  const res = await axios.put(`${BASE_URL}/api/juegos/${id}`, data);
  return res.data;
};

export const eliminarJuego = async (id) => {
  const res = await axios.delete(`${BASE_URL}/api/juegos/${id}`);
  return res.data;
};