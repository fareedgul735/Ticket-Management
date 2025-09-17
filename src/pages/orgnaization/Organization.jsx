import { Button, Spin, Table, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { collection, db, getDocs, query, where } from "../../lib/firebase";
import { DB_COLLECTION } from "../../lib/constant.jsx";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import "./Organization.css";
import { FaBuilding } from "react-icons/fa";

const Organization = () => {
  const { userId } = useSelector((state) => state.user);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
      render: (text) => <span className="bold-text">{text}</span>,
    },
    {
      title: "Contact",
      dataIndex: "contact",
      align: "center",
      render: (text) => <span className="blue-text">{text}</span>,
    },
    {
      title: "Ntn Number",
      dataIndex: "ntn",
      align: "center",
      render: (text) => <span className="green-text">{text}</span>,
    },
    {
      title: "Location",
      dataIndex: "location",
      align: "center",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      align: "center",
      render: (_, record) => {
        const { id } = record;
        return (
          <div className="actions-btn">
            <Tooltip color="green" title="Edit" placement="bottom">
              <Button
                type="none"
                className="edit-btn"
                icon={<EditOutlined />}
                onClick={() => alert(id)}
              />
            </Tooltip>
            <Tooltip color="red" title="Delete" placement="bottom">
              <Button
                type="none"
                className="delete-btn"
                icon={<DeleteOutlined />}
                onClick={() => alert(id)}
              />
            </Tooltip>
            <Tooltip color="blue" title="View" placement="bottom">
              <Button
                type="none"
                className="view-btn"
                icon={<EyeOutlined />}
                onClick={() => alert(id)}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const fetchingData = async () => {
    const parsedData = [];
    try {
      const createdBy = userId;
      const collectionRef = collection(db, DB_COLLECTION.ORGANIZATIONS);
      const customQuery = where("userId", "==", createdBy);
      const qRef = query(collectionRef, customQuery);
      const querySnapShot = await getDocs(qRef);
      querySnapShot.forEach((docs) => {
        const data = { id: docs.id, ...docs.data() };
        parsedData.push(data);
      });
      setDataSource(parsedData);
    } catch (err) {
      await Swal.fire({
        text: "Internal Server Error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <div className="organization-wrapper">
      <div className="organization-container">
        <div className="header-actions">
          <h2>
            {" "}
            <FaBuilding /> Organization List
          </h2>
          <Link to="form">
            <Button
              type="none"
              className="add-organization-btn"
              icon={<FaBuilding />}
            >
              Add Organization
            </Button>
          </Link>
        </div>

        <div className="table-wrapper">
          <Table
            columns={columns}
            dataSource={dataSource}
            rowKey="id"
            bordered
            size="middle"
            pagination={{ position: ["bottomCenter"], pageSize: 8 }}
            scroll={{ x: "max-content" }}
            locale={{
              emptyText: loading ? (
                <div className="no-data-spinner">
                  <Spin tip="Loading..." />
                </div>
              ) : (
                "No organizations found."
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Organization;
