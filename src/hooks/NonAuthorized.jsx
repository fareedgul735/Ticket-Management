import { useEffect } from "react";
import { useNavigate } from "react-router";

const useNonAuthorized = () => {
    const navigate = useNavigate()
    const userId = localStorage.getItem("userId");
    useEffect(() => {
        if (!userId) navigate("/admin/form")
    }, [])

}

export default useNonAuthorized