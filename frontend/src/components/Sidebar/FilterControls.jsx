import { TextField } from "@mui/material";
import Input from "../input";

const FiltersControls = ({ formData, setPredicate, setComparisonVal }) => (
  <div className="half_control_section">
    <div className="pred_value">
      <Input
        name="predicate"
        label="Predicate"
        options={["<", ">", "<=", ">=", "!="]}
        val={formData.filterPredicate}
        setVal={setPredicate}
      />
      <TextField
        label="Value"
        type="number"
        value={formData.filterValue}
        onChange={(e) => setComparisonVal(e.target.value)}
      />
    </div>
  </div>
);

export default FiltersControls;
