import AbstractView from './abstract-view.js';

const createFilterItemTemplate = (filter, isChecked) => {
  const {name} = filter;

  return (
    `<div class="trip-filters__filter">
      <input
        id="filter-${name.toLowerCase()}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${name.toLowerCase()}"
        ${isChecked ? 'checked' : ''}
      >
      <label class="trip-filters__filter-label" for="filter-everything">${name}</label>
    </div>`
  );
};

const createSiteFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');

  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

export default class FilterView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createSiteFilterTemplate(this.#filters);
  }
}
