import { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import moment from "moment";
import CommissionForm from "components/CommissionForm";
import TransactionHistory from "components/TransactionHistory";
import Result from "components/Result";
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
import { checkIsArrayAndHasValue } from "utils/functions";

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

  // Effects
  useEffect(() => {
    // Get all config data from API
    cashInGet(CASH_IN_ENDPOINT);
    cashOutNaturalGet(CASH_OUT_NATURAL_ENDPOINT);
    cashOutJuridicalGet(CASH_OUT_JURIDICAL_ENDPOINT);
  }, [cashInGet, cashOutJuridicalGet, cashOutNaturalGet]);

  const onCalculate = (values: Record<string, any>) => {
    const formattedDate = moment(values.date).format("YYYY-MM-DD");
    let calculatedCommission: number | null = null;

    // For Cash In
    if (values.type === "cash_in") {
      calculatedCommission = calculateCashInFee(
        values.amount,
        cashInResponse.data.data,
      );
    }

    // For Cash Out
    if (values.type === "cash_out") {
      // For Natural User
      if (values.user_type === "natural") {
        // Props for calculateCashOutNaturalFee function
        const props = {
          amount: values.amount,
          configData: cashOutNaturalResponse.data.data,
          date: formattedDate,
          transactionHistory: transactionHistory,
          userId: values.user_id,
        };

        calculatedCommission = calculateCashOutNaturalFee(props);
      }

      // For Legal User
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
    <Row>
      <Col span={checkIsArrayAndHasValue(transactionHistory) ? 18 : 24}>
        <div className="centerDiv">
          <Card bordered={true} style={{ width: 450 }}>
            <div className="formTitle">Commission Calculator</div>
            <CommissionForm onCalculate={onCalculate} />
            <Result commissionAmount={commissionAmount} />
          </Card>
        </div>
      </Col>
      <Col span={checkIsArrayAndHasValue(transactionHistory) ? 6 : 0}>
        <TransactionHistory history={transactionHistory} />
      </Col>
    </Row>
  );
};

export default RootComponent;
