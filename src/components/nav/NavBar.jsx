import { Link, useLocation, useNavigate } from "react-router-dom"
import { TabNav } from "@radix-ui/themes"

export const NavBar = ({ currentUser }) => {
    const navigate = useNavigate()

    const { pathname } = useLocation()

    return (
        <>
            <TabNav.Root justify="center" style={{backgroundColor: "rgb(196, 232, 246)"}}>
                <TabNav.Link asChild active={pathname === "/projects"}>
                    <Link to="/projects">All Projects</Link>
                </TabNav.Link>

                <TabNav.Link asChild active={pathname === "/createProject"}>
                    <Link to="/createProject" >Create Project</Link>
                </TabNav.Link>

                <TabNav.Link asChild active={pathname === "/favorites"}>
                    <Link to="/favorites" >Favorites</Link>
                </TabNav.Link>

                <TabNav.Link asChild active={pathname === `/profile/${currentUser.id}`}>
                    <Link to={`/profile/${currentUser.id}`} >Profile</Link>
                </TabNav.Link>

                <TabNav.Link asChild active={pathname === ""} >
                    {localStorage.getItem("crochet_user") ? (

                        <Link

                            to=""
                            onClick={() => {
                                localStorage.removeItem("crochet_user")
                                navigate("/login", { replace: true })
                            }}
                        >
                            Logout
                        </Link>

                    ) : (
                        ""
                    )}
                </TabNav.Link>
            </TabNav.Root>
        </>
    )
}