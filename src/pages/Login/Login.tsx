import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { login, signup } from "../../services";
import { setUser } from "../../redux/states";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { isTrue } from "../../utils";
import { userSchema } from "../../schemas";
import { User } from "../../models";
import "./index.css";

const schema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string()
        .min(5, "Must be at least 12 characters long")
        /*.regex(/^(?=.*[a-z])(?=.*[A-Z])/, "Must include upper case letters")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Must contain at least one special character")
        .regex(/\d/, "Must contain at least one number"),*/,
    confirm: z.string(),
}).refine((data) => data.password === data.confirm, {
    message: "Passwords must match",
    path: ["confirm"],
});

const LoginPage = () => {
    const [mode, setMode] = useState<string>('login');
    const [errorLogin, setErrorLogin] = useState<boolean>(false)
    const [errorSignUp, setErrorSignUp] = useState<boolean>(false)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(userSchema(mode !== 'login')),
    });

    const onSubmit = (data: any) => {
        try {
            const { email, password } = data;
            if (mode === 'login') {
                loginUser.mutate({ email: email, password: password })
            }
        } catch (error) {

        }
        console.log(data, mode);
    };

    const onErrors = (errors: any) => console.error(errors);

    const label = mode === 'login' ? 'Log in' : 'Sign up'
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loginUser = useMutation({
        mutationFn: (userData: User) => login(userData.email, userData.password),
        onSuccess: (data) => {
            dispatch(setUser(data.user))
            navigate('/home')
        },
        onError: () => setErrorLogin(true),
    })

    const mutation = useMutation({
        mutationFn: () => login(emailRef.current?.value || '', passwordRef.current?.value || ''),
        onSuccess: (data) => {
            dispatch(setUser(data.user))
            navigate('/home')
        },
        onError: () => setErrorLogin(true),
    });

    const mutationSignup = useMutation({
        mutationFn: () => signup(emailRef.current?.value || '', passwordRef.current?.value || ''),
        onSuccess: (data) => {
            if (data.user) {
                dispatch(setUser(data.user))
                navigate('/home')
            }
        },
        onError: (error) => alert("Error: " + error.message),
    });

    const handleMutation = () => {
        if (mode === 'login') {
            mutation.mutate()
        } else {
            const password = passwordRef.current?.value || ''
            const confirmPassword = confirmPasswordRef.current?.value || ''
            if (password === confirmPassword) {
                setErrorSignUp(false)
                mutationSignup.mutate()
            } else {
                setErrorSignUp(true)
            }
        }
    }

    /**
     * Change mode between login and signup
     * @returns void
     */
    const changeMode = () => {
        setMode((prevMode) => {
            return prevMode === 'login' ? 'signup' : 'login'
        })
    }

    useEffect(() => {
        setErrorLogin(false)
        setErrorSignUp(false)
    }, [mode])

    return (
        <form onSubmit={handleSubmit(onSubmit, onErrors)}>
            <div className="root">
                <div className="card">
                    <div className="title">{label}</div>
                    <div className="message">Enter your email and password to {`${mode === 'login' ? 'access' : 'create'}`} your account</div>
                    <div className="error-message">{errorLogin && 'Invalid credentials'}</div>
                    <Input
                        label='email' register={register}
                        error={isTrue(errors.email)} errorMessage={errors.email?.message} />
                    <Input
                        type='password' label='password' register={register}
                        error={isTrue(errors.password)} errorMessage={errors.password?.message} />
                    {mode !== 'login' &&
                        <Input
                            type='password' label='confirm' register={register}
                            error={isTrue(errors.confirm)} errorMessage={errors.confirm?.message} />}
                    <Button label={`${label}`} /*handleClick={handleMutation}*/ />
                    <div className="message">
                        Don't have an account? <a onClick={changeMode}>{mode === 'login' ? 'Sign up' : 'Log in'}</a>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default LoginPage