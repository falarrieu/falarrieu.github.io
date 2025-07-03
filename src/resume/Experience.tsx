import { styled } from "@mui/material/styles"
import { Box, Typography, Container, Fade, Paper, Divider } from "@mui/material"
import { useInView } from 'react-intersection-observer'

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
    maxWidth: 800,
    margin: "0 auto",
}))

const Name = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    fontSize: "clamp(2.5rem, 6vw, 4rem)",
    marginBottom: theme.spacing(4),
}))

const ExperienceItem = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius * 2,
}))

const experiences = [
    {
        role: "Graduate Research Assistant",
        organization: "Urban Sustain",
        date: "June 2022 – Present",
        highlights: [
            "Developed over 5 full stack projects",
            "Attended weekly Scrum meetings over 3 years",
        ],
        link: "https://urban-sustain.org"
    },
    {
        role: "Graduate Research Assistant",
        organization: "Center for Exascale Spatial Data Analytics",
        date: "June 2022 – Present",
        highlights: [
            "Built distributed systems spanning 250+ machines",
            "Deployed multiple large-scale applications",
        ],
        link: "https://spatial.colostate.edu/"
    },
]

const Experience = () => {
    const { ref, inView } = useInView({
        threshold: 0.5,
    })

    return (
        <div ref={ref}>
            <Fade in={inView} >
                <Root>
                    <Container>
                        <Content>
                            <Name variant="h2">Experience</Name>
                            {experiences.map((exp, idx) => (
                                <ExperienceItem key={idx} elevation={3}>
                                    <Typography variant="h6" fontWeight={600}>
                                        {exp.role} @ <a href={exp.link} target="_blank" rel="noopener noreferrer">{exp.organization}</a>
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                        {exp.date}
                                    </Typography>
                                    <ul>
                                        {exp.highlights.map((point, i) => (
                                            <li key={i}>
                                                <Typography variant="body2">{point}</Typography>
                                            </li>
                                        ))}
                                    </ul>
                                </ExperienceItem>
                            ))}
                        </Content>
                    </Container>
                </Root>
            </Fade>
        </div>
    )
}

export default Experience
