import {FilterType} from '../const';
import {isEventFuture, isEventPast} from './event.js';

export const filter = {
  [FilterType.ALL]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => isEventFuture(event.dateFrom)).length,
  [FilterType.PAST]: (events) => events.filter((task) => isEventPast(task.dateFrom)).length,
};
