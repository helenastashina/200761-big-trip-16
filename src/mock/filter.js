import {isPointFuture, isPointPast} from '../utils.js';

const pointToFilterMap = {
  Everything: (points) => points,
  Future: (points) => points
    .filter((point) => isPointFuture(point.dateFrom)).length,
  Past: (points) => points
    .filter((task) => isPointPast(task.dateFrom)).length,
};

export const generateFilter = () => Object.entries(pointToFilterMap).map(
  ([filterName]) => ({
    name: filterName,
  }),
);
