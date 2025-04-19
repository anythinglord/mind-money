import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { login, signup } from "../../services";
import { setUser } from "../../redux/states";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isTrue } from "../../utils";
import { userSchema } from "../../schemas";
import { User } from "../../models";
import "./index.css";
import { backdropCloseSubject$, backdropOpenSubject$ } from "../../components/BackDrop";

export const LoginPage = () => {

    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [error, setError] = useState({
        status: false,
        message: ''
    })
    const label = isLogin ? 'Log in' : 'Sign up'
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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="page-root">
                <div className="card">
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
                        Don't have an account? <a onClick={() => setIsLogin((prevMode) => !prevMode)}>{isLogin ? 'Sign up' : 'Log in'}</a>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default LoginPage