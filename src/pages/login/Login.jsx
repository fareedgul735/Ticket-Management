import { useNavigate } from 'react-router';
import { auth, signInWithEmailAndPassword } from '../../lib/firebase';
import Swal from 'sweetalert2';
import { Button, Form, Input } from 'antd';
import { FiLogIn } from 'react-icons/fi';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();

    const onLoginDataSuccessfully = async ({ email, password }) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem("userId", response.user.uid);
            navigate("/dashboard");
            return response;
        } catch (err) {
            console.log(err)
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
        <div className='wrapper'>
            <div className="login-card">
                <h2 className="login-title">Welcome Back 👋</h2>
                <p className="login-subtitle">Login to continue managing tickets</p>
                <Form className="login-form-content" onFinish={onLoginDataSuccessfully} layout="vertical">
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

                    <Button type="primary" htmlType="submit" className="login-btn">
                        <FiLogIn className="login-icon" />
                        Login
                    </Button>
                </Form>
            </div>
            <div className="right-side-design">

            </div>
        </div>
    );
};

export default Login;
