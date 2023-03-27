import moment from "moment";
import { CalculateCashOutNaturalFeeProps } from "types/functionTypes";

export const checkIsArrayAndHasValue = (data: any) => {
  if (data && Array.isArray(data) && data.length > 0) {
    return true;
  }

  return false;
};

export const getDatesPassedInWeek = (inputDate: string) => {
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  if (!dateRegex.test(inputDate)) return [];

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

  const clonedStartOfWeek = startOfWeek.clone();

  while (clonedStartOfWeek.isSameOrBefore(inputDateObject)) {
    // Add the current or past date of the week to the array
    datesTrack.push(clonedStartOfWeek.format("YYYY-MM-DD"));

    // Move to the next day
    clonedStartOfWeek.add(1, "day");
  }

  return datesTrack;
};

export const convertToCeiling = (amount: number) => {
  return Math.ceil(amount * 100) / 100;
};

export const modifyFinalCommision = (commission: number) => {
  const roundedEuro = convertToCeiling(commission);
  const euro = Math.floor(roundedEuro);
  const cents = Math.round((roundedEuro - euro) * 100);
  const centString = cents > 0 ? `${cents} cent${cents !== 1 ? "s" : ""}` : "";
  let euroString = "";

  if (euro > 0) {
    euroString = `${euro} euro${euro > 1 ? "s" : ""}`;
  } else if (commission === 0) {
    euroString = `0 euro`;
  } else {
    euroString = "";
  }

  return `${euroString}${euroString && centString ? " " : ""}${centString}`;
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
  props: CalculateCashOutNaturalFeeProps,
) => {
  // Props
  const { amount, configData, date, transactionHistory, userId } = props;

  // Commission Amount Track
  let commissionAmount = null;

  if (amount <= 0) commissionAmount = 0;

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
          const result = accumulator + currentValue.amount;
          return result;
        }

        return accumulator;
      },
      0,
    );

    totalTransactionInWeek = totalTransactionInWeek || 0;

    // LOGIC:
    // If totalTransactionInWeek is greater or equal to 1000, then apply the commission percentage
    // Else, if totalTransactionInWeek is less than 1000, then check if the totalTransactionInWeek + amount is less than 1000
    // If transactionSum is less than 1000, then no commission
    // Else, if transactionSum is greater than 1000, then apply the commission percentage in applicable amount
    if (totalTransactionInWeek >= configData.week_limit.amount) {
      commissionAmount = (amount * configData.percents) / 100;
    } else if (totalTransactionInWeek < configData.week_limit.amount) {
      // Get total transaction amount in a week including current transaction
      const transactionSum = totalTransactionInWeek
        ? totalTransactionInWeek + amount
        : amount;

      if (transactionSum <= configData.week_limit.amount) {
        commissionAmount = 0;
      } else if (transactionSum > configData.week_limit.amount) {
        const commissionApplicableAmount =
          amount - configData.week_limit.amount;
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
