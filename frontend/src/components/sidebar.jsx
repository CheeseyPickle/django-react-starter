import { useState } from 'react'
import Input from './input';
import CardinalDirections from './CardinalDirections';
import RadioButtonsRow from './RadioRow';
import RadioButtonsCol from './RadioCol';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Button, TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import '../styles/sidebar.css';
import '../styles/loading.css';
import { alignProperty } from '@mui/material/styles/cssUtils';

const Sidebar = ({
    setComparisonVal, 
    setPredicate,
    variable,
    setVariable,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    formData,
    handleChange,
    queryData,
    isLoading,
}) => {
    const [showInfo, setShowInfo] = useState(false);

    const variables = [
        "2m_temperature",
        "total_precipitation",
        "surface_pressure",
        "snow_depth",
        "snowfall",
        "snowmelt",
        "temperature_of_snow_layer",
        "ice_temperature_layer_1",
        "ice_temperature_layer_2",
        "ice_temperature_layer_3",
        "ice_temperature_layer_4",
    ]
    const regions = {
        "Greenland": { North: 84, South: 58, West: -75, East: -10 },
        "Alaska": { North: 72, South: 50, West: -170, East: -130 },
        "Antarctica": { North: -60, South: -90, West: -180, East: 180 }
    }

    const tableData = {}
    Object.keys(regions).forEach(region => {
        variables.forEach(variable => {
            tableData[`${variable} (${region})`] = {
                variable: variable,
                spatialRegion: region,
                North: regions[region].North,
                South: regions[region].South,
                West: regions[region].West,
                East: regions[region].East,
                spatialResolution: "0.25°, 0.5°, 1°",
                temporalRange: "2015-2024",
                temporalResolution: "hour, day, month, year"
            }
        })
    })
    
    // Data display component for showing the tableData
    const DataInfoDisplay = () => {
        if (!showInfo) return null;
        
        return (
            <div className="data-info-overlay">
                <div className="data-info-content">
                    <div className="data-info-header">
                        <h2>Available Data</h2>
                        <Button onClick={() => setShowInfo(false)}>Close</Button>
                    </div>
                    <TableContainer component={Paper} style={{ maxHeight: '70vh', overflow: 'auto' }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Variable</TableCell>
                                    <TableCell>Region</TableCell>
                                    <TableCell>North</TableCell>
                                    <TableCell>South</TableCell>
                                    <TableCell>East</TableCell>
                                    <TableCell>West</TableCell>
                                    <TableCell>Spatial Resolution</TableCell>
                                    <TableCell>Temporal Range</TableCell>
                                    <TableCell>Temporal Resolution</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.entries(tableData).map(([key, data], index) => (
                                    <TableRow key={index}>
                                        <TableCell>{data.variable}</TableCell>
                                        <TableCell>{data.spatialRegion}</TableCell>
                                        <TableCell>{data.North}</TableCell>
                                        <TableCell>{data.South}</TableCell>
                                        <TableCell>{data.East}</TableCell>
                                        <TableCell>{data.West}</TableCell>
                                        <TableCell>{data.spatialResolution}</TableCell>
                                        <TableCell>{data.temporalRange}</TableCell>
                                        <TableCell>{data.temporalResolution}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        );
    };
    
    return (
        <>
            <div className="sidebar_wrapper">
                <div className="title_container">
                    <p className='title'>POLARIS</p>
                </div>
                <div className='subtitle_container'>
                    Interactive and Scalable Interface for Polar Science
                </div>
                <div className="padding"/>
                <Input
                    val={variable}
                    setVal={setVariable}
                    label={"Variable"}
                    options={["2m_temperature", "total_precipitation", "surface_pressure", "snow_depth", "snowfall", "snowmelt", "temperature_of_snow_layer", "ice_temperature_layer_1", "ice_temperature_layer_2", "ice_temperature_layer_3", "ice_temperature_layer_4"]}
                    sx={{ width: "96%",
                        '& .MuiInputBase-root': { fontSize: '23px' , fontFamily: "Georgia, serif" },
                        '& .MuiInputLabel-root': { fontSize: '23px' , fontFamily: "Georgia, serif" },
                    }}
                    size={"small"}
                    varLabel={"variable"}
                />
                
                <div className="control_section">
                    <p className="section_title">Spatial Predicate</p>
                    <div className="pred_value" >
                        <TextField
                            id="outlined-number"
                            label="North"
                            size={"small"}
                            sx={{ width: "25%",
                                '& .MuiInputBase-root': { fontSize: '20px' , fontFamily: "monospace"},
                                 '& .MuiInputLabel-root': { fontSize: '20px', fontFamily: "Georgia, serif" },
                            }}
                            type="number"
                            value={formData.north}
                            name="north"
                            onChange={handleChange}
                            max="90"
                            min="-90" />
                        <TextField
                            id="outlined-number"
                            label="South"
                            size={"small"}
                            sx={{ width: "25%",
                                '& .MuiInputBase-root': { fontSize: '20px' , fontFamily: "monospace"},
                                 '& .MuiInputLabel-root': { fontSize: '20px', fontFamily: "Georgia, serif"  },
                            }}
                            type="number"
                            max="90"
                            min="-90"
                            name="south"
                            value={formData.south}
                            onChange={handleChange} />
                        <TextField
                            id="outlined-number"
                            label="East"
                            size={"small"}
                            sx={{ width: "25%",
                                '& .MuiInputBase-root': { fontSize: '20px' , fontFamily: "monospace"},
                                 '& .MuiInputLabel-root': { fontSize: '20px' , fontFamily: "Georgia, serif" },
                            }}
                            type="number"
                            max="180"
                            min="-180"
                            name="east"
                            value={formData.east}
                            onChange={handleChange} />
                        <TextField
                            id="outlined-number"
                            label="West"
                            size={"small"}
                            sx={{ width: "25%",
                                '& .MuiInputBase-root': { fontSize: '20px' , fontFamily: "monospace"},
                                 '& .MuiInputLabel-root': { fontSize: '20px', fontFamily: "Georgia, serif"  },
                            }}
                            max="180"
                            min="-180"
                            type="number"
                            name="west"
                            value={formData.west}
                            onChange={handleChange} />
                    </div>
                    <div className="padding"/>
                    <RadioButtonsRow 
                        label="Resolution (degree)" 
                        options={[0.25, 0.5, 1]} 
                        var={formData.spatialResolution} 
                        sx={{fontFamily: "Georgia, serif" }}
                        setVal={handleChange} 
                        subLabel="spatialResolution" 
                        defaultValue={1} />
                </div>

                <div className="control_section">
                    <p className="section_title">Temporal Predicate</p>
                    <div className="row_wrapper">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div className="half_column_wrapper">
                            <DateTimePicker 
                                label="Start Date Time" 
                                views={['year', 'day', 'hours']} 
                                size={"small"}
                                sx={{ '& .MuiInputBase-root': { fontSize: '17.5px' , fontFamily: "monospace" },
                                      '& .MuiInputLabel-root': { fontSize: '20px' , fontFamily: "Georgia, serif" },
                                    }}
                                ampm={false} 
                                value={startDate ? dayjs(startDate) : null} 
                                minDateTime={dayjs('2015-01-01T00:00')}
                                maxDateTime={dayjs('2024-12-31T23:00')}
                                onChange={(newValue) => setStartDate(newValue ? newValue.format('YYYY-MM-DD HH:mm') : null)} />
                            <DateTimePicker 
                                label="End Date Time" 
                                views={['year', 'day', 'hours']} 
                                size={"small"}
                                sx={{ '& .MuiInputBase-root': { fontSize: '17.5px' , fontFamily: "monospace"},
                                      '& .MuiInputLabel-root': { fontSize: '20px', fontFamily: "Georgia, serif" },
                                    }}
                                ampm={false} 
                                value={endDate ? dayjs(endDate) : null} 
                                minDateTime={dayjs('2015-01-01T01:00')}
                                maxDateTime={dayjs('2024-12-31T23:00')}
                                onChange={(newValue) => setEndDate(newValue ? newValue.format('YYYY-MM-DD HH:mm') : null)} />
                        </div>
                    </LocalizationProvider>
                    <RadioButtonsCol 
                        label="Resolution" 
                        options={["hour", "day", "month", "year"]} 
                        var={formData.temporalResolution} setVal={handleChange} 
                        subLabel="temporalResolution" 
                        defaultValue={"year"} />
                    </div>
                </div>

                <div className="control_section">
                    <p className="section_title">Spatio-Temporal Aggregation</p>
                    <RadioButtonsRow 
                        // label="Spatio-Temporal Aggregation" 
                        options={["min", "max", "mean"]} 
                        var={formData.aggregation} 
                        setVal={handleChange} 
                        subLabel="aggregation" 
                        defaultValue={"mean"} />
                </div>

                <div className="row_wrapper">
                    <div className='half_control_section'>
                        <p className="section_title">Filters</p>
                        <div className="pred_value">
                            <Input 
                                name="predicate" 
                                label={"Predicate"} 
                                options={["<", ">", "<=", ">=", "!="]} 
                                sx={{ width: "50%",
                                    '& .MuiInputBase-root': { fontSize: '18px' },
                                    '& .MuiInputLabel-root': { fontSize: '18px' },
                                }}
                                size={"small"} 
                                val={formData.filterPredicate} 
                                setVal={setPredicate} />
                            <TextField 
                                id="outlined-number" 
                                label="Value"
                                type="number" 
                                sx={{ width: "50%",
                                    '& .MuiInputBase-root': { fontSize: '18px' },
                                    '& .MuiInputLabel-root': { fontSize: '18px' },
                                }}
                                size={"small"}
                                value={formData.filterValue} 
                                onChange={(e) => { setComparisonVal(e.target.value) }} />
                        </div>
                    </div>
                    <div className='half_column_wrapper'>
                        <Button 
                            onClick={() => queryData()} 
                            variant="contained" 
                            color="success"
                            sx={{ width: "95%",
                                '& .MuiInputBase-root': { fontSize: '18px' , fontFamily: "Georgia, serif"},
                                '& .MuiInputLabel-root': { fontSize: '18px', fontFamily: "Georgia, serif" },
                            }}
                            size={"medium"}
                            disabled={isLoading} 
                            className="query_button"
                            >
                            <div className="button-content">
                                {isLoading && <div className="loading-spinner" />} 
                                Query Data
                            </div>
                        </Button>
                        <Button
                            variant="outlined"
                            color="success"
                            sx={{ width: "95%",
                                '& .MuiInputBase-root': { fontSize: '18px' },
                                '& .MuiInputLabel-root': { fontSize: '18px' },
                            }}
                            onClick={() => setShowInfo(!showInfo)}
                        >
                            <div className='button-content'>
                                Available Data
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
            <DataInfoDisplay />
        </>
    )
}

export default Sidebar;