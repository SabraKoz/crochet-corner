import { useEffect, useState } from "react"
import { getUserLikedProjects } from "../../services/userService"
import { Project } from "../Projects/Project"


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
            <div>
                {likedProjects.map(project => (<Project key={project.id} project={project.project} />))}
            </div>
        </section>
    )
}