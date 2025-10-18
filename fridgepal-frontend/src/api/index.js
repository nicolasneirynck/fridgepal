import axios from 'axios';
import qs from 'qs';

const baseUrl = import.meta.env.VITE_API_URL;

export async function getAll(url,params ={}){
  const {data} = await axios.get(`${baseUrl}/${url}`, {
    params,
    paramsSerializer: {
      serialize: (params) =>
        qs.stringify(params, { arrayFormat: 'repeat' }), 
      // hierboven fixed api call naar juiste formaat, anders gaf hij zo een vreemde call
    },
  });
  return data.items;
}

// voor later -> interessant bij opgeslagen recepten 
// HFDST 4
export const deleteById = async (url, { arg: id }) => {
  await axios.delete(`${baseUrl}/${url}/${id}`);
};