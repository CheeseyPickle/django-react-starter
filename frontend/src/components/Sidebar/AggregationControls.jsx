import RadioButtonsRow from "../RadioRow";

const AggregationControls = ({ formData, handleChange }) => (
  <div className="control_section">
    <RadioButtonsRow
      options={["Min", "Max", "Mean"]}
      var={formData.aggregation}
      setVal={handleChange}
      subLabel="aggregation"
      defaultValue="Mean"
    />
  </div>
);

export default AggregationControls;
