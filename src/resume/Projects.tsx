import { styled } from "@mui/material/styles"
import { Box, Typography, Container, Fade, Paper, Chip, Stack } from "@mui/material"
import { useInView } from "react-intersection-observer"

const Root = styled(Box)(({ theme }) => ({
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
}))

const Content = styled("div")(({ theme }) => ({
    textAlign: "left",
    maxWidth: 900,
    margin: "0 auto",
}))

const Name = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    fontSize: "clamp(2.5rem, 6vw, 4rem)",
    marginBottom: theme.spacing(4),
}))

const ProjectItem = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius * 2,
}))

const projects = [
    {
        title: "Soil Consortium Data Platform",
        role: "Full Stack Developer",
        duration: "Aug 2023 – Oct 2024",
        description: "Built a platform to visualize 32 high-dimensional datasets for over 200 users. Led a team of 10+ students.",
        tags: ["React", "Node.js", "MongoDB", "Leadership"],
    },
    {
        title: "MMM Foundation Ag Data Service",
        role: "Full Stack Developer",
        duration: "Aug 2023 – Oct 2024",
        description: "Designed and deployed a service for researchers and ranchers across 5 states. Collaborated with 10+ institutions.",
        tags: ["Typescript", "Data Engineering", "REST API", "Collaboration"],
    },
    {
        title: "Aperture GPU Framework",
        role: "Full Stack Developer",
        duration: "Jun 2022 – Aug 2022",
        description: "Implemented a GPU-accelerated framework for visualizing 200+ large-scale datasets.",
        tags: ["GPU", "Big Data", "Visualization", "Performance"],
    },
]

const Projects = () => {
    const { ref, inView } = useInView({
        threshold: 0.5,
    })

    return (
        <div ref={ref}>
            <Fade in={inView} >
                <Root>
                    <Container>
                        <Content>
                            <Name variant="h2">Projects</Name>
                            {projects.map((project, idx) => (
                                <ProjectItem key={idx} elevation={3}>
                                    <Typography variant="h6" fontWeight={600}>
                                        {project.title}
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        {project.role} &nbsp; • &nbsp; {project.duration}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                                        {project.description}
                                    </Typography>
                                    <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
                                        {project.tags.map((tag, i) => (
                                            <Chip key={i} label={tag} variant="outlined" size="small" />
                                        ))}
                                    </Stack>
                                </ProjectItem>
                            ))}
                        </Content>
                    </Container>
                </Root>
            </Fade>
        </div>
    )
}

export default Projects
