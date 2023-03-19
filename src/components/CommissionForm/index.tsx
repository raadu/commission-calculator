import { Form, Row, Col, InputNumber, DatePicker, Select, Button } from "antd";
import { USER_TYPES, OPERATION_TYPES } from "utils/constants";

type CommisionFormProps = {
  onCalculate: (values: Record<string, any>) => void;
};

function CommissionForm(props: CommisionFormProps) {
  // Props
  const { onCalculate } = props;

  // Antd Constants
  const [commissionForm] = Form.useForm();
  const { Option } = Select;

  return (
    <Form form={commissionForm} layout="vertical" onFinish={onCalculate}>
      <Row>
        <Col span={24}>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please input amount",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            label="Date"
            name="date"
            rules={[
              {
                required: true,
                message: "Please select a date",
              },
            ]}
          >
            <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={6}>
        <Col span={12}>
          <Form.Item
            label="User Type"
            name="user_type"
            rules={[
              {
                required: true,
                message: "Please select user type",
              },
            ]}
          >
            <Select placeholder="Select User Type" style={{ width: "100%" }}>
              {USER_TYPES.map((userType: Record<string, any>) => {
                return (
                  <Option key={userType.id} value={userType.value}>
                    {userType.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Operation Type"
            name="type"
            rules={[
              {
                required: true,
                message: "Please select operation type",
              },
            ]}
          >
            <Select
              placeholder="Select Operation Type"
              style={{ width: "100%" }}
            >
              {OPERATION_TYPES.map((operationType: Record<string, any>) => {
                return (
                  <Option key={operationType.id} value={operationType.value}>
                    {operationType.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      {/* center the button */}
      <div style={{ textAlign: "center" }}>
        <Button type="primary" htmlType="submit">
          Calculate
        </Button>
      </div>
    </Form>
  );
}

export default CommissionForm;
