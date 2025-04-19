import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { AppStore } from '../redux/store';
import { useEffect } from 'react';
import { setUser, setTimeStamp } from '../redux/states';
import { useMutation } from '@tanstack/react-query';
import { verifySession } from '../services';

const PrivateRoute = ({ }) => {

    const stateUser = useSelector((store: AppStore) => store.user)
    const currentTimeStamp: string = (new Date()).toDateString()
    const userTimeStamp = stateUser?.timestamp ?? currentTimeStamp
    
    const dispatch = useDispatch()

    const mutation = useMutation({
        mutationFn: () => verifySession(),
        onSuccess: () => {
            dispatch(setTimeStamp(currentTimeStamp))
        },
        onError: () => dispatch(setUser(null))
    })

    useEffect(()=>{
        
        if (stateUser && currentTimeStamp !== userTimeStamp) {
            mutation.mutate()
        }  
    },[])
    
    
    if (!stateUser) {
        return <Navigate to="/expired" />
    }
    return <Outlet/>
}

export default PrivateRoute;