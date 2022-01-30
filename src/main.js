import SiteMenuView from './view/site-menu-view.js';
import FilterView from './view/site-filter-view.js';
import SiteSortingView from './view/site-sorting-view.js';
import createEventCreateTemplate from './view/event-create-view';
import EventEditView from './view/event-edit-view.js';
import EventView from './view/event-view';
import EventListView from './view/event-list-view';
import NoEventView from './view/no-event-view';
import {render, replace, RenderPosition} from './utils/render.js';
import {generateEvent} from './mock/event.js';
import {generateFilter} from './mock/filter.js';
import {EVENT_COUNT} from './const.js';

const events = Array.from({length: EVENT_COUNT}, generateEvent);
const filters = generateFilter(events);

const siteBodyElement = document.querySelector('.page-body');
const siteHeaderElement = siteBodyElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteBodyElement.querySelector('.trip-controls__filters');
const siteContentElement = siteBodyElement.querySelector('.trip-events');

render(siteHeaderElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(siteFilterElement, new FilterView(filters), RenderPosition.BEFOREEND);
render(siteContentElement, new SiteSortingView(), RenderPosition.BEFOREEND);

const eventListComponent = new EventListView();
render(siteContentElement, eventListComponent, RenderPosition.BEFOREEND);

const renderEvent = (eventListElement, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(event);

  const replaceCardToForm = () => {
    replace(eventEditComponent, eventComponent);
  };

  const replaceFormToCard = () => {
    replace(eventComponent, eventEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  eventComponent.setEditClickHandler(() => {
    replaceCardToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.setEditClickHandler(() => {
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.setFormSubmitHandler(() => {
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });


  render(eventListElement, eventComponent, RenderPosition.BEFOREEND);
};

if (events.length > 0) {
  events.forEach((event) => renderEvent(eventListComponent, event));
} else {
  render(eventListComponent, new NoEventView(), RenderPosition.BEFOREEND);
}

render(siteContentElement, new createEventCreateTemplate(events[0]), RenderPosition.BEFOREEND);
