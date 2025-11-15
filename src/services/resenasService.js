import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

export const getResenasPorJuego = async (juegoId) => {
  const res = await axios.get(`${BASE_URL}/api/reviews/${juegoId}`);
  return res.data;
};

export const crearResena = async (juegoId, data) => {
  const res = await axios.post(`${BASE_URL}/api/reviews/${juegoId}`, data);
  return res.data;
};

export const editarResena = async (reviewId, data) => {
  const res = await axios.put(`${BASE_URL}/api/reviews/${reviewId}`, data);
  return res.data;
};

export const eliminarResena = async (reviewId) => {
  const res = await axios.delete(`${BASE_URL}/api/reviews/${reviewId}`);
  return res.data;
};