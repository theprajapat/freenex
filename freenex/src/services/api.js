import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your backend URL if using production or cloud
});

// Register a user
export const registerUser = async (formData) => {
  return await API.post('/register', formData);
};

// Login a user
export const loginUser = async (email, password) => {
  return await API.post('/login', { email, password });
};

// Fetch user profile
export const fetchUserProfile = async (token) => {
  return await API.get('/user/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default API;
