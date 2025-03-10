import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUserById } from "../../services/userService"
import { deleteProject, getUserProjects } from "../../services/projectService"
import { Project } from "../Projects/Project"
import { Box, Container, Grid, Heading } from "@radix-ui/themes"

export const Profile = ({ getAndSetAllProjects, currentUser }) => {
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
            getAndSetUserProjects()
            getAndSetAllProjects()
        })
    }

    return (
        <Container>
            <Box m="5" style={{ borderRadius: "20px", boxShadow: "0 0 20px gray", background: "rgb(196, 232, 246)", padding: "20px"}}>
            <Heading m="5" size="7" weight="bold" align="center" style={{ textShadow: "2px 2px 2px rgb(8, 130, 178)"}}>Projects Created by {user.name}</Heading  >
            <Grid m="5" columns="3" gap="3">
                {userProjects.map(project => (
                    <Project 
                        key={project.id} 
                        project={project} 
                        currentUser={currentUser} 
                        showEdit={true} 
                        showDelete={true} 
                        onDelete={handleDeleteProject} /> 
                    ))}
            </Grid>
            </Box>
        </Container>
    )
}