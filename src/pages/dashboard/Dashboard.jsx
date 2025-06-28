import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { logoutUser } from "../../store/slices/user";
import Swal from "sweetalert2";

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userConfirmation = async () => {
    const res = await Swal.fire({
      text: "Are you sure you want to logout",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      background: "#000",
      color: "#fff",
      customClass: {
        popup: "my-custom-modal",
        confirmButton: "my-confirm-btn",
        cancelButton: "my-cancel-btn",
      },
      position: "center",
      width: "370px",
    })
    return res.isConfirmed
  }

  return <div>Dashboard
    <div className="btns">
      <Link Link to={"/organization"} >
        <Button>
          Organization
        </Button>
      </Link >
      <Link to={"/user"}>
        <Button>
          User
        </Button>
      </Link>
      <Button onClick={async () => {
        const confirm = await userConfirmation()
        if (confirm) {
          dispatch(logoutUser())
          navigate("/login")
        }
      }}>
        Logout
      </Button>
    </div >
  </div >;
};
export default Dashboard;
