import { useRef } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { login } from "../../services";
import { setUser } from "../../redux/states";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import "./index.css";

const LoginPage = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: () => login(emailRef.current?.value || '', passwordRef.current?.value || ''),
        onSuccess: (data) => {
            dispatch(setUser(data.user))
            navigate('/expenses')
        },
        onError: (error) => alert("Error: " + error.message),
    });

    return (
        <form 
            onSubmit={(e) => {
                e.preventDefault();
                mutation.mutate();
            }}
        >
            <div className="root">
                <div className="card">
                    <div className="title">login</div>
                    <div className="message">Enter your email and password to access your account</div>
                    <Input label='Email' inputRef={emailRef} />
                    <Input type='password' label='Password' inputRef={passwordRef} />
                    <Button label='Log in' /*handleClick={handleLogin}*/ />
                    <div className="message">Don't have an account? Sign up</div>
                </div>
            </div>
        </form>
    )
}

export default LoginPage