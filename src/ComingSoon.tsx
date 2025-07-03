import { styled } from "@mui/material/styles"
import { Box, Typography, Container, Fade } from "@mui/material"
import { useInView } from 'react-intersection-observer'

const Root = styled(Box)(({ theme }) => ({
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    color: theme.palette.primary.main,
}))

const Content = styled("div")(({ theme }) => ({
    textAlign: "center",
}))

const Title = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    fontSize: "clamp(2.5rem, 6vw, 4rem)",
    marginBottom: theme.spacing(2),
}))

const Subtitle = styled(Typography)(({ theme }) => ({
    fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
    color: theme.palette.text.secondary,
}))

const ComingSoon = () => {
    const { ref, inView } = useInView({ threshold: 0.4 })

    return (
        <div ref={ref}>
            <Fade in={inView}>
                <Root>
                    <Container>
                        <Content>
                            <Title variant="h1">Coming Soon</Title>
                            <Subtitle variant="h5">
                                This page is under construction. Check back soon for updates!
                            </Subtitle>
                        </Content>
                    </Container>
                </Root>
            </Fade>
        </div>
    )
}

export default ComingSoon
