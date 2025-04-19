import { useNavigate } from "react-router-dom"
import { Button } from "../../components/Button"

export const SessionExpired = () => {

    const navigate = useNavigate()

    return(
        <div className="page-root">
            <div className="page-card">
                <div>
                    <div className="flex-cen icon-medium">
                        <i className="fa-solid fa-triangle-exclamation" />
                    </div>
                    <h1>Your session has expired</h1>
                    <p>Please login in again to continue using the app</p>
                </div>
                <Button label="Log in" handleClick={() => navigate('/login')}/>
            </div>
        </div>
    )
}