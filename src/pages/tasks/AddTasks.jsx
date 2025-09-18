import { Button, Col, Form, Input, Row, Select } from "antd";
import {
  DB_COLLECTION,
  TICKET_PRIORITIES,
  TICKET_STATUSES,
} from "../../lib/constant";
import { useSelector } from "react-redux";
import {
  addDoc,
  collection,
  db,
  getDocs,
  query,
  where,
} from "../../lib/firebase";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftOutlined } from "@ant-design/icons";

const AddTasks = () => {
  const { userId } = useSelector((state) => state.user);
  const [fetchUserData, setFetchUserData] = useState([]);
  const navigate = useNavigate();
  const saveUserTaskDetailed = async (taskDetail, userId) => {
    const taskDetailedPayload = { userId, ...taskDetail };
    const collectionRef = collection(db, DB_COLLECTION.TICKETS);
    await addDoc(collectionRef, taskDetailedPayload);
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
    console.log(createdBy, "createdBy");
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
    <>
      <div className="btn-wrapper">
        <Link to={"/tasks"}>
          <Button type="primary" className="btn">
            <ArrowLeftOutlined />
            Back Tickets List
          </Button>
        </Link>
      </div>
      <div className="user-form-wrapper light-bg">
        <Form
          className="form-container"
          layout="vertical"
          onFinish={onDataSuccessfully}
        >
          <Row gutter={6}>
            <Col sm={24}>
              <Form.Item
                label="Name"
                name={"name"}
                rules={[
                  { required: true, whitespace: true },
                  { min: 2 },
                  { max: 25 },
                ]}
              >
                <Input placeholder="Enter ticket name" />
              </Form.Item>
            </Col>

            <Col sm={24}>
              <Form.Item
                label="Priority"
                name={"priority"}
                rules={[{ required: true }]}
              >
                <Select
                  options={TICKET_PRIORITIES}
                  placeholder="Select priority"
                />
              </Form.Item>
            </Col>

            <Col sm={24}>
              <Form.Item
                label="Status"
                name={"status"}
                rules={[{ required: true }]}
              >
                <Select options={TICKET_STATUSES} placeholder="Select status" />
              </Form.Item>
            </Col>

            <Col sm={24}>
              <Form.Item
                label="Assigned To"
                name={"assignedTo"}
                rules={[{ required: true }]}
              >
                <Select options={fetchUserData} placeholder="Select user" />
              </Form.Item>
            </Col>

            <Col sm={24}>
              <Form.Item>
                <Button type="none" htmlType="submit" className="submit-btn">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default AddTasks;
