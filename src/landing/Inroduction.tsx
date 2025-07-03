    import { styled } from "@mui/material/styles"
    import { Box, Typography, Container, Fade } from "@mui/material"

    const Root = styled(Box)(({ theme }) => ({
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        backgroundColor: theme.palette.background.default,
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
        color: "#463f3a",
    }))
    

    const Content = styled("div")(({ theme }) => ({
        maxWidth: 700,
        textAlign: "left",
    }))

    const Name = styled(Typography)(({ theme }) => ({
        fontWeight: 700,
        fontSize: "clamp(2.5rem, 6vw, 4rem)",
        marginBottom: theme.spacing(1),
        color: "#463f3a"
    }))

    const Subtitle = styled(Typography)(({ theme }) => ({
        color: "#463f3a",
        fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
        marginBottom: theme.spacing(4),
    }))

    const Introduction = () => {
    return (
        <Fade in>
            <Root>
                <Container>
                    <Content>
                        <Name variant="h1">Hi, I'm Federico Larrieu – a Software Engineer</Name>
                            <Subtitle variant="h5">
                                I build modern web applications focused on performance, scalability, and great user experience.
                            </Subtitle>
                        </Content>
                </Container>
            </Root>
        </Fade>
    )
    }

    export default Introduction
