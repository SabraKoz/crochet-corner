import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App.jsx"
import { BrowserRouter } from "react-router-dom"
import { Theme } from "@radix-ui/themes"
import "@radix-ui/themes/styles.css"
import "./main.css"

const container = document.getElementById("root")
const root = ReactDOM.createRoot(container);
root.render(
  <BrowserRouter>
    <Theme accentColor="cyan" grayColor="mauve" panelBackground="translucent" style={{ backgroundColor: "transparent" }} >
      <App />
    </Theme>
  </BrowserRouter>
)