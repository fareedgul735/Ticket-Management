import useAuthorized from '../hooks/Authorized'
import { Outlet } from 'react-router'

const Auth = () => {
    useAuthorized()

    return <Outlet />

}

export default Auth
