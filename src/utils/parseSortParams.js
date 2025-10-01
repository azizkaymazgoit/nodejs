import {
  DEFAULT_PAGINATION_VALUES,
  SORT_FIELDS,
  SORT_ORDER,
} from '../constants/pagination.js';

const parseSortBy = (sortBy) => {
  if (SORT_FIELDS.includes(sortBy)) {
    return sortBy;
  }
  return DEFAULT_PAGINATION_VALUES.sortBy;
};

const parseSortOrder = (sortOrder) => {
  if (SORT_ORDER.includes(sortOrder)) {
    return sortOrder;
  }
  return DEFAULT_PAGINATION_VALUES.sortOrder;
};

export const parseSortParams = (query) => {
  const sortBy = parseSortBy(query.sortBy);
  const sortOrder = parseSortOrder(query.sortOrder);

  return {
    sortBy,
    sortOrder,
  };
};
