import { AlertDialog, AspectRatio, Box, Button, Card, Heading, Inset, Text } from "@radix-ui/themes"
import { Link, useNavigate } from "react-router-dom"
// import crochetStar from "../../images/crochet-star.jpg"

export const Project = ({ currentUser, project, showEdit, showDelete, onDelete, showComplete, onToggleComplete, isComplete }) => {

    const navigate = useNavigate()

    return (
        <Card m="2"
            style={{
                backgroundColor: "rgb(167, 225, 248)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease"
                }}
                onMouseEnter={(event) => {
                    event.currentTarget.style.transform = "scale(1.01)";
                    event.currentTarget.style.boxShadow = "0px 0px 20px rgb(8, 130, 178)"
                    }}
                onMouseLeave={(event) => {
                    event.currentTarget.style.transform = "scale(1)";
                    event.currentTarget.style.boxShadow = "none"
                }} >
            <Link 
                to={`/projects/${project.id}`}
                style={{
                    textDecoration: "none",
                    color: "inherit"
                }} >
            <Inset clip="padding-box" side="top">
                <img
                    src={project.image}
                    alt={project.title}
                    style={{ width: "100%", height: "300px", objectFit: "cover", objectPosition: "center" }} />
            </Inset>
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
                    <Button m="1" onClick={() => navigate(`/projects/${project.id}/edit`)}>Edit</Button>
                    <AlertDialog.Root>
                    <AlertDialog.Trigger asChild >
                        <Button m="1">Delete</Button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Content style={{textAlign: "center", backgroundColor: "rgb(222, 242, 250)"}} >
                        <AlertDialog.Title m="3">Delete Project</AlertDialog.Title>
                        <AlertDialog.Description m="3">Are you sure you want to permanently delete "{project.title}"</AlertDialog.Description>
                        <Box>
                            <AlertDialog.Cancel asChild>
                                <Button m="3">Cancel</Button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action>
                                <Button m="3" onClick={() => onDelete(project.id)}>Delete</Button>
                            </AlertDialog.Action>
                        </Box>
                    </AlertDialog.Content>
                    </AlertDialog.Root>
                </Box>
            ) : ('')}
            {showComplete ? (
                <Button m="1" onClick={onToggleComplete}> {isComplete ? "Project Goals" : "Completed!"} </Button>
            ) : ('')}
        </Card>
    )
}