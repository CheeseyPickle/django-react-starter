from .utils.const import DataRange

_query_list: list[(DataRange, str, float)] = []

def log_query(dr: DataRange, file: str, time: float) -> None:
    global _query_list

    _query_list.append(dr, file, time)
    # if len(_query_list) > 50:
    #     # Push to persistent storage?
    #     pass