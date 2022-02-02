import AbstractView from './abstract-view.js';
import {SortType} from '../const.js';

const createSiteSortingTemplate = (currentSortType) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--day">
        <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${SortType.SORT_DAY}" ${currentSortType === SortType.SORT_DAY ? 'checked' : ''}>
        <label class="trip-sort__btn" for="sort-day">Day</label>
    </div>
    <div class="trip-sort__item  trip-sort__item--event">
        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${SortType.SORT_EVENT}" ${currentSortType === SortType.SORT_EVENT ? 'checked' : ''} disabled>
        <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>
    <div class="trip-sort__item  trip-sort__item--time">
        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${SortType.SORT_TIME}" ${currentSortType === SortType.SORT_TIME ? 'checked' : ''}>
        <label class="trip-sort__btn" for="sort-time">Time</label>
    </div>
    <div class="trip-sort__item  trip-sort__item--price">
        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${SortType.SORT_PRICE}" ${currentSortType === SortType.SORT_PRICE ? 'checked' : ''}>
        <label class="trip-sort__btn" for="sort-price">Price</label>
    </div>
    <div class="trip-sort__item  trip-sort__item--offer">
        <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${SortType.SORT_OFFER}" ${currentSortType === SortType.SORT_OFFER ? 'checked' : ''} disabled>
        <label class="trip-sort__btn" for="sort-offer">Offers</label>
    </div>
  </form>`
);

export default class SiteSortingView extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSiteSortingTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.value);
  }
}
