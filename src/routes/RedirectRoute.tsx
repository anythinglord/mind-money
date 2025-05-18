import { Outlet, Navigate } from 'react-router-dom';
import { AppStore } from '../redux/store';
import { useSelector } from 'react-redux';

const RedirectRoute = ({ }) => {

    const stateUser = useSelector((store: AppStore) => store.user)
    if (stateUser.id) {
        return <Navigate to="/home" />
    }
    return <Outlet/>
}

export default RedirectRoute;