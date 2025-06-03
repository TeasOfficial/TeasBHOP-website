import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.teasbhop.cc',
  timeout: 10000,
})

export default instance;
