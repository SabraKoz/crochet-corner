export const getComments = (projectId) => {
    return fetch(`http://localhost:8088/comments?projectId=${projectId}&_expand=user`).then(res => res.json())
}

export const postNewComment = (comment) => {
    return fetch(`http://localhost:8088/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    })
}

export const editComment = (commentId, updatedComment) => {
    return fetch(`http://localhost:8088/comments/${commentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedComment)
    })
}


export const deleteComment = (commentId) => {
    return fetch(`http://localhost:8088/comments/${commentId}`, {
        method: "DELETE",
    })
}