import { Card } from "antd";
import CommissionForm from "components/CommissionForm";

const RootComponent = () => {
  const onCalculate = (values: Record<string, any>) => {
    console.log("values", values);
    const formattedDate = values.date.format("YYYY-MM-DD");
    console.log("formattedDate", formattedDate);
  };

  return (
    <div className="centerDiv">
      <Card bordered={true} style={{ width: 450 }}>
        <CommissionForm onCalculate={onCalculate} />
      </Card>
    </div>
  );
};

export default RootComponent;
