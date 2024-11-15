import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:5000/api/auth';

export const signup = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Network error');
  }
};


export const setAuth = async (token) => {
    if (typeof document !== 'undefined') {
        localStorage.setItem('authToken', token);
    } else {
        await AsyncStorage.setItem('authToken', token);
    }
};

export const getAuth = async () => {
    if (typeof document !== 'undefined') {
        return localStorage.getItem('authToken');
    } else {
        return await AsyncStorage.getItem('authToken');
    }
};
