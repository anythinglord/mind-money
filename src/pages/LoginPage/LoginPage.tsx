import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import "./Login.css";

const LoginPage = () => {
    return(
        <div className="root">
            <div className="card">
                <div className="title">login</div>
                <div className="message">Enter your email and password to access your account</div>
                <Input label='Email'/>
                <Input type='password' label='Password' />
                <Button label='Log in' handleClick={() => alert('')}/>
                <div className="message">Don't have an account? Sign up</div>
            </div>
        </div>
    )
} 

export default LoginPage