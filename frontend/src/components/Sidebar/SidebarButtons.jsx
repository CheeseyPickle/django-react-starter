import { Button } from "@mui/material";

const SidebarButtons = ({ isLoading, queryData, showInfo, setShowInfo, showQueryLog, setShowQueryLog }) => (
  <div className="half_column_wrapper">
    <Button
      onClick={() => queryData()}
      variant="contained"
      color="custom"
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
      color="custom"
      onClick={() => setShowInfo(!showInfo)}
    >
      Available Data
    </Button>
    <Button
      variant="outlined"
      color="custom"
      onClick={() => setShowQueryLog(!showQueryLog)}
    >
      Query Log
    </Button>
  </div>
);

export default SidebarButtons;
