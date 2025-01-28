import { useEffect, useState } from "react"
import "./ProjectDetails.css"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getProjectById } from "../../services/projectService"

export const ProjectDetails = ({ currentUser }) => {
    const [project, setProject] = useState([])

    const { projectId } = useParams()
    
    const navigate = useNavigate()

    const getAndSetProject = () => {
        getProjectById(projectId).then(data => {
            const projectObj = data[0]
            setProject(projectObj)
        })
    }

    useEffect(() => {
        getAndSetProject()
    }, [])

    return (
        <section>
            <h1>{project.title}</h1>
            <div>
                <span className="detail-title">Creator: </span><Link to={`/profile/${project.user?.id}`} >{project.user?.name}</Link>
                <span className="detail-title">Likes: </span>{project.userProjectLikes?.length}
            </div>
            <div>
                <span className="detail-title">Type: </span>{project.type?.name}
                <span className="detail-title">Difficulty Level: </span>{project.level?.name}
                <span className="detail-title">Skeins: </span>{project.skeins}
                <span className="detail-title">Yarn Weight: </span>{project.weight}
                <span className="detail-title">Hook Size: </span>{project.hook}
            </div>
            <div>
                {project.body}
            </div>
                {currentUser.id === project.userId ? (
                        <button onClick={() => {navigate(`/projects/${projectId}/edit`)}} >Edit</button>
                    ) : ('')}
        </section>
    )
}