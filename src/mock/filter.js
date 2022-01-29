import {isEventFuture, isEventPast} from '../utils.js';

const eventToFilterMap = {
  Everything: (events) => events,
  Future: (events) => events
    .filter((event) => isEventFuture(event.dateFrom)).length,
  Past: (events) => events
    .filter((task) => isEventPast(task.dateFrom)).length,
};

export const generateFilter = () => Object.entries(eventToFilterMap).map(
  ([filterName]) => ({
    name: filterName,
  }),
);
