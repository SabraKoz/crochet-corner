import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getProjectById, updateProject } from "../../services/projectService"
import { Box, Button, Container, Heading, Select, Text, TextArea, TextField } from "@radix-ui/themes"

export const EditProject = ({ getAndSetAllProjects, allTypes, allLevels }) => {
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
        const { name, value } = event.target
        setEditProject(object => ({...object, [name]: value }))
    }

    const handleSelectChange = (name, value) => {
        setEditProject(object => ({...object, [name]: value }))
    }

    const handleSaveProject = (event) => {
        event.preventDefault()
        const editedProject = {
            id: editProject.id,
            title: editProject.title,
            body: editProject.body,
            skeins: parseInt(editProject.skeins),
            weight: parseInt(editProject.weight),
            hook: editProject.hook,
            image: editProject.image,
            userId: editProject.userId,
            typeId: parseInt(editProject.typeId),
            levelId: parseInt(editProject.levelId)
        }

        updateProject(editedProject).then(() => {
            getAndSetAllProjects()
            navigate(`/projects/${projectId}`)
        })
    }

    return (
        <Container>
            <Box m="5" style={{ borderRadius: "20px", background: "rgb(196, 232, 246)", padding: "20px" }}>
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
                <Select.Root 
                    name="typeId" 
                    value={editProject.typeId} 
                    onValueChange={(value) => handleSelectChange('typeId', value)}>
                <Select.Trigger />
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
                    name="levelId" 
                    value={editProject.levelId} 
                    onValueChange={(value) => handleSelectChange('levelId', value)}>
                    <Select.Trigger />
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
            <Button m="5" type="submit" onClick={handleSaveProject}>Save Changes</Button>
            </Box>
        </Container>
    )
}