import { useEffect, useState } from "react"
import "./ProjectDetails.css"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getProjectById } from "../../services/projectService"
import { likeProject, unlikeProject } from "../../services/userService"

export const ProjectDetails = ({ currentUser }) => {
    const [project, setProject] = useState([])
    const [hasLiked, setHasLiked] = useState(false)
    const [userLikeId, setUserLikeId] = useState(null)

    const { projectId } = useParams()
    
    const navigate = useNavigate()

    const getAndSetProject = () => {
        getProjectById(projectId).then(data => {
            const projectObj = data[0]
            setProject(projectObj)

            const userLike = projectObj.userProjectLikes?.find(like => like.userId === currentUser.id)

            setHasLiked(!!userLike)
            if (userLike) {
                setUserLikeId(userLike.id)
            }
        })
    }

    useEffect(() => {
        getAndSetProject()
    }, [])

    const handleLike = () => {
        const newUserProjectLikeObj = {
            userId: currentUser.id,
            projectId: parseInt(projectId),
            complete: false
        }

        likeProject(newUserProjectLikeObj).then(() => {
            getAndSetProject()
            navigate("/favorites")
        })
    }

    const handleUnlike = () => {
        unlikeProject(userLikeId).then(() => {
            getAndSetProject()
        })
    }

    return (
        <section className="project-details">
            <h1>{project.title}</h1>
            <div className="detail-top">
                <div className="details"><span className="detail-title">Creator: </span><Link to={`/profile/${project.user?.id}`} className="creator-link" >{project.user?.name}</Link></div>
                <div className="details"><span className="detail-title">Likes: </span>{project.userProjectLikes?.length}</div>
                {currentUser.id === project.userId ? (
                        <button className="btn" onClick={() => {navigate(`/projects/${projectId}/edit`)}} >Edit</button>
                    ) : (hasLiked ? (<button onClick={handleUnlike} className="btn">Unlike</button>) : (<button onClick={handleLike} className="btn">Like</button>))}
            </div>
            <div className="detail-main">
                <div className="details-main"><span className="detail-title">Type: </span>{project.type?.name}</div>
                <div className="details-main"><span className="detail-title">Difficulty Level: </span>{project.level?.name}</div>
                <div className="details-main"><span className="detail-title">Skeins: </span>{project.skeins}</div>
                <div className="details-main"><span className="detail-title">Yarn Weight: </span>{project.weight}</div>
                <div className="details-main"><span className="detail-title">Hook Size: </span>{project.hook}</div>
            </div>
            <div className="detail-body">
                <span className="detail-title" >Instructions: </span>{project.body}
            </div> 
        </section>
    )
}