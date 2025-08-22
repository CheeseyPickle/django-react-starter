import { Button } from "@mui/material";

const SidebarButtons = ({ isLoading, queryData, showInfo, setShowInfo }) => (
  <div className="half_column_wrapper">
    <Button
      onClick={queryData}
      variant="contained"
      color="success"
      disabled={isLoading}
      className="query_button"
    >
      <div className="button-content">
        {isLoading && <div className="loading-spinner" />}
        Query Data
      </div>
    </Button>
    <Button
      variant="outlined"
      color="success"
      onClick={() => setShowInfo(!showInfo)}
    >
      Available Data
    </Button>
  </div>
);

export default SidebarButtons;
