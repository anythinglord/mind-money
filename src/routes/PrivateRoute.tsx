import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { AppStore } from '../redux/store';

const PrivateRoute = ({ }) => {

    const stateUser = useSelector((store: AppStore) => store.user)
    const userId = stateUser ? stateUser.id : null
    
    if (!userId) {
        return <Navigate to="/expired" />
    }
    return <Outlet/>
}

export default PrivateRoute;