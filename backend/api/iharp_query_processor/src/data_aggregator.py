# Centralized file for data aggregation functions
import xarray as xr
from .utils.const import time_resolution_to_freq

def aggregate_downloaded_file(file, temporal_resolution, spatial_resolution, aggregation):
    ds = xr.open_dataset(file, engine="netcdf4")
    # drop unused variables
    # if "number" in ds.coords:
    #     ds = ds.drop_vars("number")
    # if "expver" in ds.coords:
    #     ds = ds.drop_vars("expver")
    ds = ds.sel(
        valid_time=slice(self.start_datetime, self.end_datetime),
        latitude=slice(self.max_lat, self.min_lat),
        longitude=slice(self.min_lon, self.max_lon),
    )
    # temporal resample
    if temporal_resolution != "hour":
        resampled = ds.resample(valid_time=time_resolution_to_freq(temporal_resolution))
        if aggregation == "mean":
            ds = resampled.mean()
        elif aggregation == "max":
            ds = resampled.max()
        elif aggregation == "min":
            ds = resampled.min()
        else:
            raise ValueError("Invalid temporal_aggregation")
    # spatial resample
    if spatial_resolution > 0.25:
        c_f = int(spatial_resolution / 0.25)
        coarsened = ds.coarsen(latitude=c_f, longitude=c_f, boundary="trim")
        if aggregation == "mean":
            ds = coarsened.mean()
        elif aggregation == "max":
            ds = coarsened.max()
        elif aggregation == "min":
            ds = coarsened.min()
        else:
            raise ValueError("Invalid spatial_aggregation")
    
    return ds

def do_all_aggregations(file):
    pass