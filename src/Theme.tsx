import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        mode: 'light', // or 'dark'
        primary: {
            main: "#463f3a",
            light: '#f7f7f7',
        },
        secondary: {
            main: '#C59B76',
        },
        background: {
            default: '#FFFCF8',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            fontSize: '3rem',
        },
        h2: {
            fontFamily: '"Playfair Display", serif',
            fontWeight: 600,
        },
        body1: {
            fontFamily: '"Roboto", sans-serif',
        },
        caption: {
            fontFamily: '"Fira Mono", monospace',
        },
    },
})