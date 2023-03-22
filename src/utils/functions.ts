import moment from "moment";
import { calculateCashOutNaturalFeeProps } from 'types/functionTypes';

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
  // Actual start of week is Sunday
  const actualStartOfWeek = moment(inputDateObject).startOf("week");
  // Custom start of week will be assigned to startOfWeek
  let startOfWeek = null;

  // If the input date is Sunday, then the start of week will be the previous Monday
  // Else, the start of week will be next day of sunday (monday)
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

export const calculateCashOutNaturalFee = (props: calculateCashOutNaturalFeeProps) => {
  // Props
  const { amount, configData, date, transactionHistory, userId } = props;

  // Commission Amount Track
  let commissionAmount = null;

  if(amount<=0) commissionAmount = 0;

  if (amount > 0) {
    // Dates passed in week from the given date, including given date
    const datesPassedInWeek = getDatesPassedInWeek(date);

    // Total cashout transaction amount in the week for selected natiral user
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

    // LOGIC:
    // If totalTransactionInWeek is greater or equal to 1000, then apply the commission percentage
    // Else, if totalTransactionInWeek is less than 1000, then check if the totalTransactionInWeek + amount is less than 1000
    // If transactionSum is less than 1000, then no commission
    // Else, if transactionSum is greater than 1000, then apply the commission percentage in applicable amount
    if (totalTransactionInWeek >= 1000) {
      commissionAmount = (amount * configData.percents) / 100;
    } else if (totalTransactionInWeek < 1000) {
      // Get total transaction amount in a week including current transaction
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
