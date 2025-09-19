import { Button, Col, Form, Input, Row, Select } from "antd";
import {
  EMAIL_PATTERN,
  PAKISTAN_CNIC_PATTERN,
  PASSWORD_PATTERN,
} from "../../lib/regex";
import {
  addDoc,
  auth,
  collection,
  createUserWithEmailAndPassword,
  db,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "../../lib/firebase";
import { DB_COLLECTION, USER_ROLES } from "../../lib/constant.jsx";
import Swal from "sweetalert2";
import { ArrowLeftOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./User.css";
import loadingHOC from "../../components/LoadingHOC.jsx";

const UserForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [organization, setOrganization] = useState([]);

  const saveUserDetails = async (employeeId, userDetails) => {
    const payload = { employeeId, ...userDetails };
    const docRef = doc(db, DB_COLLECTION.USERS, employeeId);
    await setDoc(docRef, payload);
  };
  const saveUserAndGetId = async (email, password) => {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return response.user.uid;
  };
  const userConfirmation = async () => {
    const res = await Swal.fire({
      title: "Confirmation",
      text: "Are You Sure, You want to add user",
      showCancelButton: true,
      confirmButtonText: "Sure",
    });
    return res.isConfirmed;
  };
  const onUserDataSuccessfully = async (data) => {
    const { email, password, ...userDetails } = data;
    try {
      const createdBy = userId;
      const confirmation = await userConfirmation();
      if (confirmation) {
        setIsLoading(true);
        const employeeId = await saveUserAndGetId(email, password);
        const userDetailsSave = await saveUserDetails(employeeId, {
          ...userDetails,
          createdBy,
          role: USER_ROLES.EMPLOYEE,
        });
        navigate("/employee");
        return userDetailsSave;
      }
    } catch (err) {
      console.log(err);
      await Swal.fire({
        text: "Internal Server Error",
      });
    }
  };

  const fetchOrganizationData = async () => {
    const parsedData = [];
    const createdBy = userId;
    try {
      const collectionRef = collection(db, DB_COLLECTION.ORGANIZATIONS);
      const customQuery = where("userId", "==", createdBy);
      const qRef = query(collectionRef, customQuery);
      const querySnapshot = await getDocs(qRef);
      querySnapshot.forEach((docs) => {
        const { name: label } = docs.data();
        const value = docs.id;
        const data = { label, value };
        parsedData.push(data);
      });
      setOrganization(parsedData);
    } catch (err) {
      console.log(err);
      await Swal.fire({
        text: "Internal Server Error",
      });
    }
  };

  useEffect(() => {
    fetchOrganizationData();
  }, []);
  return (
    <>
      <div className="btn-wrapper">
        <Link to={"/employee"}>
          <Button type="primary" className="btn">
            <ArrowLeftOutlined />
            Back Employees List
          </Button>
        </Link>
      </div>
      <div className="user-form-wrapper light-bg">
        <Form
          className="form-container"
          layout="vertical"
          onFinish={onUserDataSuccessfully}
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="FullName"
                name="fullname"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter full name" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="UserName"
                name="username"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter username" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="PhoneNumber"
                name="phone"
                rules={[{ required: true }]}
              >
                <Input placeholder="XXXX-XXXXXXXX" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true },
                  {
                    pattern: EMAIL_PATTERN,
                    message: "Please enter a valid email",
                  },
                ]}
              >
                <Input placeholder="example@email.com" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true },
                  {
                    pattern: PASSWORD_PATTERN,
                    message:
                      "Password must be 8+ chars, include uppercase, lowercase, number & special char.",
                  },
                ]}
              >
                <Input.Password placeholder="Enter secure password" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Cnic"
                name="cnic"
                rules={[
                  { required: true },
                  { pattern: PAKISTAN_CNIC_PATTERN, message: "Invalid CNIC" },
                ]}
              >
                <Input placeholder="xxxxx-xxxxxxx-x" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Organizations"
                name="organizationId"
                rules={[{ required: true }]}
              >
                <Select
                  showSearch
                  options={organization}
                  placeholder="Select Organization"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <div className="submit-btn-wrapper">
              {loadingHOC(
                <Button type="none" htmlType="submit" className="submit-btn">
                  <UsergroupAddOutlined /> Add Employee
                </Button>,
                isLoading
              )}
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default UserForm;
