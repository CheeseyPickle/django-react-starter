# Dummy class for deleting and downloading data from Sedona
import os
import cdsapi
from metadata import Metadata

_metadata : Metadata

def init_data_manager(meta : Metadata):
    global _metadata
    _metadata = meta

# Consider switching this to "downgrade data".
# Basically downgrade its spatial & temporal resolution instead of deleting.
def delete_data(variable: str,
        start_datetime: str,
        end_datetime: str,
        min_lat: float,
        max_lat: float,
        min_lon: float,
        max_lon: float,
        temporal_resolution: str,  # e.g., "hour", "day", "month", "year"
        spatial_resolution: float,  # e.g., 0.25, 0.5, 1.0
        ):
    # Get files
    overlap, _ = _metadata.query_get_overlap_and_leftover(
        variable,
        start_datetime,
        end_datetime,
        min_lat,
        max_lat,
        min_lon,
        max_lon,
        temporal_resolution,
        spatial_resolution,
        aggregation="none"
    )
    files = overlap["file_path"].tolist()

    # Delete data from files

    # Update metadata
    pass

def download_data(variable: str,
        start_datetime: str,
        end_datetime: str,
        min_lat: float,
        max_lat: float,
        min_lon: float,
        max_lon: float,
        temporal_resolution: str,  # e.g., "hour", "day", "month", "year"
        spatial_resolution: float,  # e.g., 0.25, 0.5, 1.0
        ):
    # # Set up API request
    # dataset = "reanalysis-era5-single-levels"
    # request = {
    #     "product_type": ["reanalysis"],
    #     "variable": [variable],
    #     "year": years,
    #     "month": months,
    #     "day": days,
    #     "time": [f"{str(i).zfill(2)}:00" for i in range(0, 24)],
    #     "data_format": "netcdf",
    #     "download_format": "unarchived",
    #     "area": [max_lat, min_lon, min_lat, max_lon],
    # }
    # api_calls = []
    # api_calls.append((dataset, request))

    # # Store as file(s)
    # c = cdsapi.Client()
    # for dataset, request in api_calls:
    #     file_name = self._gen_download_file_name() # Figure out what to name file
    #     c.retrieve(dataset, request).download(file_name)
    #     download_file_list.append(file_name)

    # # Aggregate?
    # # Update metadata
    pass