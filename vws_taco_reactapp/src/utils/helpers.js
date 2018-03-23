export const getNextDayOfWeek = (date, dayOfWeek) => {
  if (date.getDay() === dayOfWeek) {
    date.setDate(date.getDate() + 1);
  }

  let resultDate = new Date(date.getTime());

  resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);

  return resultDate;
};
