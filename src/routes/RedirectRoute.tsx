import { Outlet, Navigate } from 'react-router-dom';

const RedirectRoute = ({ }) => {

    const isAuthenticated = true;
    if (isAuthenticated) {
        return <Navigate to="/home"/>
    }
    return <Outlet/>
}

export default RedirectRoute;