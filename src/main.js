import {createSiteMenuTemplate} from './view/site-menu-view.js';
import {createSiteFilterTemplate} from './view/site-filter-view.js';
import {createSiteSortingTemplate} from './view/site-sorting-view.js';
import {createEventCreateTemplate} from './view/event-create-view';
import {createEventEditTemplate} from './view/event-edit-view.js';
import {createEventPointTemplate} from './view/event-point-view';
import {renderTemplate, RenderPosition} from './render.js';

const EVENT_COUNT = 3;

const siteBodyElement = document.querySelector('.page-body');
const siteHeaderElement = siteBodyElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteBodyElement.querySelector('.trip-controls__filters');
const siteContentElement = siteBodyElement.querySelector('.trip-events');

renderTemplate(siteHeaderElement, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteFilterElement, createSiteFilterTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteContentElement, createSiteSortingTemplate(), RenderPosition.BEFOREEND);

renderTemplate(siteContentElement, createEventEditTemplate(), RenderPosition.BEFOREEND);

for (let i = 0; i < EVENT_COUNT; i++) {
  renderTemplate(siteContentElement, createEventPointTemplate(), RenderPosition.BEFOREEND);
}

renderTemplate(siteContentElement, createEventCreateTemplate(), RenderPosition.BEFOREEND);
