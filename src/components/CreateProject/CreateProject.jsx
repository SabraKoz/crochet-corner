import { useState } from "react"
import "./CreateProject.css"
import { createNewProject } from "../../services/projectService"
import { useNavigate } from "react-router-dom"

export const CreateProject = ({ currentUser, allTypes, allLevels }) => {
    const [newType, setNewType] = useState("")
    const [newLevel, setNewLevel] = useState("")
    const [newTitle, setNewTitle] = useState("")
    const [newBody, setNewBody] = useState("")
    const [newSkeins, setNewSkeins] = useState(0)
    const [newWeight, setNewWeight] = useState(0)
    const [newHook, setNewHook] = useState("")

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()

        const newProject = {
            title: newTitle,
            body: newBody,
            skeins: newSkeins,
            weight: newWeight,
            hook: newHook,
            image: "",
            userId: currentUser.id,
            typeId: parseInt(newType),
            levelId: parseInt(newLevel)
        }

        if (newTitle && newBody && newSkeins && newWeight && newHook && newType && newLevel) {
            createNewProject(newProject).then(() => {
                navigate(`/profile/${currentUser.id}`)
            })
        } else {
            window.alert("Please complete all fields")
        }
    }

    return (
        <form className="project-form">
            <h1>Create New Project</h1>
            <fieldset className="project-fieldset">
                <div>
                    <label>Title: </label>
                    <input
                        type="text"
                        name="title"
                        value={newTitle}
                        onChange={(event) => setNewTitle(event.target.value)}
                        required
                        className="input" />
                </div>
            </fieldset>
            <fieldset className="project-fieldset">
                <div>
                    <label>Type: </label>
                    <select 
                        value={newType}
                        onChange={(event) => setNewType(event.target.value)}
                        className="input">
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
                        value={newLevel}
                        onChange={(event) => setNewLevel(event.target.value)}
                        className="input">
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
                        value={newSkeins}
                        onChange={(event) => setNewSkeins(event.target.value)}
                        required
                        className="input" />
                </div>
            </fieldset>
            <fieldset className="project-fieldset">
                <div>
                    <label>Yarn Weight: </label>
                    <input 
                        type="number"
                        name="weight"
                        value={newWeight}
                        onChange={(event) => setNewWeight(event.target.value)}
                        required
                        className="input" />
                </div>
            </fieldset>
            <fieldset className="project-fieldset">
                <div>
                    <label>Hook Size: </label>
                    <input
                        type="text"
                        name="hook"
                        value={newHook}
                        onChange={(event) => setNewHook(event.target.value)}
                        required
                        className="input" />
                </div>
            </fieldset>
            <fieldset className="project-fieldset">
                <div>
                    <label>Instructions: </label>
                    <textarea
                        type="text"
                        name="body"
                        value={newBody}
                        onChange={(event) => setNewBody(event.target.value)}
                        required
                        className="input-body" />
                </div>
            </fieldset>
            <button className="btn" type="submit" onClick={handleSubmit}>Submit Project</button>
        </form>
    )
}