import { Link, useNavigate } from "react-router-dom"

export const Project = ({ currentUser, project, showEdit, showDelete, onDelete }) => {

    const navigate = useNavigate()

    return (
        <section className="project">
            <Link to={`/projects/${project.id}`} className="project-link">
            <header className="project-title">{project.title}</header>
            <div className="project-info">
                <span className="info-title">Type: </span>{project.type?.name}
            </div>
            <div className="project-info">
                <span className="info-title">Level: </span>{project.level?.name}
            </div>
            <div className="project-info">
                <span className="info-title">Number of Likes: </span>{project.userProjectLikes?.length}
            </div>
            </Link>
            {currentUser?.id === project.user?.id && showEdit && showDelete ? (
                <div>
                    <button onClick={() => navigate(`/projects/${project.id}/edit`)} className="btn">Edit</button>
                    <button onClick={() => onDelete(project.id)} className="btn">Delete</button>
                </div>
            ) : ('')}
        </section>
    )
}