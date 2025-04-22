import { useState } from "react";
import { LoginMode } from "../../models";
import { AuthForm, ForgotPasswordForm } from "../../components/Forms";
import "./index.css";

export const LoginPage = () => {

    const [mode, setMode] = useState<LoginMode>('login')
    return (
        <div className="page-root">
            <div className="card">
                {mode === 'login' && <AuthForm mode={'login'} onSwitch={setMode} />}
                {mode === 'signup' && <AuthForm mode={'signup'} onSwitch={setMode} />}
                {mode === 'forgot' && <ForgotPasswordForm onSwitch={setMode} />}
            </div>
        </div>
    )
}

export default LoginPage