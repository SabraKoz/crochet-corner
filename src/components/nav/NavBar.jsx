import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = ({ currentUser }) => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar-item">
                <Link className="navbar-link" to="/projects">All Projects</Link>
            </li>
            <li className="navbar-item">
                <Link className="navbar-link" to="/createProject">Create Project</Link>
            </li>
            <li className="navbar-item">
                <Link className="navbar-link" to="/favorites">Favorites</Link>
            </li>
            <li className="navbar-item">
                <Link className="navbar-link" to={`/profile/${currentUser.id}`}>Profile</Link>
            </li>
            {localStorage.getItem("crochet_user") ? (
                <li className="navbar-item navbar-logout">
                    <Link
                        className="navbar-link"
                        to=""
                        onClick={() => {
                            localStorage.removeItem("crochet_user")
                            navigate("/login", { replace: true })
                        }}
                    >
                        Logout
                    </Link>
                </li>
            ) : (
                ""
            )}
        </ul>
    )
}