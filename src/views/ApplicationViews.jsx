import { useEffect, useState } from "react"
import { Outlet, Routes, Route} from "react-router-dom"
import { NavBar } from "../components/nav/NavBar"
import { AllProjects } from "../components/Projects/AllProjects"
import { ProjectDetails } from "../components/ProjectDetails/ProjectDetails"
import { EditProject } from "../components/EditProject/EditProject"
import { CreateProject } from "../components/CreateProject/CreateProject"
import { Profile } from "../components/users/Profile"
import { Favorites } from "../components/users/Favorites"
import { getAllLevels, getAllProjects, getAllTypes } from "../services/projectService"

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})
    const [allProjects, setAllProjects] = useState([])
    const [allTypes, setAllTypes] = useState([])
    const [allLevels, setAllLevels] = useState([])

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
        const localCrochetUser = localStorage.getItem("crochet_user")
        const crochetUserObject = JSON.parse(localCrochetUser)

        setCurrentUser(crochetUserObject)
    }, [])

    return (
        <Routes>
            <Route path="/" element={<><NavBar currentUser={currentUser} /><Outlet /></>} >
                <Route index element={<AllProjects currentUser={currentUser} allProjects={allProjects} allTypes={allTypes} allLevels={allLevels} />} />
                <Route path="projects" >
                    <Route index element={<AllProjects currentUser={currentUser} allProjects={allProjects} allTypes={allTypes} allLevels={allLevels} />} />
                    <Route path=":projectId" element={<ProjectDetails currentUser={currentUser} />} />
                    <Route path=":projectId/edit" element={<EditProject allTypes={allTypes} allLevels={allLevels} />} />
                </Route>
                <Route path="createProject" element={<CreateProject currentUser={currentUser} allTypes={allTypes} allLevels={allLevels} />} />
                <Route path="favorites" element={<Favorites currentUser={currentUser} />} />
                <Route path="profile">
                    <Route index element={<Profile currentUser={currentUser} />} />
                    <Route path=":userId" element={<Profile currentUser={currentUser} />} />
                </Route>
            </Route>
        </Routes>
    )
}