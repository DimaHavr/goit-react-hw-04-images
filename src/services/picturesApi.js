import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '?key=31834003-1824309f82603d82faa29e511';

export default async function fetchPictures(query, page) {
  const url = `${BASE_URL}${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`;

  const response = await axios.get(url);
  return response.data;
}
