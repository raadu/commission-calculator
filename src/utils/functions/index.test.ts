import {
  checkIsArrayAndHasValue,
  getDatesPassedInWeek,
  convertToCeiling,
  modifyFinalCommision,
  calculateCashInFee,
  calculateCashOutJuridicalFee,
  calculateCashOutNaturalFee,
} from "./index";
import {
  cashInConfigData,
  cashOutJuridicalConfigData,
  cashOutNaturalPropsA,
  cashOutNaturalPropsB,
  cashOutNaturalPropsC,
  cashOutNaturalPropsD,
  cashOutNaturalPropsE,
  cashOutNaturalPropsF,
} from "utils/dummyData";

// checkIsArrayAndHasValue function tests
describe("checkIsArrayAndHasValue checks if given data is an array or not", () => {
  it("Should return false, if empty object is given", () => {
    const res = checkIsArrayAndHasValue({});
    expect(res).toBe(false);
  });

  it("Should return false, if object with key-value is given", () => {
    const res = checkIsArrayAndHasValue({
      id: 7,
      data: ["Test1", "Test2", "Test3"],
    });
    expect(res).toBe(false);
  });

  it("Should return false, if string is given", () => {
    const res = checkIsArrayAndHasValue("Check This String");
    expect(res).toBe(false);
  });

  it("Should return false, if number is given", () => {
    const res = checkIsArrayAndHasValue(580);
    expect(res).toBe(false);
  });

  it("Should return false, if empty array is given", () => {
    const res = checkIsArrayAndHasValue([]);
    expect(res).toBe(false);
  });

  it("Should return true, if array with data is given", () => {
    const res = checkIsArrayAndHasValue(["Data1", 290, "Hello", "Test"]);
    expect(res).toBe(true);
  });

  it("Should return true, if array with only one data is given", () => {
    const res = checkIsArrayAndHasValue([{ id: 7, name: "Test" }]);
    expect(res).toBe(true);
  });
});

// getDatesPassedInWeek function tests
describe("getDatesPassedInWeek returns the dates passed in a week before the given date, including the given date.", () => {
  it("Should return empty array, if random string is given", () => {
    const res = getDatesPassedInWeek("random string");
    expect(res).toStrictEqual([]);
  });

  it("Should return empty array, if date format given DD-MM-YYYY", () => {
    const res = getDatesPassedInWeek("7-12-2021");
    expect(res).toStrictEqual([]);
  });

  it("Should return empty array, if date format given MM-DD-YYYY", () => {
    const res = getDatesPassedInWeek("12-7-2021");
    expect(res).toStrictEqual([]);
  });

  it("Should return array with dates 20,21,22,23 if date is given 23, March 2023", () => {
    const res = getDatesPassedInWeek("2023-03-23");
    expect(res).toStrictEqual([
      "2023-03-20",
      "2023-03-21",
      "2023-03-22",
      "2023-03-23",
    ]);
  });

  it("The date given (26 March, 2023) is Sunday. It Should return dates: 20,21,22,23,24,25,26", () => {
    const res = getDatesPassedInWeek("2023-03-26");
    expect(res).toStrictEqual([
      "2023-03-20",
      "2023-03-21",
      "2023-03-22",
      "2023-03-23",
      "2023-03-24",
      "2023-03-25",
      "2023-03-26",
    ]);
  });
});

// convertToCeiling function tests
describe("convertToCeiling converts the given number to the nearest ceiling number", () => {
  it("Should return 0, if 0 is given", () => {
    const res = convertToCeiling(0);
    expect(res).toBe(0);
  });

  it("Should return 0.1, if 0.1 is given", () => {
    const res = convertToCeiling(0.1);
    expect(res).toBe(0.1);
  });

  it("Should return 0.9, if 0.9 is given", () => {
    const res = convertToCeiling(0.9);
    expect(res).toBe(0.9);
  });

  it("Should return 0.03, if 0.021 is given", () => {
    const res = convertToCeiling(0.021);
    expect(res).toBe(0.03);
  });

  it("Should return 10.13, if 10.122784 is given", () => {
    const res = convertToCeiling(10.122784);
    expect(res).toBe(10.13);
  });

  it("Should return 1, if 0.999 is given", () => {
    const res = convertToCeiling(0.999);
    expect(res).toBe(1);
  });
});

// modifyFinalCommision function tests
describe("modifyFinalCommision converts given amount in Euro and Euro Cents", () => {
  it("Should return 0 euro, if 0 is given", () => {
    const res = modifyFinalCommision(0);
    expect(res).toBe("0 euro");
  });

  it("Should return 1000 euros, if 1000 is given", () => {
    const res = modifyFinalCommision(1000);
    expect(res).toBe("1000 euros");
  });

  it("Should return 30019 euros 73 cents, if 30019.728 is given", () => {
    const res = modifyFinalCommision(30019.728);
    expect(res).toBe("30019 euros 73 cents");
  });

  it("Should return 10 cents, if 0.1 is given", () => {
    const res = modifyFinalCommision(0.1);
    expect(res).toBe("10 cents");
  });

  it("Should return 1 cent, if 0.01 is given", () => {
    const res = modifyFinalCommision(0.01);
    expect(res).toBe("1 cent");
  });

  it("Should return 1 cent, if 0.006 is given", () => {
    const res = modifyFinalCommision(0.006);
    expect(res).toBe("1 cent");
  });
});

// calculateCashInFee function tests
describe("calculateCashInFee returns cash in commission fee for given amount", () => {
  it("Should return 0, if 0 is given", () => {
    const res = calculateCashInFee(0, cashInConfigData);
    expect(res).toBe(0);
  });

  it("Should return  0.0003, if 1 is given", () => {
    const res = calculateCashInFee(1, cashInConfigData);
    expect(res).toBe(0.0003);
  });

  it("Should return 0.3, if 1000 is given", () => {
    const res = calculateCashInFee(1000, cashInConfigData);
    expect(res).toBe(0.3);
  });

  it("Should return 5, if 100000 is given", () => {
    const res = calculateCashInFee(100000, cashInConfigData);
    expect(res).toBe(5);
  });
});

// calculateCashOutJuridicalFee function tests
describe("calculateCashOutJuridicalFee returns cash out commission fee for given amount of legal person", () => {
  it("Should return 0.5, if 0 is given", () => {
    const res = calculateCashOutJuridicalFee(0, cashOutJuridicalConfigData);
    expect(res).toBe(0.5);
  });

  it("Should return 0.5, if 1 is given", () => {
    const res = calculateCashOutJuridicalFee(1, cashOutJuridicalConfigData);
    expect(res).toBe(0.5);
  });

  it("Should return 3, if 1000 is given", () => {
    const res = calculateCashOutJuridicalFee(1000, cashOutJuridicalConfigData);
    expect(res).toBe(3);
  });

  it("Should return 0.5, if 0.67 is given", () => {
    const res = calculateCashOutJuridicalFee(0.67, cashOutJuridicalConfigData);
    expect(res).toBe(0.5);
  });

  it("Should return 3000, if 1000000 is given", () => {
    const res = calculateCashOutJuridicalFee(
      1000000,
      cashOutJuridicalConfigData,
    );
    expect(res).toBe(3000);
  });
});

// calculateCashOutNaturalFee function tests
describe("calculateCashOutNaturalFee returns cash out commission fee for given amount of natural person", () => {
  it("Should return 87 when amount: 30000, date: 2016-01-06, userId: 1", () => {
    const res = calculateCashOutNaturalFee(cashOutNaturalPropsA);
    expect(res).toBe(87);
  });

  it("Should return 3 when amount: 1000, date: 2016-01-07, userId: 1", () => {
    const res = calculateCashOutNaturalFee(cashOutNaturalPropsB);
    expect(res).toBe(3);
  });

  it("Should return 0.3 when amount: 100, date: 2016-01-07, userId: 1", () => {
    const res = calculateCashOutNaturalFee(cashOutNaturalPropsC);
    expect(res).toBe(0.3);
  });

  it("Should return 0.3 when amount: 100, date: 2016-01-10, userId: 1", () => {
    const res = calculateCashOutNaturalFee(cashOutNaturalPropsD);
    expect(res).toBe(0.3);
  });

  it("Should return 0 when amount: 1000, date: 2016-01-10, userId: 3", () => {
    const res = calculateCashOutNaturalFee(cashOutNaturalPropsE);
    expect(res).toBe(0);
  });

  it("Should return 0 when amount: 300, date: 2016-01-15, userId: 1", () => {
    const res = calculateCashOutNaturalFee(cashOutNaturalPropsF);
    expect(res).toBe(0);
  });
});
