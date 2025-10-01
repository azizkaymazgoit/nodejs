const parseNumber = (value) => {
  const par = Number(value);
  if (isNaN(par)) {
    return null;
  }
  return par;
};

const parseGender = (gender) => {
  const genders = ['male', 'female', 'other'];

  if (genders.includes(gender)) {
    return gender;
  }
  return null;
};

export const parseFilterParams = (query) => {
  const { gender, maxAge, minAge, maxAvgMark, minAvgMark } = query;

  const genderValue = parseGender(gender);
  const maxAgeValue = parseNumber(maxAge);
  const minAgeValue = parseNumber(minAge);
  const maxAvgMarkValue = parseNumber(maxAvgMark);
  const minAvgMarkValue = parseNumber(minAvgMark);

  return {
    gender: genderValue,
    maxAge: maxAgeValue,
    minAge: minAgeValue,
    maxAvgMark: maxAvgMarkValue,
    minAvgMark: minAvgMarkValue,
  };
};
