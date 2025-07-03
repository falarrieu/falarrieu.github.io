import { styled } from "@mui/material/styles"
import { Box, Typography, Container, Fade } from "@mui/material"
import { useInView } from 'react-intersection-observer'

const Root = styled(Box)(({ theme }) => ({
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    color: theme.palette.primary.main,
}))
  

const Content = styled("div")(({ theme }) => ({
    textAlign: "right",
}))

const Name = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    fontSize: "clamp(2.5rem, 6vw, 4rem)",
    marginBottom: theme.spacing(1),
}))

const Subtitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
    marginBottom: theme.spacing(4),
}))

const AboutMe = () => {
    const { ref, inView } = useInView({
        threshold: 0.5,
      })
    
    return (
        <div ref={ref}>
            <Fade in={inView} >
                <Root>
                    <Container>
                        <Content>
                            <Name variant="h1">About Me</Name>
                                <Subtitle variant="h5">
                                    I'm Federico Larrieu, a bilingual (English/Spanish) Full Stack Developer and Computer Science graduate student at Colorado State University, with a deep interest in building scalable systems and solving complex data problems. I bring hands-on experience in full stack development, having led and contributed to multiple high-impact research and data visualization projects that serve users and span collaborations across institutions.
                                </Subtitle>
                        </Content>
                    </Container>
                </Root>
            </Fade>
        </div>
    )
}

export default AboutMe
