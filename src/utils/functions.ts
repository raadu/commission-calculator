import moment, { Moment } from "moment";

var enumerateDaysBetweenDates = function (startDate: Moment, endDate: Moment) {
  var dates = [];

  var currDate = moment(startDate).startOf("day");
  var lastDate = moment(endDate).startOf("day");

  while (currDate.add(1, "days").diff(lastDate) < 0) {
    console.log(currDate.toDate());
    dates.push(currDate.clone().toDate());
  }

  return dates;
};

export const calculateCashInFee = (
  amount: number,
  configData: Record<string, any>,
) => {
  let commissionAmount = null;

  if (amount > 0) {
    commissionAmount = (amount * configData.percents) / 100;
  } else {
    commissionAmount = 0;
  }

  if (commissionAmount > configData.max.amount) {
    commissionAmount = 5;
  }

  return commissionAmount;
};

export const calculateCashOutNaturalFee = (
  amount: number,
  configData: Record<string, any>,
  date: string,
  transactionHistory: Record<string, any>[] | null,
  userId: number,
) => {
  let commissionAmount = null;

  console.log("date", date);
  console.log("transactionHistory", transactionHistory);
  console.log("userId", userId);

  var currentDate = moment();
  var weekStart = currentDate.startOf("week");
  console.log("weekStart", weekStart);
  const daysPast = enumerateDaysBetweenDates(currentDate, weekStart);
  console.log("daysPast", daysPast);

  if (amount > 0) {
    commissionAmount = (amount * configData.percents) / 100;
  } else {
    commissionAmount = 0;
  }

  return commissionAmount;
};

export const calculateCashOutJuridicalFee = (
  amount: number,
  configData: Record<string, any>,
) => {
  let commissionAmount = null;

  if (amount > 0) {
    commissionAmount = (amount * configData.percents) / 100;
  } else {
    commissionAmount = 0;
  }

  if (commissionAmount < configData.min.amount) {
    commissionAmount = 0.5;
  }

  return commissionAmount;
};
