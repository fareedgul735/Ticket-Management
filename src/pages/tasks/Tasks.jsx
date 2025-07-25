import { Button, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  DB_COLLECTION,
  TICKET_PRIORITIES,
  USER_ROLES,
} from "../../lib/constant";
import { collection, db, getDocs, query, where } from "../../lib/firebase";
import { useSelector } from "react-redux";

const Tasks = () => {
  const { userId, role } = useSelector((state) => state.user);
  console.log(userId, role, "userObject");
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Priority",
      dataIndex: "priority",
      render: (value) => {
        <Tag
          color={
            value === TICKET_PRIORITIES[0].value
              ? "error"
              : value === TICKET_PRIORITIES[1].value
              ? "warning"
              : "blue "
          }
        >
          {value}
        </Tag>;
      },
    },
    { title: "Status", dataIndex: "status", render: (value) => value || "-" },
    {
      title: "AssignedTo",
      dataIndex: "assigned",
      render: (value) => value?.label || "-",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: (value) => {
        if (value) {
          return value.toDate().toLocaleString();
        }
        return "-";
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => {
        const { id } = record;

        return (
          <div className="actions-wrapper">
            <Link>
              <Button type="text">
                <EditOutlined />
              </Button>
            </Link>
            <Button type="text" onClick={onDelete}>
              <DeleteOutlined />
            </Button>
            <Link>
              <Button type="text">
                <EyeOutlined />
              </Button>
            </Link>
          </div>
        );
      },
    },
  ];

  const fetchData = async () => {
    const parsedData = [];
    try {
      const collectionRef = collection(db, DB_COLLECTION.TICKETS);
      const isEmployee = role === USER_ROLES.EMPLOYEE;
      const queryKey = isEmployee ? "assignedTo" : "userId";
      const customQuery = where(queryKey, "==", userId);

      const qRef = query(customQuery, collectionRef);
      const querySnapshot = await getDocs(qRef);
      querySnapshot.forEach((docs) => {
        const data = { id: docs.id, ...docs.data() };
        parsedData.push(data);
      });
      setDataSource(parsedData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Link to={"addTasks"}>
        <Button type="primary" style={{ float: "right" }}>
          Add Tasks
        </Button>
      </Link>
      <div className="tasks-wrapper">
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{ position: ["bottomCenter"], pageSize: 10 }}
        />
      </div>
    </>
  );
};

export default Tasks;
