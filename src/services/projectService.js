export const getAllProjects = () => {
    return fetch(`http://localhost:8088/projects?_expand=user&_expand=type&_expand=level&_embed=userProjectLikes`).then(res => res.json())
}

export const getAllTypes = () => {
    return fetch(`http://localhost:8088/types`).then(res => res.json())
}

export const getAllLevels = () => {
    return fetch(`http://localhost:8088/levels`).then(res => res.json())
}