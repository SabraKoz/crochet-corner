export const getAllProjects = () => {
    return fetch(`http://localhost:8088/projects?_expand=user&_expand=type&_expand=level&_embed=userProjectLikes`).then(res => res.json())
}

export const getAllTypes = () => {
    return fetch(`http://localhost:8088/types`).then(res => res.json())
}

export const getAllLevels = () => {
    return fetch(`http://localhost:8088/levels`).then(res => res.json())
}

export const getProjectById = (id) => {
    return fetch(`http://localhost:8088/projects?id=${id}&_expand=user&_expand=type&_expand=level&_embed=userProjectLikes`).then(res => res.json())
}

export const getUserProjects = (userId) => {
    return fetch(`http://localhost:8088/projects?userId=${userId}&_expand=user&_expand=type&_expand=level&_embed=userProjectLikes`).then(res => res.json())
}

export const createNewProject = (projectId) => {
    return fetch("http://localhost:8088/projects", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(projectId)
    })
}

export const updateProject = (project) => {
    return fetch(`http://localhost:8088/projects/${project.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(project)
    })
}

export const deleteProject = (projectId) => {
    return fetch(`http://localhost:8088/projects/${projectId}`, {
        method: "DELETE",
    })
}