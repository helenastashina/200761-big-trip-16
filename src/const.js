export const EVENT_COUNT = 20;
export const TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
export const DESTINATIONS = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
export const OFFERS = [
  {
    'id': 1,
    'title': 'Add luggage',
    'price': 50,
  }, {
    'id': 2,
    'title': 'Switch to comfort',
    'price': 80,
  },{
    'id': 3,
    'title': 'Add meal',
    'price': 15,
  },{
    'id': 4,
    'title': 'Choose seats',
    'price': 5,
  },{
    'id': 5,
    'title': 'Travel by train',
  },
];
export const DEFAULT_TYPE = 'Taxi';
export const DEFAULT_PHOTO_SRC = 'http://picsum.photos/248/152?r=';
export const DEFAULT_DESCRIPTION = 'Destination photo';
export const MIN_PRICE = 100;
export const MAX_PRICE = 10000;
export const MAX_PHOTO_COUNT = 10;
export const MAX_PHOTO_INDEX = 20;
export const MIN_DAYS_GAP = 7;
export const MAX_DAYS_GAP = 10;
export const BAR_HEIGHT = 55;

export const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
export const SortType = {
  DEFAULT: 'default',
  SORT_PRICE: 'sort-price',
  SORT_EVENT: 'sort-event',
  SORT_DAY: 'sort-day',
  SORT_TIME: 'sort-time',
  SORT_OFFER: 'sort-offer',
};

export const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const FilterType = {
  ALL: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const MenuItem = {
  TABLE: 'Table',
  STATS: 'Stats',
  ADD_NEW_EVENT: 'New event',
};

export const ChartConfigs = {
  TYPE: 'horizontalBar',
  BACKGROUND_COLOR: '#ffffff',
  BAR_HEIGHT: 55,
  FONT_SIZE: 13,
  TITLE_FONT_SIZE: 23,
  MONEY_CHART_TITLE: 'MONEY',
  TRANSPORT_CHART_TITLE: 'TYPE',
  TIME_SPEND_CHART_TITLE: 'TIME-SPEND',
  COLOR: '#000000',
  BAR_THICKNESS: 44,
  PADDING: 5,
  MIN_BAR_LENGTH: 50,
  PADDING_LEFT: 35,
  ANCHOR_DATA: 'start',
  ANCHOR_DATA_LABELS: 'end',
  ANCHOR: 'end',
  ALIGN: 'start',
  POSITION: 'left',
};

export const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export const AUTHORIZATION = 'Basic ewrgrgrerehr324';
export const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';
