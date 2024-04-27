import axios from 'axios';

// Create an instance of Axios with custom default options
const axiosInstance = axios.create({
  withCredentials: true, // Set withCredentials option to true
  // Add other default configuration options if needed
});

export default axiosInstance;
