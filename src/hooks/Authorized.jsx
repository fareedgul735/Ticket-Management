import { useEffect } from "react";
import { useNavigate } from "react-router";

const useAuthorized = () => {
    const navigate = useNavigate()
    const userId = localStorage.getItem("userId");
    useEffect(() => {
        if (userId) navigate("/dashboard")
    }, [])

}

export default useAuthorized
