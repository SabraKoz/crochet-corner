import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App.jsx"
import { BrowserRouter } from "react-router-dom"
import { Theme, ThemePanel } from "@radix-ui/themes"
import "@radix-ui/themes/styles.css"

const container = document.getElementById("root")
const root = ReactDOM.createRoot(container);
root.render(
  <BrowserRouter>
    <Theme accentColor="violet" grayColor="mauve" panelBackground="translucent" >
      <App />
      <ThemePanel />
    </Theme>
  </BrowserRouter>
)