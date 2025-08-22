import RadioButtonsRow from "../RadioRow";

const AggregationControls = ({ formData, handleChange }) => (
  <div className="control_section">
    <p className="section_title">Spatio-Temporal Aggregation</p>
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
