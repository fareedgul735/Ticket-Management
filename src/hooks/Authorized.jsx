import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const useAuthorized = () => {
    const { userId } = useSelector((state) => state?.user)
    const navigate = useNavigate()
    useEffect(() => {
        if (userId) navigate("/dashboard")
    }, [])

}

export default useAuthorized
