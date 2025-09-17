import { Link, useNavigate } from "react-router";
import { auth, signInWithEmailAndPassword } from "../../lib/firebase";
import Swal from "sweetalert2";
import { Button, Form, Input } from "antd";
import "./Login.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/slices/user";
import { FaArrowRight } from "react-icons/fa";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLoginDataSuccessfully = async ({ email, password }) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      dispatch(loginUser({ uid: response.user.uid }));
      navigate("/dashboard");
      return response;
    } catch (err) {
      console.log(err);
      await Swal.fire({
        text: "Please Correct the Email & Password",
        background: "#1f1f1f",
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
    <div className="login-wrapper">
      <div className="login-card">
        <div className="app-name">
          <h1>Ticket Management System</h1>
        </div>
        <p className="login-subtitle">
          Login to continue managing Ticket Management System
        </p>
        <Form
          className="login-form-content"
          onFinish={onLoginDataSuccessfully}
          layout="vertical"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input placeholder="you@example.com" className="custom-input" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="••••••••" className="custom-input" />
          </Form.Item>

          <Button type="none" htmlType="submit" className="login-btn">
            <span> Login</span>
            <FaArrowRight className="login-icon" />
          </Button>
        </Form>
        <div className="redirect-signup">
          Don`t have an account ?{" "}
          <Link to={"/signup"} className="text">
            <span>Signup</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
