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
  width: '90%',
  textAlign: "left",
}))

const Name = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "clamp(2.5rem, 6vw, 4rem)",
  marginBottom: theme.spacing(1),
  color: "#463f3a",
}))

const Subtitle = styled(Typography)(({ theme }) => ({
  color: "#463f3a",
  fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
  marginBottom: theme.spacing(4),
}))

const Storytime = () => {
  return (
    <Fade in>
      <Root>
        <Container>
          <Content>
            <Name variant="h1">Telling Stories with Data</Name>
            <Subtitle variant="h5">
              I specialize in building data-driven applications that scale. With a focus on big data visualization, I transform raw numbers into meaningful narratives that help people see the bigger picture — and the hidden patterns underneath.
            </Subtitle>
          </Content>
        </Container>
      </Root>
    </Fade>
  )
}

export default Storytime
