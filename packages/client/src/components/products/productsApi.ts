import axios from 'axios';

export const fetchProducts = async () => {
   return axios.get('/api/products').then((res) => res.data);
};
