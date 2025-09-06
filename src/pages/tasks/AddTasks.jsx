import { Button, Col, Form, Input, Row, Select } from "antd";
import {
  DB_COLLECTION,
  TICKET_PRIORITIES,
  TICKET_STATUSES,
} from "../../lib/constant";
import { useSelector } from "react-redux";
import { collection, db, getDocs, query, where } from "../../lib/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AddTasks = () => {
  const { userId } = useSelector((state) => state.user);
  console.log(userId, "userId");

  const [fetchUserData, setFetchUserData] = useState([]);
  const navigate = useNavigate();

  const saveUserTaskDetailed = async (taskDetail, userId) => {
    const taskDetailedPayload = { userId, ...taskDetail };
    const collectionRef = collection(db, DB_COLLECTION.TICKETS);
    console.log(collectionRef, "collectionRef");

    await getDocs(collectionRef, taskDetailedPayload);
  };

  const onDataSuccessfully = async (data) => {
    const createdBy = userId;
    try {
      const assignedUser = fetchUserData.find(
        (u) => u.value === data.assignedTo
      );
      const payload = { ...data, assignedUser, createdAt: new Date() };
      
      await saveUserTaskDetailed(payload, createdBy);
      navigate("/tasks");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDataUser = async () => {
    const createdBy = userId;
    const parsedData = [];
    try {
      const collectionRef = collection(db, DB_COLLECTION.USERS);
      const customQuery = where("createdBy", "==", createdBy);
      const qRef = query(collectionRef, customQuery);
      const querySnapshot = await getDocs(qRef);
      querySnapshot.forEach((docs) => {
        const { fullname: label } = docs.data();
        const value = docs.id;
        const data = { value, label };
        parsedData.push(data);
      });

      setFetchUserData(parsedData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDataUser();
  }, []);
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
              <Select options={fetchUserData} />
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
