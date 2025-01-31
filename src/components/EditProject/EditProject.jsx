import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getProjectById, updateProject } from "../../services/projectService"
import { Box, Button, Container, Heading, Select, Text, TextArea, TextField } from "@radix-ui/themes"

export const EditProject = ({ allTypes, allLevels }) => {
    const [editProject, setEditProject] = useState([])

    const { projectId } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        getProjectById(projectId).then(data => {
            const projectObj = data[0]
            setEditProject(projectObj)
        })
    }, [projectId])

    const handleInputChange = (event) => {
        const projectCopy = { ...editProject }
        projectCopy[event.target.name] = event.target.value
        setEditProject(projectCopy)
    }

    const handleSaveProject = (event) => {
        event.preventDefault()
        const editedProject = {
            id: editProject.id,
            title: editProject.title,
            body: editProject.body,
            skeins: editProject.skeins,
            weight: editProject.weight,
            hook: editProject.hook,
            image: "",
            userId: editProject.userId,
            typeId: parseInt(editProject.typeId),
            levelId: parseInt(editProject.levelId)
        }

        updateProject(editedProject).then(() => {
            navigate(`/projects/${projectId}`)
        })
    }

    return (
        <Container>
            <Heading m="5" size="7" weight="bold" align="center">Edit Project</Heading>
            <Box m="3" maxWidth="300px">
                <Text>Title: </Text>
                <TextField.Root
                    type="text"
                    name="title"
                    value={editProject.title ? editProject.title : ''}
                    onChange={handleInputChange}
                    required
                    size="2" />
            </Box>
            <Box m="3">
                <Text>Type: </Text>
                <Select.Root value={editProject.typeId} onValueChange={handleInputChange}>
                <Select.Trigger />
                <Select.Content
                    name="typeId"
                    value={editProject.typeId}
                    onChange={handleInputChange}>
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
                <Select.Root value={editProject.levelId} onValueChange={handleInputChange}>
                    <Select.Trigger />
                <Select.Content
                    name="levelId"
                    value={editProject.levelId}
                    onChange={handleInputChange}>
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
                    value={editProject.skeins ? editProject.skeins : ''}
                    onChange={handleInputChange}
                    required />
            </Box>
            <Box m="3" maxWidth="300px">
                <Text>Yarn Weight: </Text>
                <TextField.Root
                    type="number"
                    name="weight"
                    value={editProject.weight ? editProject.weight : ''}
                    onChange={handleInputChange}
                    required />
            </Box>
            <Box m="3" maxWidth="300px">
                <Text>Hook Size: </Text>
                <TextField.Root
                    type="text"
                    name="hook"
                    value={editProject.hook ? editProject.hook : ''}
                    onChange={handleInputChange}
                    required />
            </Box>
            <Box m="3">
                <Text>Instructions: </Text>
                <TextArea
                    type="text"
                    name="body"
                    value={editProject.body ? editProject.body : ''}
                    onChange={handleInputChange}
                    required
                    size="3" />
            </Box>
            <Button m="5" type="submit" onClick={handleSaveProject}>Save</Button>
        </Container>
    )
}