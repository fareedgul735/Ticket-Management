import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const useNonAuthorized = () => {
    const { userId } = useSelector((state) => state?.user)

    const navigate = useNavigate()
    useEffect(() => {
        if (!userId) navigate("/")
    }, [])

}

export default useNonAuthorized