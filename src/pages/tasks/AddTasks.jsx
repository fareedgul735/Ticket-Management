import { Button, Col, Form, Input, Row, Select } from "antd";
import { TICKET_PRIORITIES, TICKET_STATUSES } from "../../lib/constant";
import { useSelector } from "react-redux";
import { collection, db } from "../../lib/firebase";

const AddTasks = () => {
  const { userId } = useSelector((state) => state.user);
  const onDataSuccessfully = (data) => {
    console.log(data);
  };

  const fetchDataUser = () => {
    const adminId = userId;
    const parsedData = [];
    try {
      const collectionRef = collection(db);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="ticket-form">
      <Form onFinish={onDataSuccessfully}>
        <Row gutter={6}>
          <Col sm={24}>
            <Form.Item
              label="Name"
              name={"name"}
              rules={[
                {
                  required: true,
                  whitespace: true,
                },
                {
                  min: 2,
                },
                {
                  max: 25,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sm={24}>
            <Form.Item
              label="Priority"
              name={"priority"}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select options={TICKET_PRIORITIES} />
            </Form.Item>
          </Col>
          <Col sm={24}>
            <Form.Item
              label="Status"
              name={"status"}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select options={TICKET_STATUSES} />
            </Form.Item>
          </Col>
          <Col sm={24}>
            <Form.Item
              label="Assigned To"
              name={"assignedTo"}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select />
            </Form.Item>
          </Col>
          <Col md={12} sm={24} offset={12}>
            <Form.Item style={{ textAlign: "right" }}>
              <Button type="primary" htmlType="submit" ali>
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddTasks;
