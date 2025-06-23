import { Button, Table } from "antd"
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { collection, db, getDocs, query, where } from "../../lib/firebase";
import { DB_COLLECTION } from "../../lib/constant";
const User = () => {
  const [datasource, setDataSource] = useState()
  const columns = [
    { title: "Name", dataIndex: "fullname" },
    { title: "PhoneNo:", dataIndex: "phone" },
    { title: "Cnic", dataIndex: "cnic" },
    {
      title: "Actions", dataIndex: "actions",
      render: (_, actions) => {
        const { id } = actions;

        const onDelete = () => {
          alert(id)
        }

        return (
          <div className="actions-btn">
            <Button type="text">
              <EditOutlined />
            </Button>
            <Button type="text" onClick={onDelete}>
              <DeleteOutlined />
            </Button>
            <Button type="text">
              <EyeOutlined />
            </Button>
          </div>
        )

      }
    }
  ]
  const fetchData = async () => {
    const parsedData = [];
    const userId = localStorage.getItem("userId");

    const collectionRef = collection(db, DB_COLLECTION.USERS);
    const customQuery = where("createdBy", "==", userId);
    const qRef = query(collectionRef, customQuery);
    const querySnapshot = await getDocs(qRef);

    querySnapshot.forEach((doc) => {
      const data = { id: doc.id, ...doc.data() };
      parsedData.push(data);
    });

    setDataSource(parsedData);
  };

  useEffect(() => {
    fetchData()
  }, [])

  return (

    <div className="users-container">
      <Link to={"form"}>
        <Button type="primary" style={{ float: "right" }} >
          Add Users
        </Button>
      </Link>
      <Table columns={columns} dataSource={datasource} pagination={[{ position: "bottomCenter", pageSize: 5 }]} />
    </div>

  )
}

export default User
