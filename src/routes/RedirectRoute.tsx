import { Outlet, Navigate } from 'react-router-dom';

const RedirectRoute = ({ }) => {

    const isAuthenticated = false;
    if (isAuthenticated) {
        return <Navigate to="/home"/>
    }
    return <Outlet/>
}

export default RedirectRoute;