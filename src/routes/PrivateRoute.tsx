import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = ({ }) => {

    const isAuthenticated  = true;
    if (!isAuthenticated) {
        return <Navigate to="/login"/>
    }
    return <Outlet/>
}

export default PrivateRoute;