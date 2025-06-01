import { Button, Col, Form, Input, Row } from "antd";
import "./Signup.css";
import { PASSWORD_PATTERN } from "../../lib/regex";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Signup = () => {
  const nevigate = useNavigate();

  const onFinish = async (data) => {
    console.log(data);
    const response = await Swal.fire({
      title: "Confirmation",
      text: "Are you sure you want to sign up?",
      showCancelButton: true,
      confirmButtonText: "Sure",
      cancelButtonText: "Cancel",
      background: "#fff",
      color: "#000",
      customClass: {
        popup: "my-custom-modal",
        confirmButton: "my-confirm-btn",
        cancelButton: "my-cancel-btn",
      },
      position: "center",
      width: "370px",
    });
    if (response.isConfirmed) {
      nevigate("/dashboard");
    }
  };

  return (
    <div className="wrapper">
      <Form className="form-container" onFinish={onFinish}>
        <Row gutter={6}>
          <Col sm={24} md={12}>
            <Form.Item
              label="FullName"
              name={"fullName"}
              colon={false}
              rules={[
                {
                  required: true,
                  whitespace: true,
                },
                {
                  min: 3,
                },
              ]}
            >
              <Input placeholder="Enter the FullName" />
            </Form.Item>
          </Col>
          <Col sm={24} md={12}>
            <Form.Item
              label="UserName"
              name={"userName"}
              colon={false}
              rules={[
                {
                  required: true,
                  whitespace: true,
                },
                {
                  min: 3,
                },
              ]}
            >
              <Input placeholder="Enter the UserName" />
            </Form.Item>
          </Col>
          <Col sm={24} md={12}>
            <Form.Item
              label="Email"
              name={"email"}
              colon={false}
              rules={[
                {
                  required: true,
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="Enter the Email" />
            </Form.Item>
          </Col>
          <Col sm={24} md={12}>
            <Form.Item
              label="Password"
              name={"password"}
              colon={false}
              rules={[
                {
                  required: true,
                  whitespace: true,
                },
                {
                  pattern: PASSWORD_PATTERN,
                  message:
                    "Password must be 8+ chars, include uppercase, lowercase, number & special char.",
                },
              ]}
            >
              <Input.Password placeholder="Enter the Password" />
            </Form.Item>
          </Col>
          <Col sm={24} md={12}>
            <Form.Item
              label="CNIC"
              name={"cnic"}
              type={"number"}
              colon={false}
              rules={[
                {
                  required: true,
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="Enter the CNIC Number" />
            </Form.Item>
          </Col>
          <Col sm={24} md={12}>
            <Form.Item
              label="PhoneNumber"
              name={"phoneNumber"}
              type={"number"}
              colon={false}
            >
              <Input placeholder="Enter the Phone Number" />
            </Form.Item>
          </Col>
          <Col sm={24} md={12} offset={12}>
            <Form.Item style={{ textAlign: "right" }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Signup;
