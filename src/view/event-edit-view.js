import he from 'he';
import SmartView from './smart-view.js';
import {DEFAULT_TYPE} from '../const.js';
import {
  getEventDateTime,
  createEventEditTypesTemplate,
  createEventEditDestinationsTemplate,
  createEventEditOffersTemplate,
  createEventEditPhotosTemplate
} from '../utils/common.js';
import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.css';

const BLANK_EVENT = {
  type: DEFAULT_TYPE,
  destination: null,
  offers: [],
  basePrice: '',
  dateFrom: dayjs().format(),
  dateTo: dayjs().format(),
};

const createEventEditTemplate = (data) => {
  const {type, destination, offers, basePrice, dateFrom, dateTo} = data;
  const typesTemplate = createEventEditTypesTemplate(type);
  const destinationTemplate = createEventEditDestinationsTemplate();
  const offersTemplate = createEventEditOffersTemplate(offers);
  const photosTemplate = destination.pictures ? createEventEditPhotosTemplate(destination.pictures) : [];

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
     <header class="event__header">
        <div class="event__type-wrapper">
           <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
           </label>
           <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            <div class="event__type-list">
                <fieldset class="event__type-group">
                   <legend class="visually-hidden">Event type</legend>
                      ${typesTemplate}
                   </fieldset>
            </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
                ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
            <datalist id="destination-list-1">
               ${destinationTemplate}
            </datalist>
        </div>
        <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getEventDateTime(dateFrom)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getEventDateTime(dateTo)}">
        </div>
        <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
               <span class="visually-hidden">Price</span>
               &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
        </button>
     </header>
     <section class="event__details">
        <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
                ${offersTemplate}
            </div>
        </section>

        <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destination.description}</p>
            <div class="event__photos-container">
                <div class="event__photos-tape">
                    ${photosTemplate}
                </div>
            </div>
        </section>
     </section>
  </form>
</li>`;
};

export default class EventEditView extends SmartView {
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor(event = BLANK_EVENT) {
    super();
    this._data = EventEditView.parseEventToData(event);

    this.#setInnerHandlers();
    this.#setDateFromPicker();
    this.#setDateToPicker();
  }

  get template() {
    return createEventEditTemplate(this._data);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset = (event) => {
    this.updateData(
      EventEditView.parseEventToData(event),
    );
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDateFromPicker();
    this.#setDateToPicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(this._data);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  }

  #setDateFromPicker = () => {
    if (this._data.dateFrom) {
      this.#datepickerFrom = flatpickr(
        this.element.querySelector('input[name="event-start-time"]'),
        {
          enableTime: true,
          dateFormat: 'd/m/y H:m',
          defaultDate: this._data.dateFrom,
          onChange: this.#dateFromChangeHandler,
        },
      );
    }
  }

  #setDateToPicker = () => {
    if (this._data.dateTo) {
      this.#datepickerTo = flatpickr(
        this.element.querySelector('input[name="event-end-time"]'),
        {
          enableTime: true,
          dateFormat: 'd/m/y H:m',
          defaultDate: this._data.dateTo,
          onChange: this.#dateToChangeHandler,
        },
      );
    }
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#eventTypeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
  }

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      destination: evt.target.value,
    }, true);
  }

  #dateFromChangeHandler = ([userDate]) => {
    this.updateData({
      dateFrom: userDate,
    });
  }

  #dateToChangeHandler = ([userDate]) => {
    this.updateData({
      dateTo: userDate,
    });
  }

  #dueDateChangeHandler = ([userDate]) => {
    this.updateData({
      dateFrom: userDate,
    });
  }

  #eventTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
    });
  }

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      destination: evt.target.value,
    });
  }

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(EventEditView.parseDataToEvent(this._data));
  }


  static parseEventToData = (event) => ({...event,
    isDestination: event.destination,
  });

  static parseDataToEvent = (data) => {
    const event = {...data};

    if (!event.isDestination) {
      event.isDestination = data.isDestination;
    }
    delete event.isDestination;
    return event;
  }
}
