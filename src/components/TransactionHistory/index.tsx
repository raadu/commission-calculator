import { Descriptions, Tag } from "antd";

type TransactionHistoryProps = {
  history: Record<string, any>[];
};

const TransactionHistory = (props: TransactionHistoryProps) => {
  // Props
  const { history } = props;

  return (
    <div style={{ height: "100vh", overflow: "auto" }}>
      <h3 style={{ textAlign: "center" }}>Transaction History</h3>
      <Descriptions bordered column={1}>
        {history?.map((item, index) => {
          return (
            <Descriptions.Item
              label={
                <div style={{ textAlign: "center" }}>
                  {item?.type === "cash_out" ? (
                    <Tag color="purple">CASH OUT</Tag>
                  ) : (
                    <Tag color="cyan">CASH IN</Tag>
                  )}

                  <h3>{`${item?.amount} €`}</h3>
                </div>
              }
              key={index}
            >
              <strong>Date:</strong> {item?.date} <br />
              <strong>User ID: </strong>
              {item?.user_id} <br />
              <strong>User Type:</strong>{" "}
              {item?.user_type.charAt(0).toUpperCase() +
                item?.user_type.slice(1)}{" "}
              <br />
              <strong>Commission:</strong> {`${item?.commission} €`} <br />
            </Descriptions.Item>
          );
        })}
      </Descriptions>
    </div>
  );
};

export default TransactionHistory;
