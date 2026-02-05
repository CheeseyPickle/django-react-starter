from metadata import Metadata
# Implemented as a module, since apparently that's what Python devs prefer when making singletons.

_query_miss_threshold = 0.05 # From POLARIS paper
_query_list = []
_metadata : Metadata

def init_query_monitor(meta : Metadata):
    global _metadata
    _metadata = meta

def _get_stored_data():
    return _metadata.df_meta

def restructure_db() -> None:
    # Threshold is passed, so restructure the DB based on query list.
    # Maybe push this into a separate module if too complicated?

    # Detect what new ideal stored area is (based on api restructure alg)

    # Download new data delete old data
    # Practically, need to delete files and store data as files.
    # Delete first (Where is data stored?)
    # Then download

    # Update metadata
    pass

def log_query(variable: str,
        start_datetime: str,
        end_datetime: str,
        min_lat: float,
        max_lat: float,
        min_lon: float,
        max_lon: float,
        temporal_resolution: str,  # e.g., "hour", "day", "month", "year"
        spatial_resolution: float,  # e.g., 0.25, 0.5, 1.0
        ) -> None:
    global _query_list

    _query_list.append([variable, min_lat, max_lat, min_lon, max_lon, spatial_resolution, start_datetime, end_datetime, temporal_resolution])
    if len(_query_list) > 50:
        _query_list.pop(0)

    # 100% placeholder code for now.
    stored_data = _get_stored_data()
    miss_ratio = 0
    for query in _query_list:
        if query not in stored_data:
            miss_ratio += 1
    miss_ratio /= len(_query_list)

    if miss_ratio > _query_miss_threshold:
        restructure_db()