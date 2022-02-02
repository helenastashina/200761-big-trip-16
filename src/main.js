import SiteMenuView from './view/site-menu-view.js';
import FilterView from './view/site-filter-view.js';
import {render, RenderPosition} from './utils/render.js';
import {generateEvent} from './mock/event.js';
import {generateFilter} from './mock/filter.js';
import {EVENT_COUNT} from './const.js';
import TripPresenter from './presenter/trip-presenter';

const events = Array.from({length: EVENT_COUNT}, generateEvent);
const filters = generateFilter(events);

const siteBodyElement = document.querySelector('.page-body');
const siteHeaderElement = siteBodyElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteBodyElement.querySelector('.trip-controls__filters');
const siteContentElement = siteBodyElement.querySelector('.trip-events');

render(siteHeaderElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(siteFilterElement, new FilterView(filters), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(siteContentElement);
tripPresenter.init(events);
