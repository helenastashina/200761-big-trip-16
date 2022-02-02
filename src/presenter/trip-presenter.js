import SiteSortingView from '../view/site-sorting-view.js';
import EventListView from '../view/event-list-view.js';
import NoEventView from '../view/no-event-view.js';
import {remove, render, RenderPosition} from '../utils/render.js';
import EventPresenter from './event-presenter.js';
import EventNewPresenter from './event-new-presenter.js';
import {sortEventByDay, sortEventByPrice, sortEventByTime} from '../utils/event.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';
import {filter} from '../utils/filter.js';

export default class TripPresenter {
  #tripContainer = null;
  #eventsModel = null;
  #filterModel = null;

  #sortComponent = null;
  #eventListComponent = new EventListView();
  #noEventComponent = null;
  #eventPresenter = new Map();
  #eventNewPresenter = null;
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.ALL;

  constructor(tripContainer, eventsModel, filterModel) {
    this.#tripContainer = tripContainer;
    this.#eventsModel = eventsModel;
    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel = filterModel;
    this.#eventNewPresenter = new EventNewPresenter(this.#eventListComponent, this.#handleViewAction);
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const events = this.#eventsModel.events;
    const filteredEvents = filter[this.#filterType](events);

    switch (this.#currentSortType) {
      case SortType.SORT_PRICE:
        return filteredEvents.sort(sortEventByPrice);
      case SortType.SORT_TIME:
        return filteredEvents.sort(sortEventByTime);
      case SortType.SORT_DAY:
        return filteredEvents.sort(sortEventByDay);
    }

    return filteredEvents;
  }

  init = () => {
    render(this.#tripContainer, this.#eventListComponent, RenderPosition.BEFOREEND);

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#renderTrip();
  }

  destroy = () => {
    this.#clearTrip({resetSortType: true});

    remove(this.#eventListComponent);

    this.#eventsModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);
  }


  createEvent = (callback) => {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
    this.#eventNewPresenter.init(callback);
  }

  #handleModeChange = () => {
    this.#eventNewPresenter.destroy();
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsModel.deleteEvent(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTrip();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearTrip({resetSortType: true});
        this.#renderTrip();
        break;
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTrip();
    this.#renderTrip();
  }

  #renderSort = () => {
    this.#sortComponent = new SiteSortingView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#tripContainer, this.#sortComponent, RenderPosition.AFTERBEGIN);
  }

  #renderEvent = (event) => {
    const eventPresenter = new EventPresenter(this.#eventListComponent, this.#handleViewAction, this.#handleModeChange);
    eventPresenter.init(event);
    this.#eventPresenter.set(event.id, eventPresenter);
  }

  #clearTrip = ({resetSortType = false} = {}) => {

    this.#eventNewPresenter.destroy();
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();

    remove(this.#sortComponent);

    if (this.#noEventComponent) {
      remove(this.#noEventComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderEvents = (events) => {
    events.forEach((event) => this.#renderEvent(event));
  }

  #renderNoEvents = () => {
    this.#noEventComponent = new NoEventView(this.#filterType);
    render(this.#tripContainer, this.#noEventComponent, RenderPosition.BEFOREEND);
  }

  #renderTrip = () => {
    const events = this.events;
    const eventCount = events.length;

    if (eventCount === 0) {
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    this.#renderEvents(events);
  }
}
