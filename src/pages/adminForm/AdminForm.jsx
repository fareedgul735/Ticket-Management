import { Button, Form, Input } from "antd";
import "./Admin.css";
import { PAKISTAN_CNIC_PATTERN, PASSWORD_PATTERN } from "../../lib/regex.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useState } from "react";
import image from "../../assets/signup.png"
import {
  auth,
  db,
  collection,
  addDoc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "../../lib/firebase.js";
import { DB_COLLECTION } from "../../lib/constant.js";
import { FiLogIn } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";

const AdminForm = () => {
  const [toggles, setToggle] = useState(false);
  const navigate = useNavigate();

  const saveUserDetails = async (userDetails, userId) => {
    const userDetailPayload = { userId, ...userDetails };
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
    const { email, password, confirmPassword, ...userDetails } = data;
    try {
      const isUserConfirmed = await userConfirmation();
      if (isUserConfirmed) {
        const userId = await saveUserAndGetId(email, password);
        await saveUserDetails(userDetails, userId);
        navigate("/dashboard");
      }
    } catch (err) {
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

  const onLoginDataSuccessfully = async ({ email, password }) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("userId", response.user.uid)
      navigate("/dashboard");
      return response;
    } catch (err) {
      await Swal.fire({
        text: "Please Correct the Email & Password",
        background: "#000",
        color: "#fff",
        position: "center",
        width: "370px",
        customClass: {
          confirmButton: "my-confirm-btn",
        },
      });
    }
  }

  return (
    <div className="form-wrapper">
      <div className="validation-image">
        <img src={image} alt="validation-image" />
      </div>
      <div className="form-card">
        <h2>{toggles ? "Signup Form" : "Login Form"}</h2>
        <div className="form-toggle">
          <button className={!toggles ? "active" : ""} onClick={() => setToggle(false)}> Login</button>
          <button className={toggles ? "active" : ""} onClick={() => setToggle(true)}>
            Signup</button>
        </div>

        {toggles ? (
          <Form className="signup-form-content" onFinish={onSignupDataSuccessfully}>
            <Form.Item
              name="fullname"
              rules={[{ required: true, message: "Please enter your fullname" }]}

            >
              <Input placeholder="FullName" />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Please enter your username" }]}

            >
              <Input placeholder="UserName" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input placeholder="Email Address" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
                {
                  pattern: PASSWORD_PATTERN,
                  message:
                    "Password must be 8+ chars, include uppercase, lowercase, number & special char.",
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item
              name="phone_number"
              rules={[
                { required: true, message: "Please enter your phone number" },
              ]}
            >
              <Input type="number" placeholder="PhoneNumber" />
            </Form.Item>

            <Form.Item
              name="cnic_number"
              rules={[
                { required: true, message: "Please enter your cnic number" },
                { pattern: PAKISTAN_CNIC_PATTERN, message: "Please Enter a Valid Cnic" }
              ]}
            >
              <Input placeholder="CnicNumber" />
            </Form.Item>

            <Button type="none" htmlType="submit" className="signup-btn">
              <FaUserPlus />
              Signup
            </Button>
          </Form>
        ) : (
          <Form className="login-form-content" onFinish={onLoginDataSuccessfully}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input placeholder="Email Address" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Button type="none" htmlType="submit" className="login-btn">
              <FiLogIn />
              Login
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default AdminForm;
