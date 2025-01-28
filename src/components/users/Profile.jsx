import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUserById } from "../../services/userService"
import { deleteProject, getUserProjects } from "../../services/projectService"
import { Project } from "../Projects/Project"
import "./User.css"

export const Profile = ({ currentUser }) => {
    const [user, setUser] = useState([])
    const [userProjects, setUserProjects] = useState([])

    const { userId } = useParams()

    useEffect(() => {
        getUserById(userId).then(data => {
            const userObj = data[0]
            setUser(userObj)
        })
    }, [userId])

    const getAndSetUserProjects = () => {
        getUserProjects(userId).then(projects => {
            setUserProjects(projects)
        })
    }

    useEffect(() => {
        getAndSetUserProjects()
    }, [userId])

    const handleDeleteProject = (projectId) => {
        deleteProject(projectId).then(() => {
            getAndSetUserProjects(userProjects)
        })
    }

    return (
        <section>
            <h1>{user.name}'s Projects</h1>
            <div className="profile-projects">
                {userProjects.map(project => (<Project key={project.id} project={project} showDelete={true} onDelete={handleDeleteProject} /> ))}
            </div>
        </section>
    )
}