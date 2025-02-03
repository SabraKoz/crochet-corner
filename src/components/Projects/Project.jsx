import { Box, Button, Card, Heading, Text } from "@radix-ui/themes"
import { Link, useNavigate } from "react-router-dom"

export const Project = ({ currentUser, project, showEdit, showDelete, onDelete, showComplete, onToggleComplete, isComplete }) => {

    const navigate = useNavigate()

    return (
        <Card m="2"
            style={{
                backgroundColor: "#908eac"
                }} >
            <Link 
                to={`/projects/${project.id}`}
                style={{
                    textDecoration: "none",
                    color: "inherit"
                }} >
            <Heading size="5" weight="bold" >{project.title}</Heading>
            <Box>
                <Text weight="medium">Creator: </Text>{project.user?.name}
            </Box>
            <Box>
                <Text weight="medium">Type: </Text>{project.type?.name}
            </Box>
            <Box>
                <Text weight="medium">Level: </Text>{project.level?.name}
            </Box>
            <Box>
                <Text weight="medium">Number of Likes: </Text>{project.userProjectLikes?.length}
            </Box>
            </Link>
            {currentUser?.id === project.user?.id && showEdit && showDelete ? (
                <Box>
                    <Button m="1" onClick={() => navigate(`/projects/${project.id}/edit`)} className="btn">Edit</Button>
                    <Button m="1" onClick={() => onDelete(project.id)} className="btn">Delete</Button>
                </Box>
            ) : ('')}
            {showComplete ? (
                <Button m="1" onClick={onToggleComplete} className="btn"> {isComplete ? "Project Goals" : "Completed!"} </Button>
            ) : ('')}
        </Card>
    )
}