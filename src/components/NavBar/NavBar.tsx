import { useNavigate } from "react-router-dom"
import { Avatar } from "../Avatar"
import "./index.css"

export const NavBar = () => {

    const navigate = useNavigate()

    return (
        <div className="navbar">
            <div className="logo">
                Mind Money
            </div>
            <div className="navigation">
                <a onClick={() => navigate('/expenses')} >Expenses</a>
                <a>Budget</a>
                <a>Goals</a>
                <a>Reports</a>
            </div>
            <Avatar />
        </div>
    )
}