import axios from 'axios';

const baseRequest = axios.create({
  baseURL: process.env.marvelURL
});

export default baseRequest;