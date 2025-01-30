import { useEffect, useState } from "react"
import { editLikedProject, getUserById, getUserLikedProjects } from "../../services/userService"
import { Project } from "../Projects/Project"
import "./User.css"

export const Favorites = ({ currentUser }) => {
    const [likedProjects, setLikedProjects] = useState([])
    const [user, setUser] = useState([])
    const [completeProjects, setCompleteProjects] = useState([])
    const [goalProjects, setGoalProjects] = useState([])

    useEffect(() => {
        getUserById(currentUser.id).then(data => {
            const userObj = data[0]
            setUser(userObj)
        })
    }, [currentUser])

    const getAndSetUserLikedProjects = () => {
        getUserLikedProjects(currentUser.id).then(projects => {
            setLikedProjects(projects)
        })
    }

    useEffect(() => {
        getAndSetUserLikedProjects()
    }, [currentUser])

    useEffect(() => {
        const complete = likedProjects.filter((project) => project.complete === true)
        const goal = likedProjects.filter((project) => project.complete === false)

        setCompleteProjects(complete)
        setGoalProjects(goal)
    }, [likedProjects])

    const switchCompleteStatus = (projectId) => {
        const updatedProjects = likedProjects.map(project => project.id === projectId ? {...project, complete: !project.complete} : project)
        setLikedProjects(updatedProjects)

        const updatedProject = updatedProjects.find(project => project.id === projectId)
        editLikedProject(updatedProject)
    }

    return (
        <section>
            <h1>{user?.name}'s Favorite Projects</h1>
            <div className="favorites-container">
                <div className="favorite-column">
                    <h2>~ {goalProjects.length} Project Goals ~</h2>
                    {goalProjects.map(like => (
                        <Project 
                            key={like.id}
                            project={like.project}
                            currentUser={currentUser}
                            showComplete={true}
                            isComplete={false}
                            onToggleComplete={() => switchCompleteStatus(like.id)} />
                    ))}
                </div>

                <div className="favorite-column">
                    <h2>~ {completeProjects.length} Projects Completed ~</h2>
                    {completeProjects.map(like => (
                        <Project 
                            key={like.id}
                            project={like.project}
                            currentUser={currentUser}
                            showComplete={true}
                            isComplete={true}
                            onToggleComplete={() => switchCompleteStatus(like.id)} />
                    ))}
                </div>
            </div>
        </section>
    )
}