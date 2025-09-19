import { Card, Row, Col } from "antd";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./Dashboard.module.css";
import { DB_COLLECTION, salesData, weeklyData } from "../../lib/constant";
import { Link } from "react-router";
import { PlusOutlined } from "@ant-design/icons";
import { collection, db, getDocs, or, query, where } from "../../lib/firebase";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [ticketCount, setTicketCount] = useState(0);
  const [orgCount, setOrgCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);

  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketRef = collection(db, DB_COLLECTION.TICKETS);
        const ticketQuery = query(
          ticketRef,
          or(where("userId", "==", userId), where("assignedTo", "==", userId))
        );
        const ticketSnap = await getDocs(ticketQuery);
        setTicketCount(ticketSnap.size);

        const orgRef = collection(db, DB_COLLECTION.ORGANIZATIONS);
        const orgQuery = query(orgRef, where("userId", "==", userId));
        const orgSnap = await getDocs(orgQuery);
        setOrgCount(orgSnap.size);

        const empRef = collection(db, DB_COLLECTION.USERS);
        const empQuery = query(
          empRef,
          or(
            where("createdBy", "==", userId),
            where("assignedTo", "==", userId)
          )
        );
        const empSnap = await getDocs(empQuery);
        setEmployeeCount(empSnap.size);


      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    if (userId) fetchData();
  }, [userId]);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Dashboard</h2>

      <Row gutter={[16, 16]} className={styles.kpiRow}>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card className={styles.kpiCard}>
            <h3>All Tickets</h3>
            <p className={styles.kpiValue}>{ticketCount}</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card className={styles.kpiCard}>
            <h3>Organizations</h3>
            <p className={styles.kpiValue}>{orgCount}</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card className={styles.kpiCard}>
            <h3>Completed Task</h3>
            <p className={styles.kpiValue}>2,044</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card className={styles.kpiCard}>
            <h3>All Employees</h3>
            <p className={styles.kpiValue}>{employeeCount}</p>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className={styles.trendingRow}>
        <Col xs={24} md={12}>
          <Card title="Pending Tickets">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="netSales" fill="#4cafef" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Completed Tickets">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#4caf50" />
                <Line type="monotone" dataKey="returns" stroke="#f44336" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Card
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <span>Tickets</span>
            <span style={{ fontSize: "18px" }}>
              <Link to={"/tasks/addTasks"}>
                <PlusOutlined />
              </Link>
            </span>
          </div>
        }
        className={styles.sectionCard}
      >
        <p>Total Tickets: {ticketCount}</p>
        <p>Resolved Tickets: 450</p>
        <p>Pending Tickets: 35</p>
      </Card>

      <Card
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <span>Organizations</span>
            <span style={{ fontSize: "18px" }}>
              <Link to={"/organization/form"}>
                <PlusOutlined />
              </Link>
            </span>
          </div>
        }
        className={styles.sectionCard}
      >
        <p>Total Organizations: {orgCount}</p>
        <p>Teams: 24</p>
        <p>Locations: 3</p>
      </Card>

      <Card
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <span>Employees</span>
            <span style={{ fontSize: "18px" }}>
              <Link to={"/employee/form"}>
                <PlusOutlined />
              </Link>
            </span>
          </div>
        }
        className={styles.sectionCard}
      >
        <p>Total Employees: {employeeCount}</p>
        <p>Active: 300</p>
        <p>On Leave: 20</p>
      </Card>
    </div>
  );
};

export default Dashboard;
