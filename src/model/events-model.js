import AbstractObservable from '../utils/abstract-observable.js';
import {UpdateType} from '../const.js';

export default class EventsModel extends AbstractObservable {
  #apiService = null;
  #events = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  init = async () => {
    try {
      const events = await this.#apiService.events;
      this.#events = events.map(this.#adaptToClient);
    } catch(err) {
      this.#events = [];
    }

    this._notify(UpdateType.INIT);
  }


  get events() {
    return this.#events;
  }

  updateEvent = async (updateType, update) => {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    try {
      const response = await this.#apiService.updateEvent(update);
      const updatedTask = this.#adaptToClient(response);
      this.#events = [
        ...this.#events.slice(0, index),
        updatedTask,
        ...this.#events.slice(index + 1),
      ];
      this._notify(updateType, updatedTask);
    } catch(err) {
      throw new Error('Can\'t update task');
    }
  }

  addEvent = async (updateType, update) => {
    try {
      const response = await this.#apiService.addEvent(update);
      const newEvent = this.#adaptToClient(response);
      this.#events = [newEvent, ...this.#events];
      this._notify(updateType, newEvent);
    } catch(err) {
      throw new Error('Can\'t add task');
    }
  }

  deleteEvent = async (updateType, update) => {
    const index = this.#events.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    try {
      await this.#apiService.deleteEvent(update);
      this.#events = [
        ...this.#events.slice(0, index),
        ...this.#events.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete task');
    }
  }

  #adaptToClient = (event) => {
    const adaptedEvent = {...event,
      isFavorite: event['is_favorite'],
      basePrice: event['base_price'],
      dateFrom: event['date_from'] !== null ? new Date(event['date_from']) : event['date_from'],
      dateTo:  event['date_to'] !== null ? new Date(event['date_to']) : event['date_to'],
      offers: event.offers,
    };

    delete adaptedEvent['base_price'];
    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];
    delete adaptedEvent['is_favorite'];

    return adaptedEvent;
  }
}
