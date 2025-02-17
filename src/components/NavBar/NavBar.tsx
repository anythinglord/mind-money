import { Avatar } from "../Avatar/Avatar"
import "./index.css"

export const NavBar = () => {
    return (
        <div className="navbar">
            <div className="logo">
                Mind Money
            </div>
            <div className="navigation">
                <a>Expenses</a>
                <a>Budget</a>
                <a>Goals</a>
                <a>Reports</a>
            </div>
            <Avatar />
        </div>
    )
}