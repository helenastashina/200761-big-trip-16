import dayjs from 'dayjs';
import {DESTINATIONS, OFFERS, TYPES} from '../const';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getEventDateTime = (date) => dayjs(date).format('DD/MM/YY HH:MM');

export const createEventEditTypesTemplate = (currentType) => TYPES.map((eventType) => `
        <div class="event__type-item">
          <input
            id="event-type-${eventType.toLowerCase()}-1"
            class="event__type-input  visually-hidden"
            type="radio"
            name="event-type"
            value="${eventType}"
            ${currentType === eventType ? 'checked' : ''}
          >
          <label
            class="event__type-label  event__type-label--${eventType.toLowerCase()}"
            for="event-type-${eventType.toLowerCase()}-1"
          >${eventType}</label>
        </div>`).join('');

export const createEventEditDestinationsTemplate = () => DESTINATIONS.map((destination) => ` <option value="${destination}"></option>`).join('');

export const createEventEditOffersTemplate = () => OFFERS.map((offer) => `
        <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}-1" type="checkbox" name="event-offer-${offer.id}">
            <label class="event__offer-label" for="event-offer-${offer.id}-1">
                <span class="event__offer-title">${offer.title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${offer.price}</span>
            </label>
        </div>`).join('');

export const createEventEditPhotosTemplate = (photos) => photos.map((photo) => `<img class="event__photo" src="${photo.src}" alt="Event photo">`).join('');

export const getTypesTimeDuration = (points, types) => {
  const itemsTimes = [];
  let time = 0;
  types.forEach((type) => {
    points.forEach((point) => {
      if (point.type === type) {
        time += (dayjs(point.dateTo).diff(dayjs(point.dateFrom)));
      }
    });
    itemsTimes.push(Math.round(time));
    time = 0;
  });
  return itemsTimes;
};

export const getTypesMoney = (points, types) => {
  const itemsCosts = [];
  let sum = 0;
  types.forEach((type) => {
    points.forEach((point) => {
      if (point.type === type) {
        sum += point.basePrice;
      }
    });
    itemsCosts.push(sum);
    sum = 0;
  });
  return itemsCosts;
};

export const getTypesCount = (points, types) => {
  const itemsTypesCount = [];
  let count = 0;
  types.forEach((type) => {
    points.forEach((point) => {
      if (point.type === type) {
        count++;
      }
    });
    itemsTypesCount.push(count);
    count = 0;
  });
  return itemsTypesCount;
};

export const convertArrayToObject = (array, key) => array.reduce((obj, item) => ({...obj,[item[key]]: item}),{});
