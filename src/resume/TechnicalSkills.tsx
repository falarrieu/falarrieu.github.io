import { styled } from "@mui/material/styles"
import { Box, Typography, Container, Fade, Chip, Stack } from "@mui/material"
import { useInView } from "react-intersection-observer"

const Root = styled(Box)(({ theme }) => ({
    minHeight: "50vh",
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

const CategoryLabel = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    fontSize: theme.typography.pxToRem(18),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1),
}))

const skills = {
    languages: [
        "TypeScript",
        "JavaScript",
        "Python",
        "Java",
        "Scala",
        "Shell Scripting",
        "MQL",
    ],
    frameworks: [
        "React.js",
        "Node.js",
        "Jupyter",
        "VS Code",
        "Vim",
        "Git",
        "Zenhub",
        "Auth0",
    ],
    tools: [
        "MongoDB",
        "Apache Spark",
        "Apache Jena",
        "HDFS",
    ],
    practices: [
        "Agile",
        "Scrum",
        "Windows",
        "Linux",
    ],
}

const TechnicalSkills = () => {
    const { ref, inView } = useInView({
        threshold: 0.4,
    })

    const renderChips = (items: string[]) => (
        <Stack direction="row" spacing={1} flexWrap="wrap">
            {items.map((item, i) => (
                <Chip key={i} label={item} variant="outlined" size="medium" />
            ))}
        </Stack>
    )

    return (
        <div ref={ref}>
            <Fade in={inView} >
                <Root>
                    <Container>
                        <Content>
                            <Name variant="h2">Technical Skills</Name>

                            <CategoryLabel>Languages</CategoryLabel>
                            {renderChips(skills.languages)}

                            <CategoryLabel>Frameworks & Tools</CategoryLabel>
                            {renderChips(skills.frameworks)}

                            <CategoryLabel>Data & Infrastructure</CategoryLabel>
                            {renderChips(skills.tools)}

                            <CategoryLabel>Development Practices</CategoryLabel>
                            {renderChips(skills.practices)}
                        </Content>
                    </Container>
                </Root>
            </Fade>
        </div>
    )
}

export default TechnicalSkills
