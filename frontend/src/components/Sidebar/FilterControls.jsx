import { TextField } from "@mui/material";
import Input from "../input";

const FiltersControls = ({ formData, setPredicate, setComparisonVal }) => (
  <div className="half_control_section">
    <p className="section_title">Filters</p>
    <div className="pred_value">
      <Input
        name="predicate"
        label="Predicate"
        options={["<", ">", "<=", ">=", "!="]}
        size="small"
        val={formData.filterPredicate}
        setVal={setPredicate}
      />
      <TextField
        label="Value"
        type="number"
        size="small"
        value={formData.filterValue}
        onChange={(e) => setComparisonVal(e.target.value)}
      />
    </div>
  </div>
);

export default FiltersControls;
