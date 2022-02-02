import { Method } from './const.js';

export default class ApiService {
  #endEvent = null;
  #authorization = null;

  constructor(endEvent, authorization) {
    this.#endEvent = endEvent;
    this.#authorization = authorization;
  }

  get events() {
    return this.#load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this.#load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this.#load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  updateEvent = async (event) => {
    const response = await this.#load({
      url: `points/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(event)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  addEvent = async (event) => {
    const response = await this.#load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(event)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  deleteEvent = async (event) => {
    const response = await this.#load({
      url: `points/${event.id}`,
      method: Method.DELETE,
    });

    return response;
  }

  #load = async ({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) => {
    headers.append('Authorization', this.#authorization);
    const response = await fetch(
      `${this.#endEvent}/${url}`,
      {method, body, headers},
    );

    try {
      ApiService.checkStatus(response);
      return response;
    } catch (err) {
      ApiService.catchError(err);
    }
  }

  static parseResponse = (response) => response.json();

  static checkStatus = (response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  static catchError = (err) => {
    throw err;
  }

  #adaptToServer = (event) => {
    const offers = event.offers ? event.offers : [];
    const adaptedEvent = {...event,
      'date_from': event.dateFrom instanceof Date ? event.dateFrom.toISOString() : null,
      'date_to': event.dateTo instanceof Date ? event.dateTo.toISOString() : null,
      'is_favorite': event.isFavorite,
      'base_price': parseInt(event.basePrice, 10),
      offers,
    };


    delete adaptedEvent.dateFrom;
    delete adaptedEvent.dateTo;
    delete adaptedEvent.isFavorite;
    delete adaptedEvent.basePrice;

    return adaptedEvent;
  }
}
