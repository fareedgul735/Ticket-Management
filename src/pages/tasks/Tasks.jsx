import { Button, Spin, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { DB_COLLECTION, TICKET_PRIORITIES } from "../../lib/constant";
import { collection, db, getDocs, query, where, or } from "../../lib/firebase";
import { useSelector } from "react-redux";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

const Tasks = () => {
  const [loading, setLoading] = useState(true);
  const { userId } = useSelector((state) => state.user);
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Priority",
      dataIndex: "priority",
      render: (value) => (
        <Tag
          color={
            value === TICKET_PRIORITIES[0].value
              ? "error"
              : value === TICKET_PRIORITIES[1].value
              ? "warning"
              : "blue"
          }
        >
          {value}
        </Tag>
      ),
    },
    { title: "Status", dataIndex: "status", render: (value) => value || "-" },
    {
      title: "AssignedTo",
      dataIndex: "assignedUser",
      render: (value) => {
        return value?.label || "-";
      },
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
            <Button type="text">
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

      const customQuery = query(
        collectionRef,
        or(where("assignedTo", "==", userId), where("userId", "==", userId))
      );

      const querySnapshot = await getDocs(customQuery);
      querySnapshot.forEach((docs) => {
        const data = { id: docs.id, ...docs.data() };
        parsedData.push(data);
      });

      setDataSource(parsedData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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
          locale={{
            emptyText: loading ? (
              <div className="no-data-spinner">
                <Spin tip="Loading..." />
              </div>
            ) : (
              "No tickets found."
            ),
          }}
        />
      </div>
    </>
  );
};

export default Tasks;
