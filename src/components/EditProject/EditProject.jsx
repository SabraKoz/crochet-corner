import { useEffect, useState } from "react"
import "./EditProject.css"
import { useNavigate, useParams } from "react-router-dom"
import { getProjectById, updateProject } from "../../services/projectService"

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
        const projectCopy = {...editProject}
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
        <form className="project-form">
            <h1>Edit Project</h1>
            <fieldset className="project-fieldset">
                <div>
                    <label>Title: </label>
                    <input
                        type="text"
                        name="title"
                        value={editProject.title ? editProject.title : ''}
                        onChange={handleInputChange}
                        required />
                </div>
            </fieldset>
            <fieldset className="project-fieldset">
                <div>
                    <label>Type: </label>
                    <select 
                        name="typeId"
                        value={editProject.typeId}
                        onChange={handleInputChange}>
                        <option value="" >Select Type</option>
                        {allTypes.map(type => {
                            return (<option value={type.id} key={type.id}>{type.name}</option>)
                        })}
                    </select>
                </div>
            </fieldset>
            <fieldset className="project-fieldset">
                <div>
                    <label>Difficulty Level: </label>
                    <select 
                        name="levelId"
                        value={editProject.levelId}
                        onChange={handleInputChange}>
                        <option value="" >Select Level</option>
                        {allLevels.map(level => {
                            return (<option value={level.id} key={level.id}>{level.name}</option>)
                        })}
                    </select>
                </div>
            </fieldset>
            <fieldset className="project-fieldset">
                <div>
                    <label>Skeins: </label>
                    <input 
                        type="number"
                        name="skeins"
                        value={editProject.skeins ? editProject.skeins : ''}
                        onChange={handleInputChange}
                        required />
                </div>
            </fieldset>
            <fieldset className="project-fieldset">
                <div>
                    <label>Yarn Weight: </label>
                    <input 
                        type="number"
                        name="weight"
                        value={editProject.weight ? editProject.weight : ''}
                        onChange={handleInputChange}
                        required />
                </div>
            </fieldset>
            <fieldset className="project-fieldset">
                <div>
                    <label>Hook Size: </label>
                    <input
                        type="text"
                        name="hook"
                        value={editProject.hook ? editProject.hook : ''}
                        onChange={handleInputChange}
                        required />
                </div>
            </fieldset>
            <fieldset className="project-fieldset">
                <div>
                    <label>Instructions: </label>
                    <textarea
                        type="text"
                        name="body"
                        value={editProject.body ? editProject.body : ''}
                        onChange={handleInputChange}
                        required />
                </div>
            </fieldset>
            <button className="btn" type="submit" onClick={handleSaveProject}>Save</button>
        </form>
    )
}