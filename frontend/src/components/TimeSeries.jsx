import PropTypes from "prop-types";
import Plot from "react-plotly.js";
import "../styles/timeseries.css";

const TimeSeries = ({ timeSeriesImage }) => {
  // accept several possible shapes: {data, layout, frames} OR {figure:{...}} OR {}
  const fig = timeSeriesImage?.figure ? timeSeriesImage.figure : timeSeriesImage || {};
  const data = Array.isArray(fig?.data) ? fig.data : [];
  const layoutFromServer = fig?.layout || {};
  const frames = Array.isArray(fig?.frames) ? fig.frames : [];

  const hasData = data.length > 0;

  const layout = {
    ...layoutFromServer,
    autosize: true,
    margin: { l: 10, r: 10, b: 40, t: 25 },
    plot_bgcolor: "#BAD4DC",
    paper_bgcolor: "#BAD4DC",
    xaxis: { title: "Time", showgrid: true, ...(layoutFromServer.xaxis || {}) },
    yaxis: { title: "Value", showgrid: true, ...(layoutFromServer.yaxis || {}) },
  };

  const config = {
    displayModeBar: true,
    displaylogo: false,
    responsive: true,
    toImageButtonOptions: { format: "png", filename: "plot_image" },
    modeBarButtonsToRemove: ["resetScale", "lasso2d", "select2d"],
  };

  return (
    <div className="time_series">
      {hasData ? (
        <div className="ts_plot">
          <Plot
            className="ts_plotly"
            data={data}
            layout={layout}
            frames={frames}
            config={config}
            useResizeHandler
            style={{ width: "100%", height: "100%" }}   // <- key for sizing
          />
        </div>
      ) : (
        <div className="ts_plot">Values aggregated over region.</div>
      )}
    </div>
  );
};

TimeSeries.propTypes = { timeSeriesImage: PropTypes.object };
export default TimeSeries;



// import PropTypes from "prop-types";
// import Plot from 'react-plotly.js';
// import "../styles/timeseries.css"
// import { useColorScheme } from "@mui/material";

// const TimeSeries = ({ timeSeriesImage }) => {
//   console.log("timeSeriesImage:", timeSeriesImage);
//   const defaultLayout = {
//     ...timeSeriesImage.layout,
//     autosize: true,
//     margin: { l: 0, r: 0, b: 25, t: 25 },
//     plot_bgcolor: "#ffffff",
//     paper_bgcolor: "#ffffff", 
//     xaxis: {
//       title: 'Time',
//       showgrid: true,
//     },
//     yaxis: {
//       title: 'Value',
//       showgrid: true,
//     }
//   };

//   const defaultConfig = {
//     displayModeBar: true,
//     responsive: true,
//     displaylogo: false,
//     toImageButtonOptions: {
//       format: 'png',
//       filename: 'plot_image'
//     },
//   modeBarButtonsToRemove: ["resetScale", "lasso2d", "select2d"],
//   };

//   // TODO: Add warning if temporal res is less than date start/end differences
//   return (
//     <div className="time_series">
//       {timeSeriesImage && Object.keys(timeSeriesImage).length > 0 ? (
//         <div className='ts_plot'>
//           <Plot
//             className='ts_plotly'
//             data={timeSeriesImage.data}
//             layout={defaultLayout}
//             frames={timeSeriesImage.frames}
//             config={defaultConfig} />
//         </div>
//       ) : (
//         <div className='ts_plot'>
//           Values aggregated over region.
//         </div>
//       )}
//     </div>
//   )
// }

// TimeSeries.propTypes = {
//   timeSeriesImage: PropTypes.object,
// }

// export default TimeSeries