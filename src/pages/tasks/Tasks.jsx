import { Button, Spin, Table, Tag, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { DB_COLLECTION, TICKET_PRIORITIES } from "../../lib/constant";
import { collection, db, getDocs, query, where, or } from "../../lib/firebase";
import { useSelector } from "react-redux";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { FaClipboardCheck } from "react-icons/fa";

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
          <div className="actions-btn">
            <Tooltip color="green" title="Edit" placement="bottom">
              <Button
                type="none"
                className="edit-btn"
                icon={<EditOutlined />}
              />
            </Tooltip>
            <Tooltip color="red" title="Delete" placement="bottom">
              <Button
                type="none"
                className="delete-btn"
                icon={<DeleteOutlined />}
              />
            </Tooltip>
            <Tooltip color="blue" title="View" placement="bottom">
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
    <div className="users-wrapper">
      <div className="users-container">
        <div className="header-actions">
          <h2>
            <FaClipboardCheck />
            Tickets List
          </h2>
          <Link to="addTasks">
            <Button
              type="none"
              className="add-employee-btn"
              icon={<FaClipboardCheck />}
              size="middle"
            >
              Add Tickets
            </Button>
          </Link>
        </div>

        <div className="table-wrapper">
          <Table
            columns={columns}
            dataSource={dataSource}
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

export default Tasks;
