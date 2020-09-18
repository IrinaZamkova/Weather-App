import './sass/main.scss';
import refs from './js/refs';
import fetchWeather from './js/fetch-weather';
import fetchImage from './js/fetch-bg-image';
import quotes from './js/quote';
import timerDate from './js/timer-date';
import preloader from './js/preloader';
import geolocation from './js/geolocation-rendering';
import { onBtnOneDayClick, onBtnFiveDayClick } from './js/markUpFiveDay';
import renderingCurrentWeather from './js/renderingCurrentWeather';
import { error, Stack } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import { slider1 } from './js/slick-carousel';

// import localStorageInput from './js/localStorage';
// import formStar from './js/favorite-sity-star';
import notification from './js/notification';
import moment from 'moment';
moment().format();

document.addEventListener('DOMContentLoaded', preloader.start());
document.addEventListener('DOMContentLoaded', geolocation);
refs.onClickBtnOneDay.addEventListener(`click`, onBtnOneDayClick);
refs.onClickBtnFiveDay.addEventListener('click', () => {
  const cityName = refs.cityName.textContent.split(',')[0];
  fetchWeather.weatherFor5Days(cityName).then(data => {
    onBtnFiveDayClick(data);
    slider1();
  });
});
refs.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  preloader.search();
  setTimeout(() => {
    onBtnOneDayClick();
    // formStar.removeClassFillYellow();
    // formStar.addClassFillYellow(  );
    fetchWeather.currentWeather(refs.searchFormInput.value).then(data => {
      if (data === null) {
        notification(data);
        return;
      }
      renderingCurrentWeather(data);
    });
    // localStorageInput();
    fetchImage.fetchImage(refs.searchFormInput.value).then(data => {
      return refs.backgroundRef.setAttribute(
        'style',
        `background-image: url("${data.largeImg}")`,
      );
    });
  }, 1000);
});
