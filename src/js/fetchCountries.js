import Notiflix from 'notiflix';
const BASE_URL = 'https://restcountries.com/v3.1/name';
const FILTER = '?fields=name,capital,population,flags,languages'

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
  }

  fetchArticles() {
    const url = `${BASE_URL}/${this.searchQuery}${FILTER}`;
    return fetch(url)
      .then(response => {
    if (!response.ok) {
      Notiflix.Notify.failure('Oops, there is no country with that name');;
    }
    return response.json();
  })
      .then((names) => {
       
        return names;
      });
      
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}