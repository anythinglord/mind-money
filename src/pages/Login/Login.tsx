import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { login, signup } from "../../services";
import { setUser } from "../../redux/states";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import "./index.css";

const LoginPage = () => {
    const [mode, setMode] = useState<string>('login');
    const [errorLogin, setErrorLogin] = useState<boolean>(false)
    const [errorSignUp, setErrorSignUp] = useState<boolean>(false)

    const label = mode === 'login' ? 'Log in' : 'Sign up'
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()

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

    useEffect(()=>{
        setErrorLogin(false)
        setErrorSignUp(false)
    },[ mode ])

    return (
        <div className="root">
            <div className="card">
                <div className="title">{label}</div>
                <div className="message">Enter your email and password to {`${mode === 'login' ? 'access' : 'create'}`} your account</div>
                <div className="error-message">{errorLogin && 'Invalid credentials'}</div>
                <Input label='Email' inputRef={emailRef} />
                <Input type='password' label='Password' inputRef={passwordRef} />
                { mode !== 'login' && <Input type='password' error={errorSignUp} label='Confirm password' inputRef={confirmPasswordRef} />}
                <Button label={`${label}`} handleClick={handleMutation} />
                <div className="message">
                    Don't have an account? <a onClick={changeMode}>{mode === 'login' ? 'Sign up' : 'Log in'}</a>
                </div>
            </div>
        </div>
    )
}

export default LoginPage