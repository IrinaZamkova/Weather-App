import './sass/main.scss';

import fetchWeather from './js/fetch-weather';
import fetchImage from './js/fetch-bg-image';
import refs from './js/refs';
import quotes from './js/quote';

fetchWeather.weatherFor5Days('london').then(data => console.log(data));