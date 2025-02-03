import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUser, getUserByEmail } from "../../services/userService"
import { Box, Button, Container, Heading, TextField } from "@radix-ui/themes"

export const Register = (props) => {
  const [user, setUser] = useState({
    email: "",
    name: "",
  })
  let navigate = useNavigate()

  const registerNewUser = () => {
    const newUser = {
      ...user,
    }

    createUser(newUser).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "crochet_user",
          JSON.stringify({
            id: createdUser.id,
          })
        )

        navigate("/")
      }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists")
      } else {
        // Good email, create user.
        registerNewUser()
      }
    })
  }

  const updateUser = (evt) => {
    const copy = { ...user }
    copy[evt.target.id] = evt.target.value
    setUser(copy)
  }

  return (
    <Container>
      <form onSubmit={handleRegister}>
        <Heading size="8" align="center" m="7">Crochet Corner</Heading>
        <Heading size="5" align="center" m="3">Please Register</Heading>
        <Box m="3" style={{ display: "flex", justifyContent: "center" }}>
            <TextField.Root
              onChange={updateUser}
              type="text"
              id="name"
              placeholder="Enter your name"
              required
              autoFocus
            />
        </Box>
        <Box m="3" style={{ display: "flex", justifyContent: "center" }}>
            <TextField.Root
              onChange={updateUser}
              type="email"
              id="email"
              placeholder="Email address"
              required
            />
        </Box>
        <Box m="3" style={{ display: "flex", justifyContent: "center" }}>
            <Button type="submit">Register</Button>
        </Box>
      </form>
    </Container>
  )
}