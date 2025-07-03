import { styled } from "@mui/material/styles"
import { Box, Typography, Container, Fade, Paper } from "@mui/material"
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
    maxWidth: 800,
    margin: "0 auto",
}))

const Name = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    fontSize: "clamp(2.5rem, 6vw, 4rem)",
    marginBottom: theme.spacing(4),
}))

const EducationItem = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius * 2,
}))

const educationData = [
    {
        degree: "Master of Science in Computer Science",
        institution: "Colorado State University",
        gpa: "4.00",
        years: "2023 – 2025",
    },
    {
        degree: "Bachelor of Science in Computer Science",
        institution: "Colorado State University",
        gpa: "3.39",
        years: "2020 – 2023",
    },
    {
        degree: "Associate of Science",
        institution: "Front Range Community College",
        gpa: "3.78",
        years: "2018 – 2020",
    },
]

const Education = () => {
    const { ref, inView } = useInView({
        threshold: 0.5,
    })

    return (
        <div ref={ref}>
            <Fade in={inView} >
                <Root>
                    <Container>
                        <Content>
                            <Name variant="h2">Education</Name>
                            {educationData.map((edu, idx) => (
                                <EducationItem key={idx} elevation={3}>
                                    <Typography variant="h6" fontWeight={600}>
                                        {edu.degree}
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        {edu.institution}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        GPA: {edu.gpa} &nbsp; • &nbsp; {edu.years}
                                    </Typography>
                                </EducationItem>
                            ))}
                        </Content>
                    </Container>
                </Root>
            </Fade>
        </div>
    )
}

export default Education
