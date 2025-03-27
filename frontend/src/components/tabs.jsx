import PropTypes from "prop-types";
import { Box, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import TimeSeries from "./TimeSeries";
import HeatMap from "./HeatMap";
import FindTime from "./FindTime";
import FindArea from "./FindArea";
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
      style={{
        dislpay: value == index ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
      }}
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
}) => {

  // Available tab options
  const tabOptions = [
    { value: 0, label: "Heatmap" },
    { value: 1, label: "Time Series" },
    { value: 2, label: "Raster Info" },
    { value: 3, label: "Find Time" },
    { value: 4, label: "Find Area" },
  ];

  return (
    <div className="tabs_wrapper">
      <Box sx={{ display: "flex", }}>
        {/* Render 3 Panels */}
        {["panel1", "panel2", "panel3"].map((panelId) => (
          <div 
            key={panelId} className="panel-container" 
            style={{ maxWidth: "33%", height: "100%", border: "0.5px solid ",}}
            >
            {/* Dropdown to select tab for each panel */}
            <FormControl variant="filled" fullWidth>
              <InputLabel id={`tab-select-label-${panelId}`}>Select Plot</InputLabel>
              <Select
                labelId={`tab-select-label-${panelId}`}
                value={activeTabs[panelId]}
                onChange={(event) => handleTabChange(panelId, event)}
                sx={{
                  '& .MuiInputBase-root': { fontSize: '50px', fontFamily: "Georgia, serif" },
                  '& .MuiInputLabel-root': { fontSize: '50px', fontFamily: "Georgia, serif" }
                }}
              >
                {tabOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value} sx={{ fontSize: '25px', fontFamily: "Georgia, serif", justifyContent: "center" }}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Custom Panels */}
            <CustomTabPanel value={activeTabs[panelId]} index={0}>
              <HeatMap heatMapImage={heatMapImage} />
            </CustomTabPanel>
            <CustomTabPanel value={activeTabs[panelId]} index={1}>
              <TimeSeries timeSeriesImage={timeSeriesImage} />
            </CustomTabPanel>
            <CustomTabPanel value={activeTabs[panelId]} index={2}>
              <div className="raster_data">
                {!htmlString ? <div className="no_content">No Content</div> : <pre className="raster_content">{htmlString}</pre>}
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={activeTabs[panelId]} index={3}>
              <FindTime findTimeImage={findTimeImage} />
            </CustomTabPanel>
            <CustomTabPanel value={activeTabs[panelId]} index={4}>
              <FindArea findAreaImage={findAreaImage} formData={formData} />
            </CustomTabPanel>
          </div>
        ))}
      </Box>
    </div>
  );
};

Tabs.propTypes = {
  formData: PropTypes.object,
  htmlString: PropTypes.string,
  timeSeriesImage: PropTypes.object,
  heatMapImage: PropTypes.object,
  findTimeImage: PropTypes.object,
  findAreaImage: PropTypes.object,
};

export default Tabs;
