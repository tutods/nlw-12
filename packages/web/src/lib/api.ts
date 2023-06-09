import axios from 'axios';

const baseURL = process.env.API_URL ?? 'http://localhost:3333';

export const api = axios.create({
  baseURL,
});
