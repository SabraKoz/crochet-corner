import { useEffect, useState } from "react"
import { deleteComment, editComment, getComments, postNewComment } from "../../services/commentService"
import { Box, Button, Card, Dialog, Text, TextArea, TextField } from "@radix-ui/themes"


export const ProjectComments = ({ projectId, currentUser }) => {
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const [editedComment, setEditedComment] = useState("")

    useEffect(() => {
        getComments(projectId).then((data) => setComments(data))
    }, [projectId])

    const handleSubmit = (event) => {
        event.preventDefault()
        const commentObj = {
            projectId: parseInt(projectId),
            userId: currentUser.id,
            body: newComment,
            timestamp: new Date().toISOString()
        }

        postNewComment(commentObj).then(() => {
            setNewComment("")
            getComments(projectId).then((data) => setComments(data))
        })
    }

    const handleChangeEditComment = (event) => {
        setEditedComment((prev) => ({
            ...prev,
            body: event.target.value
        }))
    }

    const handleEditComment = (comment) => {
        const updatedComment = {
            projectId: editedComment.projectId,
            userId: editedComment.userId,
            body: editedComment.body,
            timestamp: new Date().toISOString()
        }

        editComment(comment.id, updatedComment).then(() => {
            getComments(projectId).then((data) => setComments(data))
            setEditedComment({})
        })
    }

    const handleDeleteComment = (commentId) => {
        deleteComment(commentId).then(() => {
            getComments(projectId).then((data) => setComments(data))
        })
    }

    return (
        <Box m="9" style={{ padding: "20px", border: "3px solid rgb(222, 242, 250)", borderRadius: "10px" }}>
            <Text weight="medium">Comments:</Text>
            <form onSubmit={handleSubmit}>
                <TextArea
                    value={newComment}
                    onChange={(event) => setNewComment(event.target.value)}
                    placeholder="Add a comment..."
                    style={{ width: "100%", marginTop: "10px" }} />
                <Button type="submit" m="2" disabled={!newComment.trim()}>Post Comment</Button>
            </form>
            {comments.map(comment => (
                <Card key={comment.id} m="2" >
                    <Box style={{ display: "flex", justifyContent: "space-between" }} >
                        <Text weight="bold">{comment.user?.name}</Text>
                        <Text>{new Date(comment.timestamp).toLocaleDateString()}</Text>
                    </Box>
                    <Box m="2">{comment.body}</Box>
                    {currentUser.id === comment.userId && (
                        <Box>
                            <Dialog.Root>
                                <Dialog.Trigger>
                                    <Button m="2" onClick={() => setEditedComment(comment)}>Edit</Button>
                                </Dialog.Trigger>
                                <Dialog.Content maxWidth="500px" style={{ backgroundColor: "rgb(222, 242, 250)" }}>
                                    <Dialog.Title m="2" style={{ textAlign: "center" }}>Edit Comment</Dialog.Title>
                                    <Dialog.Description m="2">New comment:</Dialog.Description>
                                    <TextField.Root m="2" value={editedComment.body ? editedComment.body : ''} onChange={handleChangeEditComment} />
                                    <Dialog.Close>
                                        <Button m="2">Cancel</Button>
                                    </Dialog.Close>
                                    <Dialog.Close>
                                        <Button m="2" onClick={() => handleEditComment(comment)}>Save</Button>
                                    </Dialog.Close>
                                </Dialog.Content>
                            </Dialog.Root>
                            <Button m="2" onClick={() => handleDeleteComment(comment.id)} >Delete</Button>
                        </Box>
                    )}
                </Card>
            ))}
        </Box>
    )
}