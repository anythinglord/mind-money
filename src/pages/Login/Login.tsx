import { useRef } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import "./index.css";
import { login } from "../../services";
import { setUser } from "../../redux/states";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = () => {
        const email = emailRef.current?.value || ''
        const password = passwordRef.current?.value || ''  
        login(email, password)
            .then(response => {
                dispatch(setUser(response.user))
                navigate('/expenses')
            })
    }

    return(
        <div className="root">
            <div className="card">
                <div className="title">login</div>
                <div className="message">Enter your email and password to access your account</div>
                <Input label='Email' inputRef={emailRef}/>
                <Input type='password' label='Password' inputRef={passwordRef}/>
                <Button label='Log in' handleClick={handleLogin}/>
                <div className="message">Don't have an account? Sign up</div>
            </div>
        </div>
    )
} 

export default LoginPage