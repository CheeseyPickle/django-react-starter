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
    plot_bgcolor: "#ffffff",
    paper_bgcolor: "#ffffff",
    xaxis: { 
      title: "Time", 
      showgrid: true,
      gridcolor: "#e6e6e6",   // light gray grid
      gridwidth: 1,
      zeroline: false, 
      ...(layoutFromServer.xaxis || {}) },
    yaxis: { 
      title: "Value", 
      showgrid: true,
      gridcolor: "#e6e6e6",
      gridwidth: 1,
      zeroline: false,
      ...(layoutFromServer.yaxis || {}) },
  };

  const config = {
    displayModeBar: true,
    displaylogo: false,
    responsive: true,
    toImageButtonOptions: { format: "png", filename: "polaris_timeseries" },
    modeBarButtonsToRemove: ["resetScale", "lasso2d", "select2d"],
  };

  const styledData = data.map((trace, i) => ({
    ...trace,
    line: {
      color: ["#6C88B8", "#1E4E54", "#b29a79"][i % 3], // cycle through colors
      width: 2,
    },
}));

  return (
    <div className="time_series">
      {hasData ? (
        <div className="ts_plot">
          <Plot
            className="ts_plotly"
            data={styledData}
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