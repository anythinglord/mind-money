import "./Login.css";

export const Login = () => {
    return(
        <div className="root">
            <div className="card">
                <div className="title">login</div>
                <div className="message">Enter your email and password to access your account</div>
                Email
                <input/>
                Password
                <input type="password"/>
                <button className="button">
                    Log in
                </button>
                <div className="message">Don't have an account? Sign up</div>
            </div>
        </div>
    )
} 