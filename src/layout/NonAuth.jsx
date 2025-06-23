import { Outlet } from 'react-router'
import useNonAuthorized from '../hooks/NonAuthorized'

const NonAuth = () => {
    useNonAuthorized();

    return <Outlet />

}

export default NonAuth
