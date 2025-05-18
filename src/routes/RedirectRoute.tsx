import { Outlet, Navigate } from 'react-router-dom';
import { AppStore } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { verifySession } from '../services';
import { setId, setUser } from '../redux/states';

const RedirectRoute = ({ }) => {

    const stateUser = useSelector((store: AppStore) => store.user)
    const userId = stateUser ? stateUser.id : null
    const dispatch = useDispatch()
    
    const mutation = useMutation({
        mutationFn: () => verifySession(),
        onSuccess: (response) => {
            const { userId } = response
            dispatch(setId(userId))
        },
        onError: () => dispatch(setUser(null))
    })
    
    useEffect(()=>{
        mutation.mutate()
    },[])

    if (userId) {
        return <Navigate to="/home" />
    }
    return <Outlet/>
}

export default RedirectRoute;