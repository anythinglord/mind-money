import { useEffect, useState } from "react";
import { login, signup } from "../../services";
import { setUser } from "../../redux/states";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../../schemas";
import { LoginMode, User } from "../../models";
import "./index.css";
import { backdropCloseSubject$, backdropOpenSubject$ } from "../../components/BackDrop";
import { LoginForm, ForgotPasswordForm } from "../../components/Forms";

export const LoginPage = () => {

    const [mode, setMode] = useState<LoginMode>('login')
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
        <div className="page-root">
            <div className="card">
                {mode === 'login' && <LoginForm mode={'login'} onSwitch={setMode} />}
                {mode === 'signup' && <LoginForm mode={'signup'} onSwitch={setMode} />}
                {mode === 'forgot' && <ForgotPasswordForm onSwitch={setMode} />}
            </div>
        </div>
    )
}

export default LoginPage