import PropTypes from "prop-types";
import { Box, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import TimeSeries from "./TimeSeries";
import HeatMap from "./HeatMap";
import FindTime from "./FindTime";
import FindArea from "./FindArea";
import QueryPlanText from "./QueryPlanText"
import XarrayViewer from "./Raster";
import "../styles/tabs.css";
import "../styles/loading.css";

function CustomTabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      className="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ width: "100%", height: "100%" }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.any,
  value: PropTypes.number,
  index: PropTypes.number,
};

const Tabs = ({

  activeTabs,
  handleTabChange,

  formData,
  htmlString,
  timeSeriesImage,
  heatMapImage,
  findTimeImage,
  findAreaImage,
  timeseriesTextOut,
  heatmapTextOut,
}) => {

  // Available tab options
  const tabOptions = [
    { value: 0, label: "Heatmap" },
    { value: 1, label: "Time Series" },
    { value: 2, label: "Raster Info" },
    { value: 3, label: "Find Time" },
    { value: 4, label: "Find Area" },
    { value: 5, label: "Query Plan"},
  ];

  return (
    <>
        {["panel1", "panel2", "panel3"].map((panelId) => (
          <div 
            key={panelId} className="panel-container" 
            style={{ border: "0.5px solid "}}
          >
            {/* Dropdown to select tab for each panel */}
            <FormControl variant="filled" fullWidth>
              <InputLabel id={`tab-select-label-${panelId}`}>Select Plot</InputLabel>
              <Select
                labelId={`tab-select-label-${panelId}`}
                value={activeTabs[panelId]}
                onChange={(event) => handleTabChange(panelId, event)}
              >
                {tabOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Custom Panels */}
            <CustomTabPanel value={activeTabs[panelId]} index={0}>
              <div style={{ width: "100%", height: "100%", display: "flex" }}>
                <HeatMap heatMapImage={heatMapImage} />
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={activeTabs[panelId]} index={1}>
              <div style={{ width: "100%", height: "100%", display: "flex" }}>
                <TimeSeries timeSeriesImage={ timeSeriesImage } />
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={activeTabs[panelId]} index={2}>
              <div style={{ width: "100%", height: "100%", display: "flex" }}>
                {/* <div className="raster_data">
                  {!htmlString ? <div className="no_content">No Content</div> : <pre className="raster_content">{htmlString}</pre>}
                </div> */}
                <XarrayViewer raw={htmlString}/>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={activeTabs[panelId]} index={3}>
              <div style={{ width: "100%", height: "100%", display: "flex" }}>
                <FindTime findTimeImage={findTimeImage} />
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={activeTabs[panelId]} index={4}>
              <div style={{ width: "100%", height: "100%", display: "flex" }}>
                <FindArea findAreaImage={findAreaImage} formData={formData} />
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={activeTabs[panelId]} index={5}>
              <div style={{ width: "100%", height: "100%", display: "flex" }}>
                <QueryPlanText  timeseriesTextOut={timeseriesTextOut} heatmapTextOut={heatmapTextOut} />
              </div>
            </CustomTabPanel>
          </div>
      ))}
    </>
  );
};

Tabs.propTypes = {
  formData: PropTypes.object,
  htmlString: PropTypes.string,
  timeSeriesImage: PropTypes.object,
  heatMapImage: PropTypes.object,
  findTimeImage: PropTypes.object,
  findAreaImage: PropTypes.object,
  timeseriesTextOut: PropTypes.object,
  heatmapTextOut: PropTypes.object,
};

export default Tabs;
