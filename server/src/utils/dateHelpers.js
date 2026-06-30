// server/src/utils/dateHelpers.js
export const getNextRunDate = (currentDate, frequency) => {
  const date = new Date(currentDate);

  if (frequency === "daily") {
    date.setDate(date.getDate() + 1);
  } else if (frequency === "weekly") {
    date.setDate(date.getDate() + 7);
  } else if (frequency === "monthly") {
    date.setMonth(date.getMonth() + 1);
  }

  return date;
};
