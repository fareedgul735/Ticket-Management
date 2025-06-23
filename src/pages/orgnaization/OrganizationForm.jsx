import { Button, Form, Input } from "antd"
import { addDoc, collection, db } from "../../lib/firebase"
import { DB_COLLECTION } from "../../lib/constant"
import Swal from "sweetalert2"
import { useNavigate } from "react-router"

const OrganizationForm = () => {
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
    const userId = localStorage.getItem("userId")
    try {

      const isUserConfirmed = await getUserConfirmation();
      if (isUserConfirmed) {
        await saveOrganization(data, userId)
        navigate("/organization")
      }

    } catch (err) {
      await Swal.fire({
        title: "Internal Server Error"
      })
    }
  }


  return (
    <div>
      <div className="form-wrapper">
        <Form className="form-container" onFinish={onDataSuccessfully}>
          <Form.Item label={"Name"} name={"name"} rules={[
            {
              required: true,
            }, {
              min: 3,
              message: "please enter the correct name "
            }
          ]}>
            <Input />
          </Form.Item>
          <Form.Item label={"Contact"} name={"contact"} rules={[
            {
              required: true,
            },
          ]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label={"Ntn No"} name={"ntn"} >
            <Input type="number" />
          </Form.Item>
          <Form.Item label={"Location"} name={"location"} >
            <Input />
          </Form.Item>
          <Form.Item  >
            <Button htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default OrganizationForm
