import SiteMenuView from './view/site-menu-view.js';
import StatisticsView from './view/statistics-view.js';
import {render, RenderPosition, remove} from './utils/render.js';
import {generateEvent} from './mock/event.js';
import {EVENT_COUNT, MenuItem} from './const.js';
import TripPresenter from './presenter/trip-presenter';
import FilterPresenter from './presenter/filter-presenter.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';

const events = Array.from({length: EVENT_COUNT}, generateEvent);

const eventsModel = new EventsModel();
eventsModel.events = events;

const filterModel = new FilterModel();

const siteBodyElement = document.querySelector('.page-body');
const siteHeaderElement = siteBodyElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteBodyElement.querySelector('.trip-controls__filters');
const siteContentElement = siteBodyElement.querySelector('.trip-events');
const siteMenuComponent = new SiteMenuView();

render(siteHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(siteContentElement, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, eventsModel);

const handleEventNewFormClose = () => {
  siteMenuComponent.element.querySelectorAll('.trip-tabs__btn').forEach((link) => {
    link.disabled = false;
  });
  siteMenuComponent.setMenuItem(MenuItem.TABLE);
};

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_EVENT:
      tripPresenter.destroy();
      tripPresenter.init();
      siteMenuComponent.element.querySelectorAll('.trip-tabs__btn').forEach((link) => {
        link.disabled = true;
      });
      tripPresenter.createEvent(handleEventNewFormClose);
      remove(statisticsComponent);
      break;
    case MenuItem.TABLE:
      tripPresenter.init();
      filterPresenter.init();
      remove(statisticsComponent);
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      filterPresenter.destroy();
      statisticsComponent = new StatisticsView(eventsModel.events);
      render(siteContentElement, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
tripPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createEvent();
});
