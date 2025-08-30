import { useState } from "react";
import Input from "../input";
import SpatialPredicateControls from "./SpatialPredicateControls";
import TemporalPredicateControls from "./TemporalPredicateControls";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from 'dayjs'
import { ADMINVARIABLES } from "../../constants/data";
import "../../styles/sidebar.css";

const AdminSidebar = ({ onSubmit, sidebarCollapsed }) => {

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

    // Change params

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

        </>


    )
    
}