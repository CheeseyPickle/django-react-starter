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
      {/* 1. Data retrieval */}
      <p className="mb-1">
        <strong>Get data</strong>
      </p>
      <div className="ml-6">
        <p>from {numUniqueFiles} local files read for each sp.region</p>
        <ul className="list-disc ml-6">
          <li>{numYears} yearly values</li>
          <li>{numMonths} monthly values</li>
          <li>{numDays} daily values</li>
          <li>{numHours} hourly values</li>
        </ul>
        <p className="mt-2">
          download data not in storage
        </p>
        <div className="ml-6">
          {apiList.length === 0 ? (
              <p>all data in local storage, no API calls</p>
            ) : (
              <>
                <p>
                  API requests:
                </p>
                <div className="ml-4 max-h-24 overflow-y-auto border rounded p-2 bg-gray-50">
                  {apiList.join(", ")}
                </div>
                <p className="mt-2">aggregate to desired resolutions</p>
              </>
            )}
        </div>
        <p className="mt-2">
          <strong>With Polaris:</strong> {numYears + numMonths + numDays + numHours} values/sp.region read from
          storage
        </p>
        <p className="mt-2">
          <strong>Without Polaris:</strong> {totalHours} values/sp.region to download and process
        </p>
      </div>

      <p className=" mt-4">
        <strong>Perform queries:</strong>
      </p>
      <div className="ml-6">
        <ul className="list-disc ml-6">
          <li><strong>Heatmap:</strong> aggregate all data in each region</li>
          <li><strong>Timeseries:</strong> aggregate all data in a time interval </li>
          <li><strong>Find Area:</strong> filter heatmap</li>
          <li><strong>Find Time:</strong> filter timeseries</li>
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