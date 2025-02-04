import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getProjectById } from "../../services/projectService"
import { likeProject, unlikeProject } from "../../services/userService"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons"
import { faHeartCrack as faRegularHeart } from "@fortawesome/free-solid-svg-icons"
import { Box, Button, Card, Container, Heading, Strong, Text } from "@radix-ui/themes"

export const ProjectDetails = ({ currentUser }) => {
    const [project, setProject] = useState([])
    const [hasLiked, setHasLiked] = useState(false)
    const [userLikeId, setUserLikeId] = useState(null)

    const { projectId } = useParams()
    
    const navigate = useNavigate()

    const getAndSetProject = () => {
        getProjectById(projectId).then(data => {
            const projectObj = data[0]
            setProject(projectObj)

            const userLike = projectObj.userProjectLikes?.find(like => like.userId === currentUser.id)

            setHasLiked(!!userLike)
            if (userLike) {
                setUserLikeId(userLike.id)
            }
        })
    }

    useEffect(() => {
        getAndSetProject()
    }, [])

    const handleLike = () => {
        const newUserProjectLikeObj = {
            userId: currentUser.id,
            projectId: parseInt(projectId),
            complete: false
        }

        likeProject(newUserProjectLikeObj).then(() => {
            getAndSetProject()
            navigate("/favorites")
        })
    }

    const handleUnlike = () => {
        unlikeProject(userLikeId).then(() => {
            getAndSetProject()
        })
    }

    return (
        <Container>
            <Box m="5" style={{ borderRadius: "20px", background: "rgb(196, 232, 246)", padding: "20px"}}>
            <Heading m="5" size="7" weight="bold" align="center">{project.title}</Heading>
            <Box style={{display: "flex", justifyContent: "center", margin: "10px"}}>
                <Box m="2">
                    <Text weight="medium" style={{padding: "5px"}}>Creator: </Text>
                    <Link to={`/profile/${project.user?.id}`} style={{textDecoration: "none", color: "rgb(8, 130, 178)"}} ><Strong>{project.user?.name}</Strong></Link>
                </Box>
                <Box m="2">
                    <Text weight="medium" style={{padding: "5px"}}>Likes: </Text>
                    {project.userProjectLikes?.length}
                </Box>
                {currentUser.id === project.userId ? (
                        <Button m="1" onClick={() => {navigate(`/projects/${projectId}/edit`)}} >Edit</Button>
                    ) : (
                        hasLiked ? (
                            <Button m="1" onClick={handleUnlike}><FontAwesomeIcon icon={faSolidHeart} /></Button>
                        ) : (
                            <Button m="1" onClick={handleLike}><FontAwesomeIcon icon={faRegularHeart} /></Button>
                            ))}
            </Box>
            <Box>
                <Box m="5"><Text weight="medium">Type: </Text>{project.type?.name}</Box>
                <Box m="5"><Text weight="medium">Difficulty Level: </Text>{project.level?.name}</Box>
                <Box m="5"><Text weight="medium">Skeins: </Text>{project.skeins}</Box>
                <Box m="5"><Text weight="medium">Yarn Weight: </Text>{project.weight}</Box>
                <Box m="5"><Text weight="medium">Hook Size: </Text>{project.hook}</Box>
            </Box>
            <Box m="5">
                <Text weight="medium" >Instructions: </Text>
                    <Card m="2" >{project.body}</Card>
            </Box> 
            </Box>
        </Container>
    )
}