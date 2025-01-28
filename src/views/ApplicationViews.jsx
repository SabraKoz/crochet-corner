import { useEffect, useState } from "react"
import { Outlet, Routes, Route} from "react-router-dom"
import { NavBar } from "../components/nav/NavBar"
import { AllProjects } from "../components/projects/AllProjects"
import { ProjectDetails } from "../components/projects/ProjectDetails"
import { EditProject } from "../components/projects/EditProject"
import { CreateProject } from "../components/projects/CreateProject"
import { Profile } from "../components/users/Profile"
import { Favorites } from "../components/users/Favorites"

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const localCrochetUser = localStorage.getItem("crochet_user")
        const crochetUserObject = JSON.parse(localCrochetUser)

        setCurrentUser(crochetUserObject)
    }, [])

    return (
        <Routes>
            <Route path="/" element={<><NavBar currentUser={currentUser} /><Outlet /></>} >
                <Route index element={<AllProjects currentUser={currentUser} />} />
                <Route path="projects" >
                    <Route index element={<AllProjects currentUser={currentUser} />} />
                    <Route path=":projectId" element={<ProjectDetails currentUser={currentUser} />} />
                    <Route path=":projectId/edit" element={<EditProject />} />
                </Route>
                <Route path="createProject" element={<CreateProject />} />
                <Route path="favorites" element={<Favorites />} />
                <Route path="profile">
                    <Route index element={<Profile currentUser={currentUser} />} />
                    <Route path=":userId" element={<Profile currentUser={currentUser} />} />
                </Route>
            </Route>
        </Routes>
    )
}