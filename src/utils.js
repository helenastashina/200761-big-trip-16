import dayjs from 'dayjs';
import {DESTINATIONS, OFFERS, TYPES} from './const';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getPointDateTime = (date) => dayjs(date).format('DD/MM/YY HH:MM');

export const humanizePointDate = (dueDate) => dayjs(dueDate).format('D MMMM');

export const createPointEditTypesTemplate = (currentType) => TYPES.map((pointType) => `
        <div class="event__type-item">
          <input
            id="event-type-${pointType.toLowerCase()}-1"
            class="event__type-input  visually-hidden"
            type="radio"
            name="event-type"
            value="${pointType}"
            ${currentType === pointType ? 'checked' : ''}
          >
          <label
            class="event__type-label  event__type-label--${pointType.toLowerCase()}"
            for="event-type-${pointType.toLowerCase()}-1"
          >${pointType}</label>
        </div>`).join('');

export const createPointEditDestinationsTemplate = () => DESTINATIONS.map((destination) => ` <option value="${destination}"></option>`).join('');

export const createPointEditOffersTemplate = () => OFFERS.map((offer) => `
        <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}-1" type="checkbox" name="event-offer-${offer.id}">
            <label class="event__offer-label" for="event-offer-${offer.id}-1">
                <span class="event__offer-title">${offer.title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${offer.price}</span>
            </label>
        </div>`).join('');

export const createPointEditPhotosTemplate = (photos) => photos.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`).join('');

export const isPointFuture = (date) => date && dayjs(date).isAfter(dayjs(), 'M');

export const isPointPast = (date) => date && dayjs(date).isBefore(dayjs(), 'M');
