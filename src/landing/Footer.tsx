import { styled } from "@mui/material/styles"
import { Box, Typography, Container, IconButton, Stack, Tooltip, Link as MuiLink } from "@mui/material"
import GitHubIcon from "@mui/icons-material/GitHub"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import EmailIcon from "@mui/icons-material/Email"

const FooterRoot = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[100],
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginTop: theme.spacing(8),
}))

const FooterText = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(14),
}))

const Footer = () => {
    return (
        <FooterRoot>
            <Container maxWidth="md" sx={{ textAlign: "center" }}>
                <Typography variant="h6" fontWeight={600}>
                    Let's Connect
                </Typography>

                <Stack direction="row" justifyContent="center" spacing={2} mt={2}>
                    <Tooltip title="GitHub">
                        <IconButton
                            component="a"
                            href="https://github.com/falarrieu"
                            target="_blank"
                            rel="noopener"
                            aria-label="GitHub"
                        >
                            <GitHubIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="LinkedIn">
                        <IconButton
                            component="a"
                            href="https://www.linkedin.com/in/federico-larrieu"
                            target="_blank"
                            rel="noopener"
                            aria-label="LinkedIn"
                        >
                            <LinkedInIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Email">
                        <IconButton
                            component="a"
                            href="mailto:federicolarrieu@outlook.com"
                            aria-label="Email"
                        >
                            <EmailIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>

                <FooterText>
                    Built by Federico Larrieu — © {new Date().getFullYear()}
                </FooterText>
            </Container>
        </FooterRoot>
    )
}

export default Footer
