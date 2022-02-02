import {MenuItem} from '../const.js';
import SmartView from './smart-view.js';

const createSiteMenuTemplate = (currentItem) => (
  `<nav class="trip-controls__trip-tabs trip-tabs">
     <a class="trip-tabs__btn ${currentItem === MenuItem.TABLE ? 'trip-tabs__btn--active' : ''}" data-item="${MenuItem.TABLE}" href="#">${MenuItem.TABLE}</a>
     <a class="trip-tabs__btn ${currentItem === MenuItem.STATS ? 'trip-tabs__btn--active' : ''}" data-item="${MenuItem.STATS}"  href="#">${MenuItem.STATS}</a>
  </nav>`
);

export default class SiteMenuView extends SmartView {

  constructor() {
    super();
    this._data.currentItem = MenuItem.TABLE;

    this.setMenuClickHandler(this._callback.menuClick);
  }

  restoreHandlers = () => {
    this.setMenuClickHandler(this._callback.menuClick);
  }

  get template() {
    return createSiteMenuTemplate(this._data.currentItem);
  }

  setMenuClickHandler = (callback) => {
    this._callback.menuClick = callback;
    this.element.querySelectorAll('.trip-tabs__btn').forEach((link) => {
      link.addEventListener('click', this.#menuClickHandler);
    });
  }

  #menuClickHandler = (evt) => {
    evt.preventDefault();

    this.updateData({
      currentItem: evt.target.dataset.item,
    });

    this._callback.menuClick(evt.target.dataset.item);
  }
}
