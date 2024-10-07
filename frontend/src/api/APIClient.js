import axios from 'axios';

const API_URL = 'http://localhost:8080/auth';

const APIClient = {
  register: (userData) => {
    return axios.post(`${API_URL}/register`, userData);
  },
  login: (authRequest) => {
    return axios.post(`${API_URL}/login`, authRequest);
  },
};

export default APIClient;
