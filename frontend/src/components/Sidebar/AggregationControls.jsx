import RadioButtonsRow from "../RadioRow";

const AggregationControls = ({ formData, handleChange }) => (
  <div className="control_section">
    <RadioButtonsRow
      options={["min", "max", "mean"]}
      var={formData.aggregation}
      setVal={handleChange}
      subLabel="aggregation"
      defaultValue="mean"
    />
  </div>
);

export default AggregationControls;
