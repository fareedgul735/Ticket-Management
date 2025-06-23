import { Button, Form, Input, Select } from "antd"
import { EMAIL_PATTERN, PAKISTAN_CNIC_PATTERN, PASSWORD_PATTERN } from "../../lib/regex"
import { addDoc, auth, collection, createUserWithEmailAndPassword, db, getDocs, query, where } from "../../lib/firebase"
import { DB_COLLECTION, USER_ROLES } from "../../lib/constant"
import Swal from "sweetalert2"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"

const UserForm = () => {
    const navigate = useNavigate();
    const [organization, setOrganization] = useState([]);

    const saveUserDetails = async (userId, userDetails) => {
        const payload = { userId, ...userDetails }
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
            const createdBy = localStorage.getItem("userId");
            const confirmation = await userConfirmation();
            if (confirmation) {
                const userId = await saveUserAndGetId(email, password);
                const userDetailsSave = await saveUserDetails(userId, {
                    ...userDetails,
                    createdBy,
                    role: USER_ROLES.EMPLOYEE,
                });
                navigate("/user");
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
        const userId = localStorage.getItem("userId");
        try {
            const collectionRef = collection(db, DB_COLLECTION.ORGANIZATIONS);
            const customQuery = where("userId", "==", userId);
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
        <div className="wrapper">
            <Form className="form-container" onFinish={onUserDataSuccessfully}>
                <Form.Item label={"Fullname"} name={"fullname"} rules={[
                    { required: true }
                ]} >
                    <Input />
                </Form.Item>
                <Form.Item label={"UserName"} name={"username"} rules={[
                    { required: true }
                ]} >
                    <Input />
                </Form.Item>
                <Form.Item label={"PhoneNo"} name={"phone"} rules={[
                    { required: true }
                ]} >
                    <Input />
                </Form.Item>
                <Form.Item label={"Email"} name={"email"} rules={[
                    { required: true },
                    { pattern: EMAIL_PATTERN, message: "Please enter the invalid email" }
                ]} >
                    <Input />
                </Form.Item>
                <Form.Item label={"Password"} name={"password"} rules={[
                    { required: true },
                    { pattern: PASSWORD_PATTERN, message: "Password must be 8+ chars, include uppercase, lowercase, number & special char." }
                ]} >
                    <Input.Password />
                </Form.Item>
                <Form.Item label={"Cnic"} name={"cnic"} rules={[
                    { required: true },
                    { pattern: PAKISTAN_CNIC_PATTERN, message: "Please Invalid Cnic" }
                ]} >
                    <Input />
                </Form.Item>
                <Form.Item label={"Organization"} name={"organizationId"} rules={[
                    { required: true },
                ]} >
                    <Select showSearch options={organization} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UserForm
