import { ThemeProvider } from "@mui/material"
import Landing from "./landing/Landing"
import { theme } from "./Theme"
import { Route, Routes } from "react-router-dom"
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation"
import Resume from "./resume/Resume";
import ComingSoon from "./ComingSoon";

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/applications" element={<ComingSoon />} >Applications</Route>
            <Route path="/research" element={<ComingSoon />} >Research Publications</Route>
            <Route path="/projects" element={<ComingSoon />} >Additional Projects</Route>
            <Route path="/contact" element={<ComingSoon />} >Contact</Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
