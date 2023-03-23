import { Typography } from "antd";
import { modifyFinalCommision } from "utils/functions";

type ResultProps = {
  commissionAmount: number | null;
};

const Result = (props: ResultProps) => {
  // Props
  const { commissionAmount } = props;

  return (
    <>
      {commissionAmount !== null ? (
        <>
          <Typography.Title level={5} style={{ textAlign: "center" }}>
            Calculated Commission Is
          </Typography.Title>
          <Typography.Title level={2} mark style={{ textAlign: "center" }}>
            {`${modifyFinalCommision(commissionAmount)}`}
          </Typography.Title>
        </>
      ) : null}
    </>
  );
};

export default Result;
