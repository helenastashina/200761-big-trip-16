import {createSiteMenuTemplate} from './view/site-menu-view.js';
import {createSiteFilterTemplate} from './view/site-filter-view.js';
import {createSiteSortingTemplate} from './view/site-sorting-view.js';
import {createEventCreateTemplate} from './view/event-create-view';
import {createEventEditTemplate} from './view/event-edit-view.js';
import {createEventPointTemplate} from './view/event-point-view';
import {renderTemplate, RenderPosition} from './render.js';
import {generatePoint} from './mock/point.js';
import {generateFilter} from './mock/filter.js';
import {POINT_COUNT} from './const.js';

const points = Array.from({length: POINT_COUNT}, generatePoint);
const filters = generateFilter(points);

const siteBodyElement = document.querySelector('.page-body');
const siteHeaderElement = siteBodyElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteBodyElement.querySelector('.trip-controls__filters');
const siteContentElement = siteBodyElement.querySelector('.trip-events');

renderTemplate(siteHeaderElement, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteFilterElement, createSiteFilterTemplate(filters), RenderPosition.BEFOREEND);
renderTemplate(siteContentElement, createSiteSortingTemplate(), RenderPosition.BEFOREEND);

renderTemplate(siteContentElement, createEventEditTemplate(points[0]), RenderPosition.BEFOREEND);

for (let i = 1; i < POINT_COUNT; i++) {
  renderTemplate(siteContentElement, createEventPointTemplate(points[i]), RenderPosition.BEFOREEND);
}

renderTemplate(siteContentElement, createEventCreateTemplate(points[0]), RenderPosition.BEFOREEND);
