import { styled, useTheme } from "@mui/material/styles"
import { Box, CircularProgress, Fade, Typography } from "@mui/material"
import { useInView } from 'react-intersection-observer'
import { useEffect, useRef, useState } from "react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, ReferenceArea } from 'recharts'

const Root = styled(Box)(({ theme }) => ({
    minHeight: "70vh",
    display: "flex",
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    color: theme.palette.primary.main,
    position: 'relative',
    overflow: 'hidden'
}))

const NarrativeText = styled(Typography)(({ theme }) => ({
    maxWidth: '80%',
    color: theme.palette.primary.main,
    fontSize: 20,
}))

const TooltipBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.default, 
    padding: 10,
    border: '1px solid #ccc', 
    p: 2, 
    borderRadius: 1 
}))

const TooltipText = styled(Typography)(({ theme }) => ({
    color: theme.palette.secondary.main,
    fontSize: 15,
}))

const NarrativeBox = styled(Box)(({ theme }) => ({
    width: '90%',
    height: '20vh'
}))

interface CrimeData {
    [key: string]: number | string
}

const Chart = () => {
    const { ref, inView } = useInView({ threshold: 0.5 })
    const [loading, setLoading] = useState(true)
    const [crimeData, setCrimeData] = useState<CrimeData[]>([])
    const theme = useTheme()
    const [time, setTime] = useState<string | null>(null)

    const districts = [
        "Albany Park",
        "Andersonville",
        "Archer Heights",
        "Armour Square",
        "Ashburn",
        "Auburn Gresham",
        "Austin",
        "Avalon Park",
        "Avondale",
        "Belmont Cragin",
        "Beverly",
        "Boystown",
        "Bridgeport",
        "Brighton Park",
        "Bucktown",
        "Burnside",
        "Calumet Heights",
        "Chatham",
        "Chicago Lawn",
        "Chinatown",
        "Clearing",
        "Douglas",
        "Dunning",
        "East Side",
        "East Village",
        "Edgewater",
        "Edison Park",
        "Englewood",
        "Fuller Park",
        "Gage Park",
        "Galewood",
        "Garfield Park",
        "Garfield Ridge",
        "Gold Coast",
        "Grand Boulevard",
        "Grand Crossing",
        "Grant Park",
        "Greektown",
        "Hegewisch",
        "Hermosa",
        "Humboldt Park",
        "Hyde Park",
        "Irving Park",
        "Jackson Park",
        "Jefferson Park",
        "Kenwood",
        "Lake View",
        "Lincoln Park",
        "Lincoln Square",
        "Little Italy, UIC",
        "Little Village",
        "Logan Square",
        "Loop",
        "Lower West Side",
        "Magnificent Mile",
        "Mckinley Park",
        "Millenium Park",
        "Montclare",
        "Morgan Park",
        "Mount Greenwood",
        "Museum Campus",
        "Near South Side",
        "New City",
        "North Center",
        "North Lawndale",
        "North Park",
        "Norwood Park",
        "O'Hare",
        "Oakland",
        "Old Town",
        "Portage Park",
        "Printers Row",
        "Pullman",
        "River North",
        "Riverdale",
        "Rogers Park",
        "Roseland",
        "Rush & Division",
        "Sauganash,Forest Glen",
        "Sheffield & DePaul",
        "South Chicago",
        "South Deering",
        "South Shore",
        "Streeterville",
        "Ukrainian Village",
        "United Center",
        "Uptown",
        "Washington Heights",
        "Washington Park",
        "West Elsdon",
        "West Lawn",
        "West Loop",
        "West Pullman",
        "West Ridge",
        "West Town",
        "Wicker Park",
        "Woodlawn",
        "Wrigleyville"
    ]
    useEffect(() => {
        if(inView && crimeData.length == 0) {
            setLoading(true)
            fetch('/data/preprocessed.json')
                .then(res => res.json())
                .then(data => {
                    setCrimeData(data)
                    setLoading(false)
                })
                .catch(err => console.error("Error loading crime data:", err))
        }
           
    }, [inView, crimeData.length])   

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const total = payload.reduce((sum: number, entry: any) => sum + (entry.value || 0), 0)
            setTime(label)
            return (
                <TooltipBox >
                    <TooltipText><strong>{label}</strong></TooltipText>
                    <TooltipText variant="caption">Total Crime Count: <strong>{total}</strong></TooltipText>
                </TooltipBox>
            )
        }
    
        return null
    }    

    return (
        <div ref={ref}>
            {loading ? (
                <Root>
                    <CircularProgress />
                </Root>
            ) : (
                <Root>
                    <NarrativeBox><NarrativeText variant="caption">{getNarrative(time)}</NarrativeText></NarrativeBox>
                    <ResponsiveContainer width="100%" height={500}>
                        <LineChart data={crimeData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="month"
                                angle={-45}
                                textAnchor="end"
                                label={{ value: 'Time', position: 'insideBottom', offset: -50 }}
                            />
                            <YAxis
                                label={{ value: 'Crime Count', angle: -90, position: 'insideLeft', offset: -5 }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            {districts.map((district) => (
                                <Line
                                    key={district}
                                    type="monotone"
                                    dataKey={district}
                                    stroke={theme.palette.primary.main}
                                    dot={false}
                                    isAnimationActive={false}
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </Root>
            )}
        </div>
    )
}

export default Chart

const getNarrative = (time: string | null) => {
    if (time == null || time < "2003-05") {
        return "Welcome to the story of Chicago's evolving crime landscape. This chart traces the rhythm of public safety across time."
    }

    if (time >= "2003-05" && time <= "2004-02") {
        return "In the early 2000s, a report by the Urban Institute highlighted Austin as a key neighborhood where many formerly incarcerated individuals returned. It marked a pivotal moment in understanding how communities absorb the effects of systemic incarceration."
    }

    if (time >= "2004-02" && time <= "2017-11") {
        return "As the years progressed, a pattern begins to emerge — crime appears to dip around the winter holidays. Whether it's the cold, community cohesion, or something deeper, the data shows a quieter season amid the city's usual chaos."
    }

    if (time >= "2017-11") {
        return "In more recent years, there's a quiet but steady decline in crime. It's a sign that long-term efforts — from policy reform to community programs — may be starting to reshape the city's future."
    }
}

const getNarrativeRange = (time: string | null) => {
    if (time == null || time < "2003-05") return { x1: "2001-01", x2: "2003-05" }

    if (time >= "2003-05" && time <= "2004-02") {
        return { x1: "2003-05", x2: "2004-02" }
    }

    if (time >= "2004-02" && time <= "2017-11") {
        return { x1: "2004-02", x2: "2017-11" }
    }

    if (time >= "2017-11") {
        return { x1: "2017-11", x2: "2025-01" } 
    }

}
