import { useState } from "react"
import { createNewProject } from "../../services/projectService"
import { useNavigate } from "react-router-dom"
import { AlertDialog, Box, Button, Container, Heading, Select, Text, TextArea, TextField } from "@radix-ui/themes"

export const CreateProject = ({ getAndSetAllProjects, currentUser, allTypes, allLevels }) => {
    const [newType, setNewType] = useState("")
    const [newLevel, setNewLevel] = useState("")
    const [newTitle, setNewTitle] = useState("")
    const [newBody, setNewBody] = useState("")
    const [newSkeins, setNewSkeins] = useState(0)
    const [newWeight, setNewWeight] = useState(0)
    const [newHook, setNewHook] = useState("")
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()

        const newProject = {
            title: newTitle,
            body: newBody,
            skeins: parseInt(newSkeins),
            weight: parseInt(newWeight),
            hook: newHook,
            image: "",
            userId: currentUser.id,
            typeId: parseInt(newType),
            levelId: parseInt(newLevel)
        }

        if (newTitle && newBody && newSkeins && newWeight && newHook && newType && newLevel) {
            createNewProject(newProject).then(() => {
                getAndSetAllProjects()
                navigate(`/profile/${currentUser.id}`)
            })
        } else {
            setIsAlertDialogOpen(true)
        }
    }

    return (
        <Container>
            <Box m="5" style={{ borderRadius: "20px", background: "rgb(196, 232, 246)", padding: "20px" }}>
            <Heading m="5" size="7" weight="bold" align="center">Create New Project</Heading>
            <Box m="3" maxWidth="300px">
                <Text>Title: </Text>
                <TextField.Root
                    type="text"
                    name="title"
                    value={newTitle}
                    onChange={(event) => setNewTitle(event.target.value)}
                    required
                    size="2" />
            </Box>
            <Box m="3">
                <Text>Type: </Text>
                <Select.Root 
                    value={newType}
                    onValueChange={setNewType}>
                    <Select.Trigger placeholder="Select Type" />
                    <Select.Content>
                        <Select.Group>
                            {allTypes.map(type => {
                                return (<Select.Item value={type.id} key={type.id}>{type.name}</Select.Item>)
                            })}
                        </Select.Group>
                    </Select.Content>
                </Select.Root>
            </Box>
            <Box m="3">
                <Text>Difficulty Level: </Text>
                <Select.Root 
                    value={newLevel}
                    onValueChange={setNewLevel}>
                    <Select.Trigger placeholder="Select Level" />
                    <Select.Content>
                        <Select.Group>
                            {allLevels.map(level => {
                                return (<Select.Item value={level.id} key={level.id}>{level.name}</Select.Item>)
                            })}
                        </Select.Group>
                    </Select.Content>
                </Select.Root>
            </Box>
            <Box m="3" maxWidth="300px">
                <Text>Skeins: </Text>
                <TextField.Root
                    type="number"
                    name="skeins"
                    value={newSkeins}
                    onChange={(event) => setNewSkeins(event.target.value)}
                    required />
            </Box>
            <Box m="3" maxWidth="300px">
                <Text>Yarn Weight: </Text>
                <TextField.Root
                    type="number"
                    name="weight"
                    value={newWeight}
                    onChange={(event) => setNewWeight(event.target.value)}
                    required />
            </Box>
            <Box m="3" maxWidth="300px">
                <Text>Hook Size: </Text>
                <TextField.Root
                    type="text"
                    name="hook"
                    value={newHook}
                    onChange={(event) => setNewHook(event.target.value)}
                    required />
            </Box>
            <Box m="3">
                <Text>Instructions: </Text>
                <TextArea
                    type="text"
                    name="body"
                    value={newBody}
                    onChange={(event) => setNewBody(event.target.value)}
                    required
                    size="3" />
            </Box>
            <Button m="5" type="submit" onClick={handleSubmit}>Submit Project</Button>
            </Box>

            <AlertDialog.Root open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen} >
                <AlertDialog.Content maxWidth="300px" style={{textAlign: "center", backgroundColor: "rgb(222, 242, 250)"}}>
                    <AlertDialog.Title m="3">Missing Information</AlertDialog.Title>
                    <AlertDialog.Description>Please complete all fields</AlertDialog.Description>
                    <Box style={{ display: "flex", justifyContent: "center" }}>
                        <AlertDialog.Cancel asChild>
                            <Button m="3" onClick={() => setIsAlertDialogOpen(false)}>Continue</Button>
                        </AlertDialog.Cancel>
                    </Box>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </Container>
    )
}