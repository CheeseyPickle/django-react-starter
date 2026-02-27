import tomllib
from pathlib import Path
from .src.query_executor_get_raster import GetRasterExecutor
from .src.query_executor_timeseries import TimeseriesExecutor
from .src.query_executor_heatmap import HeatmapExecutor
from .src.query_executor_find_time import FindTimeExecutor
from .src.query_executor_find_area import FindAreaExecutor
from .src.metadata import init_metadata
from .src.utils.const import long_short_name_dict

settings = tomllib.loads((Path(__file__).parent / "iharpconfig.toml").read_text())

# Read metadata filename from a .config file, probably
if "METADATA_PATH" in settings.keys() and settings["METADATA_PATH"] != "":
    init_metadata(settings["METADATA_PATH"]) # Move this to database initialization, once we do that
else:
    init_metadata("/data/metadata.csv")