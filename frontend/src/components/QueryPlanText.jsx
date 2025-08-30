import PropTypes from "prop-types";
import React from "react";

const QueryPlanText = ({ timeseriesTextOut, heatmapTextOut, heatmapRangeOut }) => {
  const localFilesList = [
    ...(timeseriesTextOut.local || []),
    ...(heatmapTextOut.local || []),
  ];
  const numUniqueFiles = new Set(localFilesList).size;

  const apiList = [
    ...(timeseriesTextOut.api || []),
    ...(heatmapTextOut.api || []),
  ];

  const numYears = heatmapRangeOut.year;
  const numMonths = heatmapRangeOut.month;
  const numDays = heatmapRangeOut.day;
  const numHours = heatmapRangeOut.hour;

  // Total hours (rounded)
  const totalHours = Math.round(
    8766 * numYears + 730.001 * numMonths + 24 * numDays + numHours
  );

  return (
    <div className="p-4 text-sm leading-snug whitespace-normal break-words">
     <p className="mb-1"> <strong>Get data</strong> </p>
      <div className="ml-4 space-y-0.5">
        <p className="mb-0">from {numUniqueFiles} local files read for each sp.region</p>
        <ul className="list-disc ml-5 space-y-0.5 mb-0">
          <li>{numYears} yearly values</li>
          <li>{numMonths} monthly values</li>
          <li>{numDays} daily values</li>
          <li>{numHours} hourly values</li>
        </ul>

        <div className="ml-4 space-y-0.5">
          {apiList.length === 0 ? (
            <p className="mb-0">all data in storage, no API calls.</p>
          ) : (
            <>
              <p className="mb-0">additional data needed, API calls:</p>
              <div className="ml-3 max-h-24 overflow-y-auto border rounded p-1 bg-gray-50 text-xs leading-tight">
                <ul className="list-disc pl-4 space-y-0.5 mb-0">
                  {apiList.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

        <p className="mt-1 mb-0">
          [
          <span className="ml-1">
            <i>With Polaris:</i> {numYears + numMonths + numDays + numHours} values/sp.region read from storage. 
          </span>
          <span className="ml-1">
            <i> Without Polaris: </i>{totalHours} values/sp.region to download and process
          </span>
          ]
        </p>
      </div>

      <p className=" mt-4"> <strong>Perform queries:</strong> </p>
      <div className="ml-4 space-y-0.5">
        <ul className="list-disc ml-5 space-y-0.5 mb-0">
          <li><i>Heatmap:</i> aggregate values/sp.region</li>
          <li><i>Timeseries:</i> aggregate data/time interval</li>
          <li><i>Find Area/Time:</i> use min and max values of coarser resolutions to filter out finer resolution regions/times.</li>
        </ul>
      </div>
    </div>
  );
};

QueryPlanText.propTypes = {
  timeseriesTextOut: PropTypes.shape({
    local: PropTypes.arrayOf(PropTypes.string),
    api: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  heatmapTextOut: PropTypes.shape({
    local: PropTypes.arrayOf(PropTypes.string),
    api: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  heatmapRangeOut: PropTypes.shape({
    year: PropTypes.number,
    month: PropTypes.number,
    day: PropTypes.number,
    hour: PropTypes.number,
  }).isRequired,
};

export default QueryPlanText;
