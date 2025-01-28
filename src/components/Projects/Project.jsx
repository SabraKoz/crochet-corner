import { Link } from "react-router-dom"

export const Project = ({ currentUser, project, showDelete, onDelete }) => {

    return (
        <section className="project">
            <Link to={`/projects/${project?.id}`} className="project-link">
            <header className="project-title">{project?.title}</header>
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
            {currentUser?.id === project.user?.id && showDelete ? (<button onClick={() => onDelete(project.id)}>Delete</button>) : ('')}
        </section>
    )
}