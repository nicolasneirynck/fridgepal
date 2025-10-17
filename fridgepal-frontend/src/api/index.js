import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL;

export async function getAll(url,params ={}){
  const {data} = await axios.get(`${baseUrl}/${url}`, {params});
  return data.items;
};

// voor later -> interessant bij opgeslagen recepten 
// HFDST 4
export const deleteById = async (url, { arg: id }) => {
  await axios.delete(`${baseUrl}/${url}/${id}`);
};