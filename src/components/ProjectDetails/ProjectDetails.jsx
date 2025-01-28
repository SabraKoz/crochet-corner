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
        <section className="project-details">
            <h1>{project.title}</h1>
            <div className="detail-top">
                <div className="details"><span className="detail-title">Creator: </span><Link to={`/profile/${project.user?.id}`} className="creator-link" >{project.user?.name}</Link></div>
                <div className="details"><span className="detail-title">Likes: </span>{project.userProjectLikes?.length}</div>
            </div>
            <div className="detail-main">
                <div className="details"><span className="detail-title">Type: </span>{project.type?.name}</div>
                <div className="details"><span className="detail-title">Difficulty Level: </span>{project.level?.name}</div>
                <div className="details"><span className="detail-title">Skeins: </span>{project.skeins}</div>
                <div className="details"><span className="detail-title">Yarn Weight: </span>{project.weight}</div>
                <div className="details"><span className="detail-title">Hook Size: </span>{project.hook}</div>
            </div>
            <div className="detail-body">
                <span className="detail-title" >Instructions: </span>{project.body}
            </div>
                {currentUser.id === project.userId ? (
                        <button className="btn" onClick={() => {navigate(`/projects/${projectId}/edit`)}} >Edit</button>
                    ) : ('')}
        </section>
    )
}