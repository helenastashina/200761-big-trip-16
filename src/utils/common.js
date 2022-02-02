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

export const humanizeEventDate = (dueDate) => dayjs(dueDate).format('D MMMM');

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

export const isEventFuture = (date) => date && dayjs(date).isAfter(dayjs(), 'M');

export const isEventPast = (date) => date && dayjs(date).isBefore(dayjs(), 'M');

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortEventByDay = (eventA, eventB) => {
  const weight = getWeightForNullDate(eventA.dateFrom, eventB.dateFrom);

  return weight ?? dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom));
};

export const sortEventByPrice = (eventA, eventB) => eventA.basePrice - eventB.basePrice;

export const sortEventByTime = (eventA, eventB) => {
  const durationA = dayjs(eventA.dateTo).diff(dayjs(eventA.dateFrom), 'minute');
  const durationB = dayjs(eventB.dateTo).diff(dayjs(eventB.dateFrom), 'minute');
  return durationA - durationB;
};
