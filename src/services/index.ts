import axios from 'axios';

const baseRequest = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_APP_MARVEL_URL}`
});

export default baseRequest;