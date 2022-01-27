import dayjs from 'dayjs';
import {TYPES, DESTINATIONS, OFFERS} from '../const.js';
import {getRandomInteger} from '../utils.js';

const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const generateDate = () => {
  const minDaysGap = getRandomInteger(0, 7);
  const maxDaysGap = getRandomInteger(minDaysGap, 10);

  return {
    dateFrom: dayjs().add(minDaysGap, 'day').format() ,
    dateTo: dayjs().add(maxDaysGap, 'day').format()
  };
};

const getRandomDestination = () => {
  const randomIndex = getRandomInteger(0, DESTINATIONS.length - 1);

  return DESTINATIONS[randomIndex];
};

const getRandomType = () => {
  const randomIndex = getRandomInteger(0, TYPES.length - 1);

  return TYPES[randomIndex];
};

const getOffers = (offerType) => {
  const randomCount = getRandomInteger(0, OFFERS.length);

  return {
    'type': offerType,
    'offers': randomCount > 0 ? OFFERS.slice(0, randomCount - 1): [],
  };
};

const getRandomPhoto = () => {
  const randomIndex = getRandomInteger(0, 20);
  return {
    'src': `http://picsum.photos/248/152?r=${randomIndex}`,
    'description': 'title'
  };
};

export const generatePoint = () => {
  const pointType = getRandomType();
  const randomDate = generateDate();

  return {
    id: 0,
    type: pointType,
    destination: {
      name: getRandomDestination(),
      description: generateDescription(),
      pictures: Array.from({length: getRandomInteger(1, 10)}, getRandomPhoto),
    },
    offers: getOffers(pointType),
    basePrice: getRandomInteger(100, 10000),
    dateFrom: randomDate.dateFrom,
    dateTo: randomDate.dateTo,
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
