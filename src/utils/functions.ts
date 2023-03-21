import moment from "moment";

export const checkIsArrayAndHasValue = (data: any) => {
  if (data && Array.isArray(data) && data.length > 0) {
    return true;
  } else {
    return false;
  }
};

export const getDatesPassedInWeek = (inputDate: string) => {
  const datesTrack = [];
  const inputDateObject = moment(inputDate, "YYYY-MM-DD");
  const actualStartOfWeek = moment(inputDateObject).startOf("week");
  let startOfWeek = null;

  // Start the week on Monday
  if (inputDateObject.isSame(actualStartOfWeek)) {
    startOfWeek = moment(inputDateObject).startOf("week").subtract(6, "days");
  } else {
    startOfWeek = moment(inputDateObject).startOf("week").add(1, "days");
  }

  let clonedStartOfWeek = startOfWeek.clone();

  while (clonedStartOfWeek.isSameOrBefore(inputDateObject)) {
    // Add the current or past date of the week to the array
    datesTrack.push(clonedStartOfWeek.format("YYYY-MM-DD"));

    // Move to the next day
    clonedStartOfWeek.add(1, "day");
  }

  return datesTrack;
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

  if (amount > 0) {
    const datesPassedInWeek = getDatesPassedInWeek(date);

    let totalTransactionInWeek = transactionHistory?.reduce(
      (accumulator, currentValue) => {
        if (
          datesPassedInWeek.includes(currentValue.date) &&
          currentValue.type === "cash_out" &&
          currentValue.user_type === "natural" &&
          currentValue.user_id === userId
        ) {
          return (accumulator += currentValue.amount);
        } else {
          return accumulator;
        }
      },
      0,
    );

    totalTransactionInWeek = totalTransactionInWeek
      ? totalTransactionInWeek
      : 0;

    if (totalTransactionInWeek >= 1000) {
      commissionAmount = (amount * configData.percents) / 100;
    } else if (totalTransactionInWeek < 1000) {
      const transactionSum = totalTransactionInWeek
        ? totalTransactionInWeek + amount
        : amount;

      if (transactionSum <= 1000) {
        commissionAmount = 0;
      } else if (transactionSum > 1000) {
        const commissionApplicableAmount = amount - 1000;
        commissionAmount =
          (commissionApplicableAmount * configData.percents) / 100;
      }
    }
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
