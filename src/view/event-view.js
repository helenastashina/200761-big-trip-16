import he from 'he';
import AbstractView from './abstract-view.js';
import dayjs from 'dayjs';

import {
  convertDateHourseMinutes,
  getDurationDate,
  dateYearsMonthDay,
  dateMonthDay,
} from '../utils/date.js';

const createEventEventTemplate = (event) => {
  const {type, destination, offers, basePrice, dateFrom, dateTo, isFavorite} = event;

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn--active'
    : '';

  const createOfferItemTemplate = (offerItem) => `<li class="event__offer">
      <span class="event__offer-title">${he.encode(offerItem.title)}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offerItem.price}</span>
    </li>`;

  let offersList = '';

  if (offers.length > 0) {
    offers.forEach((item) => {
      offersList += createOfferItemTemplate(item);
    });
  }

  return `<li class="trip-events__item">
            <div class="event">
                <time class="event__date" datetime="${dateYearsMonthDay(dateTo)}">${dateMonthDay(dateTo)}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/check-in.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${he.encode(destination.name)}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                     <time class="event__start-time" datetime="${dateFrom}">${convertDateHourseMinutes(dateFrom)}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${dateTo}">${convertDateHourseMinutes(dateTo)}</time>
                  </p>
                  <p class="event__duration">${getDurationDate(dateFrom, dateTo)}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>

                <ul class="event__selected-offers">${offersList}</ul>
                <button class="event__favorite-btn ${favoriteClassName}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
};

export default class EventView extends AbstractView {
  #event = null;

  constructor(event) {
    super();
    this.#event = event;
  }

  get template() {
    return createEventEventTemplate(this.#event);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
}
