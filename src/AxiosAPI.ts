import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://zee-server-5f4ad-default-rtdb.europe-west1.firebasedatabase.app/',
});

export default axiosApi;