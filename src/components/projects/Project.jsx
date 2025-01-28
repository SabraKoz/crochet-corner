export const Project = ({ project }) => {

    return (
        <section className="project">
            <header className="project-title">{project.title}</header>
            <div className="project-info">
                <span className="info-title">Type: </span>{project.type.name}
            </div>
            <div className="project-info">
                <span className="info-title">Level: </span>{project.level.name}
            </div>
            <div className="project-info">
                <span className="info-title">Number of Likes: </span>{project.userProjectLikes.length}
            </div>
        </section>
    )
}