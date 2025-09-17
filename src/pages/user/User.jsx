import { Button, Spin, Table, Tooltip } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db, collection, getDocs, query, where } from "../../lib/firebase";
import { DB_COLLECTION } from "../../lib/constant.jsx";
import { useSelector } from "react-redux";
import "./User.css";

const User = () => {
  const userId = useSelector((state) => state.user.userId);
  const [datasource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      title: "Name",
      dataIndex: "fullname",
      render: (text) => <span className="bold-text">{text}</span>,
    },
    {
      title: "Phone No",
      dataIndex: "phone",
      render: (text) => <span className="blue-text">{text}</span>,
    },
    {
      title: "CNIC",
      dataIndex: "cnic",
      render: (text) => <span className="green-text">{text}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => {
        const { id } = record;

        const onDelete = () => {
          alert(`Delete user with ID: ${id}`);
        };

        return (
          <div className="actions-btn">
            <Tooltip title="Edit" placement="bottom">
              <Button
                type="none"
                className="edit-btn"
                icon={<EditOutlined />}
              />
            </Tooltip>
            <Tooltip title="Delete" placement="bottom">
              <Button
                type="none"
                className="delete-btn"
                onClick={onDelete}
                icon={<DeleteOutlined />}
              />
            </Tooltip>
            <Tooltip title="View" placement="bottom">
              <Button type="none" className="view-btn" icon={<EyeOutlined />} />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const fetchData = async () => {
    const parsedData = [];
    try {
      const collectionRef = collection(db, DB_COLLECTION.USERS);
      const qRef = query(collectionRef, where("createdBy", "==", userId));
      const querySnapshot = await getDocs(qRef);

      querySnapshot.forEach((doc) => {
        parsedData.push({ id: doc.id, ...doc.data() });
      });

      setDataSource(parsedData);
    } catch (err) {
      console.error("Error fetching users:", err);
      await Swal.fire({
        text: "Internal Server Error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="users-wrapper">
      <div className="users-container">
        <div className="header-actions">
          <h2>
            {" "}
            <UsergroupAddOutlined /> Employee List
          </h2>
          <Link to="form">
            <Button
              type="none"
              className="add-employee-btn"
              icon={<UsergroupAddOutlined />}
              size="middle"
            >
              Add Employee
            </Button>
          </Link>
        </div>

        <div className="table-wrapper">
          <Table
            columns={columns}
            dataSource={datasource}
            rowKey="id"
            bordered
            pagination={{ position: ["bottomCenter"], pageSize: 8 }}
            size="middle"
            scroll={{ x: "max-content" }}
            locale={{
              emptyText: loading ? (
                <div className="no-data-spinner">
                  <Spin tip="Loading..." />
                </div>
              ) : (
                "No employees found."
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default User;
