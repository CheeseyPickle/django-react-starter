from abc import ABC, abstractmethod
import xarray as xr

from .metadata import init_metadata
from .utils.const import long_short_name_dict, DataRange

class QueryExecutor(ABC):
    def __init__(
        self,
        dr: DataRange, 
        metadata=None,  # metadata file path
    ):
        if dr.temporal_resolution == "hour" and dr.spatial_resolution == 0.25:
            dr.aggregation = "none"
        # user query parameters
        self.dr = dr

        # query internal variables
        self.variable_short_name = long_short_name_dict[dr.variable]
        if metadata:
            init_metadata(metadata) # Move this to database initialization, once we do that
        else:
            init_metadata("/data/metadata.csv")

    @abstractmethod
    def execute(self) -> xr.Dataset:
        """
        Return: xarray.Dataset, with data variable as loaded-in-memory Numpy array
        """
        pass
