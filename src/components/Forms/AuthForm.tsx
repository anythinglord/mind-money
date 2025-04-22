import { useEffect, useState } from 'react'
import { isTrue } from '../../utils'
import { Input } from '../Input'
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userSchema } from '../../schemas';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { LoginMode, User } from "../../models"
import { backdropCloseSubject$, backdropOpenSubject$ } from "../BackDrop";
import { setUser } from '../../redux/states';
import { login, signup } from '../../services';
import { Button } from '../Button';
import './index.css'

interface Props {
    mode?: LoginMode
    onSwitch: (mode: LoginMode) => void
}

export const AuthForm = ({ mode, onSwitch }: Props) => {
    
    const [error, setError] = useState({
            status: false,
        message: ''
    })
    
    const label = mode === 'login' ? 'Log in' : 'Sign up'
    const isLogin = mode === 'login'
    const dispatch = useDispatch()
    const navigate = useNavigate()

    
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(userSchema(!isLogin)),
    });

    const onSubmit = (data: any) => {
        try {
            backdropOpenSubject$.setSubject = true
            const { email, password } = data;
            isLogin ? loginUser.mutate({ email: email, password: password })
                : signUpUser.mutate({ email: email, password: password })

        } catch (error) {
            throw new Error("Error on submit")
        }
    };

    const loginUser = useMutation({
        mutationFn: (userData: User) => login(userData.email, userData.password),
        onSuccess: (data) => {
            dispatch(setUser(data.user))
            backdropCloseSubject$.setSubject = true
            navigate('/home')
        },
        onError: () => setError(prev => ({ status: !prev.status, message: 'Invalid credentials'})),
    })

    const signUpUser = useMutation({
        mutationFn: (userData: User) => signup(userData.email, userData.password),
        onSuccess: (data) => {
            if (data.user) {
                dispatch(setUser(data.user))
                navigate('/home')
            }
        },
        onError: () => setError(prev => ({ status: !prev.status, message: 'Server error'})),
    })

    useEffect(() => {
        setError(prev => ({ ...prev, status: false }))
    }, [isLogin])

    const changeMode = () => {
        mode === 'login' ? onSwitch('signup') : onSwitch('login')
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className='form-container'>
            <div className="title">{label}</div>
            <div className="message">Enter your email and password to {`${isLogin ? 'access' : 'create'}`} your account</div>
            <div className="error-message">{error && error.message}</div>
            <Input
                label='email' register={register}
                error={isTrue(errors.email)} errorMessage={errors.email?.message} />
            <Input
                type='password' label='password' register={register}
                error={isTrue(errors.password)} errorMessage={errors.password?.message} />
            {!isLogin &&
                <Input
                    type='password' label='confirm' register={register}
                    error={isTrue(errors.confirm)} errorMessage={errors.confirm?.message} />}
            <Button label={`${label}`} />
            <div className="message">
                <p>
                    <a onClick={() => onSwitch('forgot')}>{isLogin ? 'Forgot password?' : ''}</a>
                </p>
                Don't have an account? <a onClick={changeMode}>{isLogin ? 'Sign up' : 'Log in'}</a>
            </div>
        </form>
    )
}