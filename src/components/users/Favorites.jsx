import { useEffect, useState } from "react"
import { getUserLikedProjects } from "../../services/userService"
import { Project } from "../Projects/Project"
import "./User.css"

export const Favorites = ({ currentUser }) => {
    const [likedProjects, setLikedProjects] = useState([])

    const getAndSetUserLikedProjects = () => {
        getUserLikedProjects(currentUser.id).then(projects => {
            setLikedProjects(projects)
        })
    }

    useEffect(() => {
        getAndSetUserLikedProjects()
    }, [currentUser])



    return (
        <section>
            <h1>Favorite Projects</h1>
            <div className="profile-projects">
                {likedProjects.map(project => (<Project key={project.id} project={project.project} />))}
            </div>
        </section>
    )
}