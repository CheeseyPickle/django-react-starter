import { useState } from "react";
import Input from "../input";
import SpatialPredicateControls from "./SpatialPredicateControls";
import TemporalPredicateControls from "./TemporalPredicateControls";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from 'dayjs'
import { ADMINVARIABLES } from "../../constants/data";
import "../../styles/sidebar.css";

const AdminSidebar = ({ onSubmit, sidebarCollapsed, handleChange }) => {

    // Parameters
    const [variable, setVariable] = useState("2m_temperature");
    const [startDate, setStartDate] = useState(dayjs("2020-06-01T00:00Z"));
    const [endDate, setEndDate] = useState(dayjs("2023-12-31T23:00Z"));
    const [temporalResolution, setTemporalResolution] = useState("year");
    const [spatialResolution, setSpatialResolution] = useState("mean");
    const [region, setRegion] = useState({
        north: 84,
        south: 59,
        east: -10,
        west: -74
    })
    
    const [uiTable, setUiTable] = useState({})

    const addRowToTable = async () => {
        const round2 = (val) => (val != null ? Number(val.toFixed(2)) : "-");

        const newQuery = [
            formData.north != null ? `N: ${round2(formData.north)}` : "N: -",
            formData.south != null ? `S: ${round2(formData.south)}` : "S: -",
            formData.east  != null ? `E: ${round2(formData.east)}` : "E: -",
            formData.west  != null ? `W: ${round2(formData.west)}` : "W: -",
            formData.spatialResolution ? `Resolution: ${formData.spatialResolution}` : "Resolution: -",
            startDate ? `Start Date: ${startDate.format("YYYY-MM-DD HH")}` : "Start Date: -",
            endDate   ? `End Date: ${endDate.format("YYYY-MM-DD HH")}` : "End Date: -",
            formData.temporalResolution ? `Resolution: ${formData.temporalResolution}` : "Resolution: -"
        ]

        setUiTable(prevLog => [...])
    }



    // Change params
    const [formData, setFormData] = useState({
        requestType: "",
        variable: variable,
        startDateTime: startDate,
        endDateTime: endDate,
        temporalResolution: "year",
        temporalAggregation: "mean",
        north: 84,
        south: 59,
        east: -10,
        west: -74,
        spatialResolution: 1,
        aggregation: "mean",
    });

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            variable: variable,
            startDateTime: startDate,
            endDateTime: endDate,
        }))
    }, [variable, startDate, endDate]);
    

    // Return
    if (sidebarCollapsed) {
        return null;
    }

    return (
        <>
            <div className="title_container">
                <p>POLARIS ADMIN</p>
            </div>

            <div className="subtitle_container">
                Select your data of interest using the parameters below.
            </div>

            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className="accordion-title">Variable</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Input
                        val={variable}
                        setVal={setVariable}
                        options={ADMINVARIABLES}
                        varLabel="variable"
                    />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className="accordion-title">Spatial Predicate</Typography>
                </AccordionSummary>
            </Accordion>

        </>


    )
    
}