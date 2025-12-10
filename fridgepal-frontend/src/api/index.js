import qs from 'qs';
import axiosRoot from 'axios';
import { JWT_TOKEN_KEY } from '../contexts/auth';

const baseUrl = import.meta.env.VITE_API_URL;

export const axios = axiosRoot.create({
  baseURL: baseUrl,
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem(JWT_TOKEN_KEY);

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// als token expired is
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(JWT_TOKEN_KEY);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export async function getAll(url,params ={}){
  const {data} = await axios.get(url, {
    params,
    paramsSerializer: {
      serialize: (params) =>
        qs.stringify(params, { arrayFormat: 'repeat' }), 
      // hierboven fixed api call naar juiste formaat, anders gaf hij zo een vreemde call
    },
  });
  return data.items;
}

export async function getById(url) {
  const {data} = await axios.get(url);
  return data;
}

export async function save(url, { arg: { id, ...data } }) {
  const result = await axios({
    method: id ? 'PUT' : 'POST',
    url: `${url}/${id ?? ''}`,
    data,
  });

  return result.data;
}

export const post = async (url, { arg }) => {
  const { data } = await axios.post(url, arg);

  return data;
};

export async function getFavorites() {
  const { data } = await axios.get('/recipes/favorites');
  return data.items;
}

export async function getIsFavorite(recipeId) {
  const { data } = await axios.get(`/recipes/${recipeId}/favorite`);
  return data.isFavorite;
}

export async function toggleFavorite(recipeId) {
  const { data } = await axios.post(`/recipes/${recipeId}/favorite`);
  return data.isFavorite;
}

// voor later -> interessant bij opgeslagen recepten 
// HFDST 4
export const deleteById = async (url, { arg: id }) => {
  await axios.delete(`${url}/${id}`);
  
};

export async function uploadRecipeImage(recipeId, file) {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await axios.post(
    `/recipes/${recipeId}/upload-image`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    },
  );

  return data; // { imageUrl: 'https://res.cloudinary.com/...'}
}