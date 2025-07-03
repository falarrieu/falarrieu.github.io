import { styled } from "@mui/material/styles"
import { Box, CircularProgress, Fade, IconButton, Slider, Typography } from "@mui/material"
import { useInView } from 'react-intersection-observer'
import DeckGL from '@deck.gl/react'
import maplibregl from 'maplibre-gl'
import Map from "react-map-gl/maplibre"
import { GeoJsonLayer } from '@deck.gl/layers'
import { useEffect, useRef, useState } from "react"
import { Pause, PlayArrow } from "@mui/icons-material"
import chroma from 'chroma-js'

const Root = styled(Box)(({ theme }) => ({
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    color: theme.palette.primary.main,
    position: 'relative',
    overflow: 'hidden'
}))

const PlayButton = styled(IconButton)(({ theme }) => ({
    zIndex: 10,
    marginRight: 5,
    backgroundColor: theme.palette.secondary.light,
    boxShadow: theme.shadows[4],
    '&:hover': {
        backgroundColor: theme.palette.background.default,
    }
}))

const LegendContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1),
}))

const SliderContainer = styled(Box)(({ theme }) => ({
    width: '90%',
    position: 'absolute',
    bottom: theme.spacing(2),
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',  
    padding: theme.spacing(1.5),
    gap: theme.spacing(2),
}))

const CustomSlider = styled(Slider)(({ theme }) => ({
    color: theme.palette.secondary.main,
    height: 6,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        width: 18,
        height: 18,
        backgroundColor: theme.palette.primary.main,
        border: `2px solid ${theme.palette.background.paper}`,
        '&:hover': {
            boxShadow: `0 0 0 8px ${theme.palette.primary.main}33`, // subtle hover glow
        },
    },
    '& .MuiSlider-rail': {
        opacity: 0.3,
        backgroundColor: theme.palette.primary.main,
    },
    '& .MuiSlider-mark': {
        backgroundColor: theme.palette.primary.light,
    },
    '& .MuiSlider-valueLabel': {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
    },
}))

const TimeText = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.light,
    fontSize: 20,
}))

const CrimeText = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.light,
    fontSize: 15,
}))

const LegendText = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: 12,
}))

const Legend = styled(Box)(({ theme }) => ({
    height: 150,
    width: 20,
    borderRadius: 10,
    border: '2px solid',
    borderColor: theme.palette.primary.light,
}))

const ContrastBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    width: 'fit-content',
    paddingLeft: 5,
    paddingRight: 5
}))

const NarrativeBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
    maxWidth: 350,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.light,
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
    zIndex: 12,
    opacity: 0.95,
}))

const INITIAL_VIEW_STATE = {
    latitude: 41.84,
    longitude: -87.6298,
    zoom: 9.6,
    bearing: 0,
    pitch: 0
}

interface CrimeData {
    month: string
    district: string
    crime_count: number
}

interface HoverInfo {
    district: string
    crimeCount: number
}

const Visualization = () => {
    const { ref, inView } = useInView({ threshold: 0.5 })
    const [geoJsonData, setGeoJsonData] = useState<any[]>([])
    const [crimeData, setCrimeData] = useState<CrimeData[]>([])
    const [currentEpoch, setCurrentEpoch] = useState<number>(978376765)
    const [layers, setLayers] = useState<any[]>([])
    const [playing, setPlaying] = useState<boolean>(false)
    const interval = useRef<string | number | NodeJS.Timeout | undefined >(undefined)
    const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);
    const [loading, setLoading] = useState(true)

    const SECONDS_IN_MONTH = 60 * 60 * 24 * 30
    const MIN_EPOCH = 978376765
    const MAX_EPOCH = 1740856765

    // const colorScale = chroma.scale(['#ffffb2', '#fecc5c', '#fd8d3c', '#f03b20', '#bd0026']).mode('lab')
    
    const colorScale = chroma.scale(['#FFFCF8', '#C59B76']).mode('lch')

    useEffect(() => {
        if(inView && crimeData.length == 0) {
            fetch('/data/chicago.geojson')
                .then(res => res.json())
                .then(setGeoJsonData)
                .catch(err => console.error("Error loading GeoJSON:", err))

            fetch('/data/aggregate.json')
                .then(res => res.json())
                .then(data => {
                    setCrimeData(data)
                    setLoading(false)
                })
                .catch(err => console.error("Error loading crime data:", err))
        }
    }, [inView])

    const formatEpochToYearMonth = (epoch: number): string => {
        const date = new Date(epoch * 1000)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        return `${year}-${month}`
    }
    
    useEffect(() => {
        setLayers( [
            geoJsonData && new GeoJsonLayer({
                id: 'geojson-layer',
                data: geoJsonData,
                pickable: true,
                stroked: true,
                filled: true,
                lineWidthScale: 2,
                lineWidthMinPixels: 1,
                getLineColor: [0, 0, 0, 200],
                getFillColor: (feature) => {
                    const district = feature.properties?.district || feature.properties?.name
                    
                    const currentMonth = formatEpochToYearMonth(currentEpoch)

                    const crimeEntry = crimeData.find(
                        (entry) =>
                            entry.district === district &&
                            entry.month === currentMonth
                    )

                    const count = crimeEntry?.crime_count || 0

                    const maxCrime = 3568 
                    const t = Math.min(1, count / maxCrime)
                
                    const color = colorScale(t).rgba()
                    return [color[0], color[1], color[2], 255]
                },
                getLineWidth: 1,
                updateTriggers: {
                    getFillColor: {currentEpoch}
                },
                autoHighlight: true,
                highlightColor: [255, 255, 255, 128]
            })        
        ])
    }, [geoJsonData, currentEpoch])

    const stopCounter = () => clearInterval(interval.current)

    const startCounter = () => interval.current =  setInterval(() => {
        setCurrentEpoch(prev => {
            const next = prev + SECONDS_IN_MONTH 
            return next > MAX_EPOCH ? MIN_EPOCH : next
        })
    }, 50)

    const handlePlayPause = () => {
        if(playing) {
            setPlaying(false)
            stopCounter()

        } else {
            setPlaying(true)
            startCounter()
        }
    }

    const handleSliderChange = (_event: Event, newValue: number | number[]) => {
        stopCounter()
        setPlaying(false)
        setCurrentEpoch(newValue as number)
    }

    return (
        <div ref={ref}>
            {loading ? (
                <Root>
                    <CircularProgress />
                </Root>
                ) :( 
                    <Root>
                        <NarrativeBox>
                            <Typography variant="h1" fontSize={28} gutterBottom>
                                Chicago Crime Timeline
                            </Typography>
                            <Typography variant="caption" fontSize={15}>
                                {getNarrative(currentEpoch)}
                            </Typography>
                        </NarrativeBox>

                        <SliderContainer>
                            <PlayButton onClick={handlePlayPause}>
                                {playing ? <Pause /> : <PlayArrow />}
                            </PlayButton>
                            <Box flexGrow={1}>
                                <ContrastBox>
                                    <TimeText variant="caption" gutterBottom>
                                        Time: {formatEpochToYearMonth(currentEpoch)}
                                    </TimeText>
                                </ContrastBox>
                                <CustomSlider
                                    value={currentEpoch}
                                    onChange={handleSliderChange}
                                    min={MIN_EPOCH}
                                    max={MAX_EPOCH}
                                    step={SECONDS_IN_MONTH}
                                    valueLabelDisplay="off"
                                />
                                <ContrastBox>
                                    <CrimeText variant="caption">
                                        Crime Count: {hoverInfo?.district} {hoverInfo && ':'} {hoverInfo?.crimeCount}
                                    </CrimeText>
                                </ContrastBox>
                            </Box>
                        </SliderContainer>
                        <DeckGL
                            initialViewState={INITIAL_VIEW_STATE}
                            controller={false}
                            layers={layers}
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                            }}
                            onHover={({ x, y, object }) => {
                                if (object) {
                                    const district = object.properties?.district || object.properties?.name;
                                    const currentMonth = formatEpochToYearMonth(currentEpoch);
                                    const crimeEntry = crimeData.find(
                                        (entry) => entry.district === district && entry.month === currentMonth
                                    );
                                    setHoverInfo({
                                        district,
                                        crimeCount: crimeEntry?.crime_count || 0
                                    });
                                } else {
                                    setHoverInfo(null);
                                }
                            }}
                        >
                            <Map
                                reuseMaps
                                mapLib={maplibregl}
                                mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
                            />
                        </DeckGL>
                        <LegendContainer>
                            <LegendText variant="caption">
                                Higher Crime
                            </LegendText>
                            <Legend
                                sx={{
                                    background: `linear-gradient(to top, ${colorScale(0).hex()}, ${colorScale(1).hex()})`,
                                }}
                            />
                            <LegendText variant="caption" >
                                Lower Crime
                            </LegendText>
                        </LegendContainer>
                    </Root>
                )}
        </div>
    )
}

export default Visualization

const getNarrative = (epoch: number): string => {
    const year = new Date(epoch * 1000).getFullYear()

    if (year < 2005) return "CeaseFire, a public-health-based violence intervention program, was launched to address gun violence."
    if (year < 2011) return "Operation Family Secrets led to major mob-related indictments targeting organized crime."
    if (year < 2014) return "Parkway Gardens ('O-Block') saw rising gang conflicts following public housing demolitions."
    if (year < 2017) return "Chicago hit a 25-year high in homicides in 2016, drawing national concern."
    if (year < 2021) return "Crime patterns shifted during the COVID-19 pandemic, with increased CTA violence."
    if (year < 2024) return "Homicide numbers remained high in 2021, continuing a troubling trend."
    if (year < 2025) return "A tragic mass shooting occurred on a Blue Line train in September 2024."
    return "In early 2025, homicide rates declined by 15%, mirroring trends across U.S. cities."
}
