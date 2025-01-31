import { useEffect, useState } from "react"
import { editLikedProject, getUserById, getUserLikedProjects } from "../../services/userService"
import { Project } from "../Projects/Project"
import { Box, Container, Grid, Heading } from "@radix-ui/themes"

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
        <Container m="5">
            <Heading size="7" weight="bold" align="center">{user?.name}'s Favorite Projects</Heading>
            <Grid m="5" columns="2" gap="5">
                <Box >
                    <Heading size="6" weight="bold" align="center">{goalProjects.length} Project Goals</Heading>
                    {goalProjects.map(like => (
                        <Project 
                            key={like.id}
                            project={like.project}
                            currentUser={currentUser}
                            showComplete={true}
                            isComplete={false}
                            onToggleComplete={() => switchCompleteStatus(like.id)} />
                    ))}
                </Box>
    
                <Box >
                    <Heading size="6" weight="bold" align="center">{completeProjects.length} Projects Completed</Heading>
                    {completeProjects.map(like => (
                        <Project 
                            key={like.id}
                            project={like.project}
                            currentUser={currentUser}
                            showComplete={true}
                            isComplete={true}
                            onToggleComplete={() => switchCompleteStatus(like.id)} />
                    ))}
                </Box>
            </Grid>
        </Container>
    )
}