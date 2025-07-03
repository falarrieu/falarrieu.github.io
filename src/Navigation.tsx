import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/resume">Resume</Button>
        <Button color="inherit" component={Link} to="/applications">Applications</Button>
        <Button color="inherit" component={Link} to="/research">Research Publications</Button>
        <Button color="inherit" component={Link} to="/projects">Additional Projects</Button>
        <Button color="inherit" component={Link} to="/contact">Contact</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
