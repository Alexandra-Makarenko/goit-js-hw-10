import './css/styles.css';
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

import NewsApiService from './js/fetchCountries';


const refs = {
  searchForm: document.querySelector('[id="search-box"]'),
  countryContainer: document.querySelector('.country-list'),
};


const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('input', debounce((onSearch),DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();
    newsApiService.query = refs.searchForm.value.trim();
    console.log(newsApiService.query);

    if (newsApiService.query === '') {
        return
    };

  clearArticlesContainer();
  fetchArticles();
    
}

function fetchArticles() {
    newsApiService.fetchArticles().then(names => {
    appendArticlesMarkup(names);
  });
}

function appendArticlesMarkup(names) {
     if (names.length > 10) {
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
     } else if(names.length >=2 && names.length <=10){
            const markup = names
    .map((name) => {
      return `<li>
          <p><b>Official name</b>: ${name.name.official}</p>
          <img src=${name.flags.svg}>
        </li>`;
    })
    .join("");
    
    refs.countryContainer.insertAdjacentHTML('beforeend', markup);
     } else {
           const markup = names
    .map((name) => {
      return `<li>
          <p><b>Official name</b>: ${name.name.official}</p>
          <p><b>Official name</b>: ${name.capital}</p>
          <p><b>Official name</b>: ${name.population}</p>
          <img src=${name.flags.svg}>
        </li>`;
    })
    .join("");
    
    refs.countryContainer.insertAdjacentHTML('beforeend', markup);
        }
     
    console.log(names);
}


function clearArticlesContainer() {
  refs.countryContainer.innerHTML = '';
}