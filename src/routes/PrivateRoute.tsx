import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { AppStore } from '../redux/store';

const PrivateRoute = ({ }) => {

    const stateUser = useSelector((store: AppStore) => store.user)
    if (!stateUser) {
        return <Navigate to="/login"/>
    }
    return <Outlet/>
}

export default PrivateRoute;