import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { getUserByEmail } from "../../services/userService"
import { Box, Button, Container, Heading, TextField } from "@radix-ui/themes"

export const Login = () => {
  const [email, set] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    return getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0]
        localStorage.setItem(
          "crochet_user",
          JSON.stringify({
            id: user.id,
          })
        )

        navigate("/")
      } else {
        window.alert("Invalid login")
      }
    })
  }

  return (
    <Container>
      <Box m="5" style={{ borderRadius: "20px", background: "rgb(196, 232, 246)", padding: "20px" }}>
      <form onSubmit={handleLogin}>
        <Heading size="8" align="center" m="7">Welcome to Crochet Corner</Heading>
        <Heading size="5" align="center" m="3">Please sign in to begin crafting!</Heading>
        <Box m="3" style={{ display: "flex", justifyContent: "center" }} >
            <TextField.Root
              type="email"
              value={email}
              onChange={(evt) => set(evt.target.value)}
              placeholder="Email address"
              required
              autoFocus
            />
        </Box>
        <Box m="3" style={{ display: "flex", justifyContent: "center" }}>
            <Button type="submit">Sign in</Button>
        </Box>
      </form>
      <Box m="3" style={{ display: "flex", justifyContent: "center" }} >
        <Link to="/register">Not a member yet?</Link>
      </Box>
      </Box>
    </Container>
  )
}