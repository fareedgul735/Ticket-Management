import { Button, Form, Input, Select } from "antd"
import { EMAIL_PATTERN, PAKISTAN_CNIC_PATTERN, PASSWORD_PATTERN } from "../../lib/regex"
import { addDoc, auth, collection, createUserWithEmailAndPassword, db, getDocs, query, where } from "../../lib/firebase"
import { DB_COLLECTION, USER_ROLES } from "../../lib/constant.jsx"
import Swal from "sweetalert2"
import {
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import"./User.css"


const UserForm = () => {
    const  userId  = useSelector((state)=>state.user.userId)
    const navigate = useNavigate();
    const [organization, setOrganization] = useState([]);

    const saveUserDetails = async (employeeId, userDetails) => {
        const payload = { employeeId, ...userDetails }
        const collectionRef = collection(db, DB_COLLECTION.USERS);
        const docRef = await addDoc(collectionRef, payload);
        return docRef
    }
    const saveUserAndGetId = async (email, password) => {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        return response.user.uid
    }
    const userConfirmation = async () => {
        const res = await Swal.fire({
            title: "Confirmation",
            text: "Are You Sure, You want to add user",
            showCancelButton: true,
            confirmButtonText: "Sure",
        })
        return res.isConfirmed

    }
    const onUserDataSuccessfully = async (data) => {

        const { email, password, ...userDetails } = data;
        try {
            const createdBy  = userId
            const confirmation = await userConfirmation();
            if (confirmation) {
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
        const createdBy = userId
        try {
            const collectionRef = collection(db, DB_COLLECTION.ORGANIZATIONS);
            const customQuery = where("userId", "==", createdBy);
            const qRef = query(collectionRef, customQuery);
            const querySnapshot = await getDocs(qRef);
            querySnapshot.forEach((docs) => {
                const { name: label } = docs.data();
                const value = docs.id
                const data = { label, value }
                parsedData.push(data)
            })
            setOrganization(parsedData)


        } catch (err) {
            console.log(err)
            await Swal.fire({
                text: 'Internal Server Error',
            })
        }
    }

    useEffect(() => {
        fetchOrganizationData()
    }, [])
return (
    <div className="user-form-wrapper light-bg">
      <Form className="form-container" layout="vertical" onFinish={onUserDataSuccessfully}>
        <Form.Item label="FullName" name="fullname" rules={[{ required: true }]}> <Input placeholder="Enter full name" /> </Form.Item>
        <Form.Item label="UserName" name="username" rules={[{ required: true }]}> <Input placeholder="Enter username" /> </Form.Item>
        <Form.Item label="Phone No" name="phone" rules={[{ required: true }]}> <Input placeholder="XXXX-XXXXXXXX" /> </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true }, { pattern: EMAIL_PATTERN, message: "Please enter a valid email" }]}> <Input placeholder="example@email.com" /> </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true }, { pattern: PASSWORD_PATTERN, message: "Password must be 8+ chars, include uppercase, lowercase, number & special char." }]}> <Input.Password placeholder="Enter secure password" /> </Form.Item>
        <Form.Item label="CNIC" name="cnic" rules={[{ required: true }, { pattern: PAKISTAN_CNIC_PATTERN, message: "Invalid CNIC" }]}> <Input placeholder="xxxxx-xxxxxxx-x" /> </Form.Item>
        <Form.Item label="Organization" name="organizationId" rules={[{ required: true }]}> <Select showSearch options={organization} placeholder="Select Organization" /> </Form.Item>

        <Form.Item>
          <Button type="none" className="submit-btn" htmlType="submit"><UsergroupAddOutlined /> Add Employee</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UserForm
