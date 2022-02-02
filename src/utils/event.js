import dayjs from 'dayjs';

export const isEventFuture = (date) => date && dayjs(date).isAfter(dayjs(), 'M');

export const isEventPast = (date) => date && dayjs(date).isBefore(dayjs(), 'M');

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortEventByDay = (eventA, eventB) => {
  const weight = getWeightForNullDate(eventA.dateFrom, eventB.dateFrom);

  return weight ?? dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom));
};

export const sortEventByPrice = (eventA, eventB) => eventA.basePrice - eventB.basePrice;

export const sortEventByTime = (eventA, eventB) => {
  const durationA = dayjs(eventA.dateTo).diff(dayjs(eventA.dateFrom), 'minute');
  const durationB = dayjs(eventB.dateTo).diff(dayjs(eventB.dateFrom), 'minute');
  return durationA - durationB;
};

export const isPriceEqual = (priceA, priceB) => (priceA === null && priceB === null) || priceA === priceB;
