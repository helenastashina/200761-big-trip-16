import SiteSortingView from '../view/site-sorting-view.js';
import EventListView from '../view/event-list-view.js';
import NoEventView from '../view/no-event-view.js';
import {render, RenderPosition} from '../utils/render.js';
import EventPresenter from './event-presenter.js';
import {updateItem, sortEventByDay, sortEventByPrice, sortEventByTime} from '../utils/common.js';
import {SortType} from '../const.js';

export default class TripPresenter {
  #tripContainer = null;
  #sortComponent = new SiteSortingView();
  #eventListComponent = new EventListView();
  #noEventComponent = new NoEventView();
  #eventPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedEventList = [];

  #eventList = [];

  constructor(tripContainer) {
    this.#tripContainer = tripContainer;
  }

  init = (eventList) => {
    this.#eventList = [...eventList];
    this.#sourcedEventList = [...eventList];
    render(this.#tripContainer, this.#eventListComponent, RenderPosition.BEFOREEND);

    this.#renderTrip();
  }

  #handleModeChange = () => {
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleEventChange = (updatedEvent) => {
    this.#eventList = updateItem(this.#eventList, updatedEvent);
    this.#sourcedEventList = updateItem(this.#sourcedEventList, updatedEvent);
    this.#eventPresenter.get(updatedEvent.id).init(updatedEvent);
  }

  #sortEvents = (sortType) => {
    switch (sortType) {
      case SortType.SORT_PRICE:
        this.#eventList.sort(sortEventByPrice);
        break;
      case SortType.SORT_TIME:
        this.#eventList.sort(sortEventByTime);
        break;
      case SortType.SORT_DAY:
        this.#eventList.sort(sortEventByDay);
        break;
      default:
        this.#eventList = [...this.#sourcedEventList];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType);
    this.#clearEventList();
    this.#renderEvents();
  }

  #renderSort = () => {
    render(this.#tripContainer, this.#sortComponent, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderEvent = (event) => {
    const eventPresenter = new EventPresenter(this.#eventListComponent, this.#handleEventChange, this.#handleModeChange);
    eventPresenter.init(event);
    this.#eventPresenter.set(event.id, eventPresenter);
  }

  #clearEventList = () => {
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();
  }

  #renderEvents = () => {
    this.#eventList.forEach((event) => this.#renderEvent(event));
  }

  #renderNoEvents = () => {
    render(this.#tripContainer, this.#noEventComponent, RenderPosition.BEFOREEND);
  }

  #renderTrip = () => {
    if (this.#eventList.length === 0) {
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    this.#renderEvents();
  }
}
