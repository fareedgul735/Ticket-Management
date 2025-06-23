import { Link, useNavigate } from 'react-router';
import { auth, db, doc, getDoc, signInWithEmailAndPassword } from '../../lib/firebase';
import Swal from 'sweetalert2';
import { Button, Form, Input } from 'antd';
import { FiLogIn } from 'react-icons/fi';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/slices/user';
import { DB_COLLECTION } from '../../lib/constant';
import image from "../../assets/signup.png"
import { FaUser, FaLock, FaEnvelope, FaTrash, FaEdit } from 'react-icons/fa'; // FontAwesome
import { MdHome, MdSettings } from 'react-icons/md'; // Material Design
import { AiOutlineUpload, AiOutlineDownload } from 'react-icons/ai'; // Ant Design
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi'; // Feather

const Login = () => {
    const { userId } = useSelector((state) => state.user);
    console.log(userId, "userId")
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const onLoginDataSuccessfully = async ({ email, password }) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            // const docRef = doc(db, DB_COLLECTION.USERS, response.user.uid);
            // const docSnapShot = await getDoc(docRef);
            // console.log(docSnapShot, docSnapShot.data(), "====>");
            dispatch(loginUser(response.user.uid))
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
        <div className='login-wrapper'>
            <div className="login-card">
                <div className="app-name">
                    <h1>Ticket Management System</h1>
                </div>
                <p className="login-subtitle">Login to continue managing Ticket Management System</p>
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
                <div className="redirect-signup">
                    Don`t have an account ? <Link to={"/signup"}><span style={{ cursor: "pointer" }}>Signup</span></Link>
                </div>
            </div>
            <div className="right-side-design">
                <div className="dummy-text">
                    <h1>Introduce</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A, fugit in aliquid facilis exercitationem soluta eveniet, ipsam quae pariatur iure at molestias, placeat amet labore quisquam quaerat modi repudiandae omnis.
                        Architecto quia ipsa commodi! Nulla voluptas tempora aut minus quibusdam? Repellendus voluptas expedita molestias neque veniam illo dignissimos voluptatem ducimus maiores amet eaque, consectetur voluptates, placeat cum libero numquam quod?
                        Voluptates debitis nisi animi blanditiis eum ex at ipsum perspiciatis eligendi, nostrum impedit incidunt! Reprehenderit dicta laudantium recusandae. Amet nulla mollitia atque distinctio iure, eius quo neque voluptatem iste ullam.
                        Repellat facilis ullam aliquam quae nihil amet sunt unde fugiat? Amet, blanditiis eius accusamus harum cum quod aspernatur quasi totam vitae recusandae quam impedit pariatur minus dignissimos fugit omnis nihil.
                        Iure rerum culpa at et id numquam exercitationem veniam ut atque? Quaerat veniam alias quam labore dignissimos ab, quae magni corporis vel fugit officiis perferendis aliquam sapiente non, quasi molestiae.</p>
                </div>
                <div className="dummy-img">
                    <img src={image} alt="dummy-image" width={300} height={300} />
                </div>
                <div className="dummy-icons">
                    <div className="dummy-icon-part-1">
                        <MdSettings title="Settings" />
                        <AiOutlineUpload title="Upload" />
                        <AiOutlineDownload title="Download" />
                        <FiAlertCircle title="Warning" />
                        <FiCheckCircle title="Success" />
                    </div>
                    <div className="dummy-icons-part-2">
                        <FaUser title="User" />
                        <FaEnvelope title="Email" />
                        <FaLock title="Password" />
                        <FaTrash title="Delete" />
                        <FaEdit title="Edit" />
                        <MdHome title="Home" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
