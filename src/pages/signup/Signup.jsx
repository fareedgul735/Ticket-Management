import { Button, Form, Input } from "antd";
import "./Signup.css";
import { PAKISTAN_CNIC_PATTERN, PASSWORD_PATTERN } from "../../lib/regex.js";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import {
  auth,
  db,
  collection,
  addDoc,
  createUserWithEmailAndPassword,
} from "../../lib/firebase.js";
import { DB_COLLECTION, USER_ROLES } from "../../lib/constant.js";
import { FaUserPlus } from "react-icons/fa";
const Signup = () => {
  const navigate = useNavigate();

  const saveUserDetails = async (userDetails, adminId) => {
    const userDetailPayload = { adminId, ...userDetails };
    const collectionReference = collection(db, DB_COLLECTION.USERS);
    await addDoc(collectionReference, userDetailPayload);
  };

  const saveUserAndGetId = async (email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res.user.uid;
  };

  const userConfirmation = async () => {
    const response = await Swal.fire({
      text: "Are you sure you want to sign up?",
      showCancelButton: true,
      confirmButtonText: "Sure",
      cancelButtonText: "Cancel",
      background: "#000",
      color: "#fff",
      customClass: {
        popup: "my-custom-modal",
        confirmButton: "my-confirm-btn",
        cancelButton: "my-cancel-btn",
      },
      position: "center",
      width: "370px",
    });
    return response.isConfirmed;
  };

  const onSignupDataSuccessfully = async (data) => {
    const { email, password, ...userDetails } = data;
    try {
      const isUserConfirmed = await userConfirmation();
      if (isUserConfirmed) {
        const adminId = await saveUserAndGetId(email, password);
        await saveUserDetails({ ...userDetails, role: USER_ROLES.ADMIN }, adminId);
        navigate("/");
      }
    } catch (err) {
      console.log(err)
      await Swal.fire({
        text: "Internal Server Error!",
        background: "#000",
        color: "#fff",
        position: "center",
        width: "370px",
        customClass: {
          confirmButton: "my-confirm-btn",
        },
      });
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-form-side">
        <h2 className="signup-title">Create an Account</h2>
        <p className="signup-subtitle">Join us to manage your tickets smartly</p>
        <Form className="signup-form-content" onFinish={onSignupDataSuccessfully} layout="vertical">
          <Form.Item
            name="fullname"
            label="Full Name"
            rules={[{ required: true, message: "Please enter your fullname", min: 3 }]}
          >
            <Input placeholder="John Doe" className="signup-input" />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter your username", min: 3 }]}
          >
            <Input placeholder="john123" className="signup-input" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input placeholder="john@example.com" className="signup-input" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please enter your password" },
              {
                pattern: PASSWORD_PATTERN,
                message: "Password must be 8+ chars, include uppercase, lowercase, number & special char.",
              },
            ]}
          >
            <Input.Password placeholder="••••••••" className="signup-input" />
          </Form.Item>
          <Form.Item
            name="phone_number"
            label="Phone Number"
            rules={[{ required: true, message: "Please enter your phone number", min: 11 }]}
          >
            <Input type="number" placeholder="03XXXXXXXXX" className="signup-input" />
          </Form.Item>
          <Form.Item
            name="cnic_number"
            label="CNIC Number"
            rules={[
              { required: true, message: "Please enter your CNIC number" },
              { pattern: PAKISTAN_CNIC_PATTERN, message: "Please enter a valid CNIC", min: 13 },
            ]}
          >
            <Input placeholder="XXXXX-XXXXXXX-X" className="signup-input" />
          </Form.Item>
          <Button type="none" htmlType="submit" className="signup-btn">
            <FaUserPlus className="signup-icon" /> Signup
          </Button>
        </Form>
        <div className="redirect-login">
          Don`t have an account ? <Link className="text" to={"/login"}><span>Login</span></Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
