from .utils.const import DataRange
from .metadata import query_get_overlap_and_leftover

_query_miss_threshold = 0.05 # From POLARIS paper
_query_list: list[DataRange] = []

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

def log_query(dr: DataRange) -> None:
    global _query_list

    _query_list.append(dr)
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