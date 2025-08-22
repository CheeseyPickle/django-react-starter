import { useState } from "react";
import Input from "../input";
import DataInfoDisplay from "./DataInfoDisplay";
import SpatialPredicateControls from "./SpatialPredicateControls";
import TemporalPredicateControls from "./TemporalPredicateControls";
import AggregationControls from "./AggregationControls";
import FiltersControls from "./FilterControls";
import SidebarButtons from "./SidebarButtons";
import { VARIABLES } from "../../constants/data";
import "../../styles/sidebar.css";
import "../../styles/loading.css";

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

  return (
    <>
        <div className="title_container">
          <p>POLARIS</p>
        </div>
        <div className="subtitle_container">
          Interactive and Scalable Interface for Polar Science
        </div>

        <Input
          val={variable}
          setVal={setVariable}
          label="Variable"
          options={VARIABLES}
          size="small"
          varLabel="variable"
        />

        <SpatialPredicateControls formData={formData} handleChange={handleChange} />
        <TemporalPredicateControls
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          formData={formData}
          handleChange={handleChange}
        />
        <AggregationControls formData={formData} handleChange={handleChange} />

        <div className="row_wrapper">
          <FiltersControls
            formData={formData}
            setPredicate={setPredicate}
            setComparisonVal={setComparisonVal}
          />
          <SidebarButtons
            isLoading={isLoading}
            queryData={queryData}
            showInfo={showInfo}
            setShowInfo={setShowInfo}
          />
        </div>
      <DataInfoDisplay showInfo={showInfo} setShowInfo={setShowInfo} />
    </>
  );
};

export default Sidebar;
