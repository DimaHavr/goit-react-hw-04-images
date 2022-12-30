import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '?key=31834003-1824309f82603d82faa29e511';

export default class PicturesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchPictures() {
    const url = `${BASE_URL}${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=12`;

    const response = await axios.get(url);
    this.incrementPage();

    return response.data;
  }

  incrementPage() {
    this.page += 1;
  }

  clearPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
