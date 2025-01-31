import { useEffect, useState } from "react"
import { ProjectFilter } from "./ProjectFilter"
import { Project } from "./Project"
import { Container, Grid, Heading } from "@radix-ui/themes"

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
        <Container m="7">
            <Heading align="center" size="8" weight="bold" >Crochet Corner</Heading>
            <ProjectFilter allTypes={allTypes} allLevels={allLevels} setSelectType={setSelectType} setSelectLevel={setSelectLevel} />
                <Grid columns="3" gap="3">
                    {filteredProjects.map((project) => {
                        return <Project currentUser={currentUser} project={project} key={project.id} />
                    })}
                </Grid>
        </Container>
    )
}