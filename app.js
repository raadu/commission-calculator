import fs from "fs";
import path from "path";
import { resolve } from "node:path";
import { argv, cwd } from "node:process";
import {
  checkIsArrayAndHasValue,
  calculateCashInFee,
  calculateCashOutNaturalFee,
  calculateCashOutJuridicalFee,
} from "./src/utils/functions/index.ts";
import { fileURLToPath } from "url";
import axios from "axios";
import {
  CASH_IN_ENDPOINT,
  CASH_OUT_NATURAL_ENDPOINT,
  CASH_OUT_JURIDICAL_ENDPOINT,
} from "./src/utils/endpoints.ts";
import * as dotenv from "dotenv";
import moment from "moment";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const relativePath = argv[2]; // Input file name
const absolutePath = resolve(cwd(), relativePath);
const filePath = path.join(__dirname, relativePath);

const cashInAPIEndpoint = `${process.env.REACT_APP_BASE_URL_ENDPOINT}${CASH_IN_ENDPOINT}`;
const cashOutNaturalAPIEndpoint = `${process.env.REACT_APP_BASE_URL_ENDPOINT}${CASH_OUT_NATURAL_ENDPOINT}`;
const cashOutJuridicalAPIEndpoint = `${process.env.REACT_APP_BASE_URL_ENDPOINT}${CASH_OUT_JURIDICAL_ENDPOINT}`;

const sendGetRequest = async (endpoint) => {
  try {
    const response = await axios.get(endpoint);
    if (response && response.status === 200) {
      return response.data;
    }
  } catch (error) {
    // Handle Error Here
    console.error("error", error);
  }
};

const cashInResponse = await sendGetRequest(cashInAPIEndpoint);
const cashOutNaturalResponse = await sendGetRequest(cashOutNaturalAPIEndpoint);
const cashOutJuridicalResponse = await sendGetRequest(
  cashOutJuridicalAPIEndpoint,
);

console.log('percents', cashInResponse.percents);


fs.readFile(filePath, { encoding: "utf-8" }, function (err, data) {
  if (!err) {
    const parsedData = JSON.parse(data);

    if (checkIsArrayAndHasValue(parsedData)) {
      parsedData.forEach((values) => {
        const formattedDate = moment(values.date).format("YYYY-MM-DD");
        let calculatedCommission = null;

        // For Cash In
        if (values.type === "cash_in") {
          calculatedCommission = calculateCashInFee(
            values.operation.amount,
            cashInResponse,
          );
        }

        // For Cash Out
        if (values.type === "cash_out") {
          // For Natural User
          if (values.user_type === "natural") {
            // Props for calculateCashOutNaturalFee function
            const props = {
              amount: values.operation.amount,
              configData: cashOutNaturalResponse,
              date: formattedDate,
              transactionHistory,
              userId: values.user_id,
            };

            calculatedCommission = calculateCashOutNaturalFee(props);
          }

          // For Legal User
          if (values.user_type === "juridical") {
            calculatedCommission = calculateCashOutJuridicalFee(
              values.operation.amount,
              cashOutJuridicalResponse,
            );
          }
        }

        console.log("calculatedCommission", values.type, values.operation.amount, calculatedCommission);
      });
    }
  } else {
    console.log(err);
  }
});
