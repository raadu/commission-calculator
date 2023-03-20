import { Card } from "antd";
import CommissionForm from "components/CommissionForm";
import { useEffect, useState } from "react";
import { useFetch } from "utils/customHooks/api-service";
import {
  CASH_IN_ENDPOINT,
  CASH_OUT_NATURAL_ENDPOINT,
  CASH_OUT_JURIDICAL_ENDPOINT,
} from "utils/endpoints";
import {
  calculateCashInFee,
  calculateCashOutNaturalFee,
  calculateCashOutJuridicalFee,
} from "utils/functions";

const RootComponent = () => {
  // States
  const [commissionAmount, setCommissionAmount] = useState<number | null>(null);
  const [transactionHistory, setTransactionHistory] = useState<
    Record<string, any>[] | []
  >([]);

  // Hooks
  const [cashInResponse, cashInGet] = useFetch();
  const [cashOutNaturalResponse, cashOutNaturalGet] = useFetch();
  const [cashOutJuridicalResponse, cashOutJuridicalGet] = useFetch();

  console.log("cashOutNaturalResponse", cashOutNaturalResponse);
  console.log("transactionHistory", transactionHistory);

  // Effects
  useEffect(() => {
    cashInGet(CASH_IN_ENDPOINT);
    cashOutNaturalGet(CASH_OUT_NATURAL_ENDPOINT);
    cashOutJuridicalGet(CASH_OUT_JURIDICAL_ENDPOINT);
  }, [cashInGet, cashOutJuridicalGet, cashOutNaturalGet]);

  const onCalculate = (values: Record<string, any>) => {
    console.log("values", values);
    const formattedDate = values.date.format("YYYY-MM-DD");
    console.log("formattedDate", formattedDate);
    let calculatedCommission: number | null = null;

    if (values.type === "cash_in") {
      calculatedCommission = calculateCashInFee(
        values.amount,
        cashInResponse.data.data,
      );
    }

    if (values.type === "cash_out") {
      if (values.user_type === "natural") {
        calculatedCommission = calculateCashOutNaturalFee(
          values.amount,
          cashOutNaturalResponse.data.data,
          formattedDate,
          transactionHistory,
          values.user_id,
        );
      }

      if (values.user_type === "juridical") {
        calculatedCommission = calculateCashOutJuridicalFee(
          values.amount,
          cashOutJuridicalResponse.data.data,
        );
      }
    }

    setCommissionAmount(calculatedCommission);
    setTransactionHistory((prev) => [
      ...prev,
      { ...values, commission: calculatedCommission },
    ]);
  };

  return (
    <div className="centerDiv">
      <Card bordered={true} style={{ width: 450 }}>
        <CommissionForm onCalculate={onCalculate} />
        <div>{commissionAmount}</div>
      </Card>
    </div>
  );
};

export default RootComponent;
