import { useEffect, useState } from "react"
import "./Projects.css"
import { ProjectFilter } from "./ProjectFilter"
import { Project } from "./Project"

export const AllProjects = ({ currentUser, allProjects, allTypes, allLevels }) => {
    const [selectType, setSelectType] = useState("")
    const [selectLevel, setSelectLevel] = useState("")
    const [filteredProjects, setFilteredProjects] = useState([])

    useEffect(() => {
        let foundProjects = allProjects

        if (selectType) {
            foundProjects = foundProjects.filter(project => project.typeId === parseInt(selectType))
        }

        if (selectLevel) {
            foundProjects = foundProjects.filter(project => project.levelId === parseInt(selectLevel))
        }

        setFilteredProjects(foundProjects)
    }, [selectType, selectLevel, allProjects])

    return (
        <div className="projects-container">
            <h1>Crochet Corner</h1>
            <ProjectFilter allTypes={allTypes} allLevels={allLevels} setSelectType={setSelectType} setSelectLevel={setSelectLevel} />
                <article className="projects">
                    {filteredProjects.map((project) => {
                        return <Project currentUser={currentUser} project={project} key={project.id} />
                    })}
                </article>
        </div>
    )
}