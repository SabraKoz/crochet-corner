export const getUserByEmail = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`).then(res => res.json())
}

export const getUserById = (id) => {
    return fetch(`http://localhost:8088/users?id=${id}&_embed=projects`).then(res => res.json())
}
 
export const createUser = (user) => {
    return fetch("http://localhost:8088/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => res.json())
  }

  export const getUserLikedProjects = (userId) => {
    return fetch(`http://localhost:8088/userProjectLikes?userId=${userId}&_expand=project&_expand=user`)
        .then(res => res.json())
        .then((likedProjects) => {
            const projectIds = likedProjects.map((like) => like.project.id)
            return fetch(`http://localhost:8088/projects?id=${projectIds.join("&id=")}&_expand=type&_expand=level&_expand=user&_embed=userProjectLikes`)
                .then(res => res.json())
                .then((fullProjects) => {
                    return likedProjects.map((like) => ({...like, project: fullProjects.find((p) => p.id === like.project.id),}))
                })
        })
  }

export const likeProject = (like) => {
    return fetch(`http://localhost:8088/userProjectLikes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(like)
    })
}

export const unlikeProject = (projectId) => {
    return fetch(`http://localhost:8088/userProjectLikes/${projectId}`, {
        method: "DELETE",
    })
}