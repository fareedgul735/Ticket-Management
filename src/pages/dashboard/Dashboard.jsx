import { Button } from "antd";
import { Link } from "react-router";

const Dashboard = () => {
  return <div>Dashboard
    <div className="btns">
      <Link to={"/organization"}>
        <Button>
          Organization
        </Button>
      </Link>
      <Link to={"/user"}>
        <Button>
          User
        </Button>
      </Link>
    </div>
  </div>;
};
export default Dashboard;
