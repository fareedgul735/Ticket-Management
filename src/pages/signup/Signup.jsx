import { Button, Form, Input } from "antd";
import "./Signup.css";
import { PAKISTAN_CNIC_PATTERN, PASSWORD_PATTERN } from "../../lib/regex.js";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import image from "../../assets/signup.png";
import {
  auth,
  db,
  collection,
  addDoc,
  createUserWithEmailAndPassword,
} from "../../lib/firebase.js";
import { DB_COLLECTION, USER_ROLES } from "../../lib/constant.js";
import { FaUserPlus } from "react-icons/fa";
import { FaUser, FaLock, FaEnvelope, FaTrash, FaEdit } from 'react-icons/fa'; // FontAwesome
import { MdHome, MdSettings } from 'react-icons/md'; // Material Design
import { AiOutlineUpload, AiOutlineDownload } from 'react-icons/ai'; // Ant Design
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi'; // Feather

const Signup = () => {
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
    const { email, password, ...userDetails } = data;
    try {
      const isUserConfirmed = await userConfirmation();
      if (isUserConfirmed) {
        const userId = await saveUserAndGetId(email, password);
        await saveUserDetails({ ...userDetails, role: USER_ROLES.ADMIN }, userId);
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

  return (
    <div className="signup-wrapper">
      <div className="signup-form-side">
        <h2 className="signup-title">Create an Account</h2>
        <p className="signup-subtitle">Join us to manage your tickets smartly</p>
        <Form className="signup-form-content" onFinish={onSignupDataSuccessfully} layout="vertical">
          <Form.Item
            name="fullname"
            label="Full Name"
            rules={[{ required: true, message: "Please enter your fullname" }]}
          >
            <Input placeholder="John Doe" className="signup-input" />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter your username" }]}
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
            rules={[{ required: true, message: "Please enter your phone number" }]}
          >
            <Input type="number" placeholder="03XXXXXXXXX" className="signup-input" />
          </Form.Item>
          <Form.Item
            name="cnic_number"
            label="CNIC Number"
            rules={[
              { required: true, message: "Please enter your CNIC number" },
              { pattern: PAKISTAN_CNIC_PATTERN, message: "Please enter a valid CNIC" },
            ]}
          >
            <Input placeholder="XXXXX-XXXXXXX-X" className="signup-input" />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="signup-btn">
            <FaUserPlus className="signup-icon" /> Signup
          </Button>
        </Form>
        <div className="redirect-login">
          Don`t have an account ? <Link to={"/login"}><span style={{ cursor: "pointer" }}>Login</span></Link>
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

export default Signup;
