export const cashInConfigData = {
  percents: 0.03,
  max: {
    amount: 5,
    currency: "EUR",
  },
};

export const cashOutJuridicalConfigData = {
  percents: 0.3,
  min: {
    amount: 0.5,
    currency: "EUR",
  },
};

// Output 87
export const cashOutNaturalPropsA = {
  amount: 30000,
  configData: {
    percents: 0.3,
    week_limit: {
      amount: 1000,
      currency: "EUR",
    },
  },
  date: "2016-01-06",
  transactionHistory: [
    {
      amount: 200,
      currency: "EUR",
      date: "2016-01-05",
      user_id: 1,
      user_type: "natural",
      type: "cash_in",
      commission: 0.06,
    },
    {
      amount: 300,
      currency: "EUR",
      date: "2016-01-06",
      user_id: 2,
      user_type: "juridical",
      type: "cash_out",
      commission: 0.9,
    },
  ],
  userId: 1,
};

// Output 3
export const cashOutNaturalPropsB = {
  amount: 1000,
  configData: {
    percents: 0.3,
    week_limit: {
      amount: 1000,
      currency: "EUR",
    },
  },
  date: "2016-01-07",
  transactionHistory: [
    {
      amount: 200,
      currency: "EUR",
      date: "2016-01-05",
      user_id: 1,
      user_type: "natural",
      type: "cash_in",
      commission: 0.06,
    },
    {
      amount: 300,
      currency: "EUR",
      date: "2016-01-06",
      user_id: 2,
      user_type: "juridical",
      type: "cash_out",
      commission: 0.9,
    },
    {
      amount: 30000,
      currency: "EUR",
      date: "2016-01-06",
      user_id: 1,
      user_type: "natural",
      type: "cash_out",
      commission: 87,
    },
  ],
  userId: 1,
};

// output 0.3
export const cashOutNaturalPropsC = {
  amount: 100,
  configData: {
    percents: 0.3,
    week_limit: {
      amount: 1000,
      currency: "EUR",
    },
  },
  date: "2016-01-07",
  transactionHistory: [
    {
      amount: 200,
      currency: "EUR",
      date: "2016-01-05",
      user_id: 1,
      user_type: "natural",
      type: "cash_in",
      commission: 0.06,
    },
    {
      amount: 300,
      currency: "EUR",
      date: "2016-01-06",
      user_id: 2,
      user_type: "juridical",
      type: "cash_out",
      commission: 0.9,
    },
    {
      amount: 30000,
      currency: "EUR",
      date: "2016-01-06",
      user_id: 1,
      user_type: "natural",
      type: "cash_out",
      commission: 87,
    },
    {
      amount: 1000,
      currency: "EUR",
      date: "2016-01-07",
      user_id: 1,
      user_type: "natural",
      type: "cash_out",
      commission: 3,
    },
  ],
  userId: 1,
};

// output 0.3
export const cashOutNaturalPropsD = {
  amount: 100,
  configData: {
    percents: 0.3,
    week_limit: {
      amount: 1000,
      currency: "EUR",
    },
  },
  date: "2016-01-10",
  transactionHistory: [
    {
      amount: 200,
      currency: "EUR",
      date: "2016-01-05",
      user_id: 1,
      user_type: "natural",
      type: "cash_in",
      commission: 0.06,
    },
    {
      amount: 300,
      currency: "EUR",
      date: "2016-01-06",
      user_id: 2,
      user_type: "juridical",
      type: "cash_out",
      commission: 0.9,
    },
    {
      amount: 30000,
      currency: "EUR",
      date: "2016-01-06",
      user_id: 1,
      user_type: "natural",
      type: "cash_out",
      commission: 87,
    },
    {
      amount: 1000,
      currency: "EUR",
      date: "2016-01-07",
      user_id: 1,
      user_type: "natural",
      type: "cash_out",
      commission: 3,
    },
    {
      amount: 100,
      currency: "EUR",
      date: "2016-01-07",
      user_id: 1,
      user_type: "natural",
      type: "cash_out",
      commission: 0.3,
    },
  ],
  userId: 1,
};

// output 0
export const cashOutNaturalPropsE = {
  amount: 1000,
  configData: {
    percents: 0.3,
    week_limit: {
      amount: 1000,
      currency: "EUR",
    },
  },
  date: "2016-01-10",
  transactionHistory: [
    {
      amount: 200,
      currency: "EUR",
      date: "2016-01-05",
      user_id: 1,
      user_type: "natural",
      type: "cash_in",
      commission: 0.06,
    },
    {
      amount: 300,
      currency: "EUR",
      date: "2016-01-06",
      user_id: 2,
      user_type: "juridical",
      type: "cash_out",
      commission: 0.9,
    },
    {
      amount: 30000,
      currency: "EUR",
      date: "2016-01-06",
      user_id: 1,
      user_type: "natural",
      type: "cash_out",
      commission: 87,
    },
    {
      amount: 1000,
      currency: "EUR",
      date: "2016-01-07",
      user_id: 1,
      user_type: "natural",
      type: "cash_out",
      commission: 3,
    },
    {
      amount: 100,
      currency: "EUR",
      date: "2016-01-07",
      user_id: 1,
      user_type: "natural",
      type: "cash_out",
      commission: 0.3,
    },
    {
      amount: 100,
      currency: "EUR",
      date: "2016-01-10",
      user_id: 1,
      user_type: "natural",
      type: "cash_out",
      commission: 0.3,
    },
    {
      amount: 1000000,
      currency: "EUR",
      date: "2016-01-10",
      user_id: 2,
      user_type: "juridical",
      type: "cash_in",
      commission: 5,
    },
  ],
  userId: 3,
};

// output 0
export const cashOutNaturalPropsF = {
  amount: 300,
  configData: {
    percents: 0.3,
    week_limit: {
      amount: 1000,
      currency: "EUR",
    },
  },
  date: "2016-01-15",
  transactionHistory: [
    {
      amount: 200,
      currency: "EUR",
      date: "2016-01-05",
      user_id: 1,
      user_type: "natural",
      type: "cash_in",
      commission: 0.06,
    },
    {
      amount: 300,
      currency: "EUR",
      date: "2016-01-06",
      user_id: 2,
      user_type: "juridical",
      type: "cash_out",
      commission: 0.9,
    },
    {
      amount: 30000,
      currency: "EUR",
      date: "2016-01-06",
      user_id: 1,
      user_type: "natural",
      type: "cash_out",
      commission: 87,
    },
    {
      amount: 1000,
      currency: "EUR",
      date: "2016-01-07",
      user_id: 1,
      user_type: "natural",
      type: "cash_out",
      commission: 3,
    },
    {
      amount: 100,
      currency: "EUR",
      date: "2016-01-07",
      user_id: 1,
      user_type: "natural",
      type: "cash_out",
      commission: 0.3,
    },
    {
      amount: 100,
      currency: "EUR",
      date: "2016-01-10",
      user_id: 1,
      user_type: "natural",
      type: "cash_out",
      commission: 0.3,
    },
    {
      amount: 1000000,
      currency: "EUR",
      date: "2016-01-10",
      user_id: 2,
      user_type: "juridical",
      type: "cash_in",
      commission: 5,
    },
    {
      amount: 1000,
      currency: "EUR",
      date: "2016-01-10",
      user_id: 3,
      user_type: "natural",
      type: "cash_out",
      commission: 0,
    },
  ],
  userId: 1,
};
