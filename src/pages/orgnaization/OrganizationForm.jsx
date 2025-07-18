import { Button, Form, Input } from "antd"
import { addDoc, collection, db } from "../../lib/firebase"
import { DB_COLLECTION } from "../../lib/constant.jsx"
import Swal from "sweetalert2"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { FaBuilding } from "react-icons/fa"

const OrganizationForm = () => {
  const userId = useSelector((state)=>state.user.userId);
  const navigate = useNavigate()

  const saveOrganization = async (userDetails, userId) => {
    const payload = { userId, ...userDetails }
    const collectionRef = collection(db, DB_COLLECTION.ORGANIZATIONS);
    await addDoc(collectionRef, payload)
  }

  const getUserConfirmation = async () => {
    const result = Swal.fire({
      title: "Confirmation",
      text: "Are You Sure, You want to add organization",
      showCancelButton: true,
      confirmButtonText: "Sure",
    })
    return (await result).isConfirmed
  }

  const onDataSuccessfully = async (data) => {
const createdBy = userId
    try {

      const isUserConfirmed = await getUserConfirmation();
      if (isUserConfirmed) {
        await saveOrganization(data, createdBy)
        navigate("/organization")
      }

    } catch (err) {
      console.log(err)
      await Swal.fire({
        title: "Internal Server Error"
      })
    }
  }


return (
    <div className="form-wrapper light-bg">
      <Form className="form-container" layout="vertical" onFinish={onDataSuccessfully}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true },
            { min: 3, message: "please enter the correct name" }
          ]}
        >
          <Input placeholder="Enter organization name" />
        </Form.Item>

        <Form.Item
          label="Contact"
          name="contact"
          rules={[{ required: true }]}
        >
          <Input type="number" placeholder="03XX-XXXXXXX" />
        </Form.Item>

        <Form.Item
          label="NTN No"
          name="ntn"
          rules={[{ required: true }]}
        >
          <Input type="number" placeholder="Enter NTN number" />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter city or address" />
        </Form.Item>

        <Form.Item>
          <Button type="none" className="submit-btn" htmlType="submit">
           <FaBuilding /> Add Organization
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default OrganizationForm
