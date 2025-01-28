import { useEffect, useState } from "react"
import "./Projects.css"
import { ProjectFilter } from "./ProjectFilter"
import { getAllLevels, getAllProjects, getAllTypes } from "../../services/projectService"
import { Project } from "./Project"

export const AllProjects = () => {
    const [allProjects, setAllProjects] = useState([])
    const [allTypes, setAllTypes] = useState([])
    const [allLevels, setAllLevels] = useState([])
    const [selectType, setSelectType] = useState("")
    const [selectLevel, setSelectLevel] = useState("")
    const [filteredProjects, setFilteredProjects] = useState([])

    const getAndSetAllProjects = () => {
        getAllProjects().then(projectArray => { setAllProjects(projectArray) })
    }

    const getAndSetAllTypes = () => {
        getAllTypes().then(typeArray => { setAllTypes(typeArray) })
    }

    const getAndSetAllLevels = () => {
        getAllLevels().then(levelArray => { setAllLevels(levelArray) })
    }

    useEffect(() => {
        getAndSetAllProjects()
        getAndSetAllTypes()
        getAndSetAllLevels()
    }, [])

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
                        return <Project project={project} key={project.id} />
                    })}
                </article>
        </div>
    )
}