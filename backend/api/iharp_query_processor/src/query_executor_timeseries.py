from .query_executor import *
from .query_executor_get_raster import GetRasterExecutor


class TimeseriesExecutor(QueryExecutor):
    def __init__(
        self,
        variable: str,
        start_datetime: str,
        end_datetime: str,
        min_lat: float,
        max_lat: float,
        min_lon: float,
        max_lon: float,
        temporal_resolution: str,  # e.g., "hour", "day", "month", "year"
        aggregation,  # e.g., "mean", "max", "min"
        time_series_aggregation_method: str,  # e.g., "mean", "max", "min"
        metadata=None,  # metadata file path
        log_info=None,
    ):
        super().__init__(
            variable=variable,
            start_datetime=start_datetime,
            end_datetime=end_datetime,
            min_lat=min_lat,
            max_lat=max_lat,
            min_lon=min_lon,
            max_lon=max_lon,
            temporal_resolution=temporal_resolution,
            spatial_resolution=0.25,
            aggregation=aggregation,
            metadata=metadata,
        )
        self.time_series_aggregation_method = time_series_aggregation_method
        self.log_info = log_info if log_info is not None else []

    def merge_log_infos(self):
        combined = {"local_files": [], "api_calls": []}
        for info in self.log_info:
            combined["local_files"].extend(info.get("local_files", []))
            combined["api_calls"].extend(info.get("api_calls", []))
        # remove duplicates
        # combined["local_files"] = list(dict.fromkeys(combined["local_files"]))
        # combined["api_calls"] = list(dict.fromkeys(combined["api_calls"]))
        return combined

    def get_log(self):
        # print(f"[TimeseriesExecutor.get_log] log_info: {self.log_info}")
        return self.log_info

    def execute(self):
        # print(f"[TimeseriesExecutor] Starting execution")
        get_raster_executor = GetRasterExecutor(
            variable=self.variable,
            start_datetime=self.start_datetime,
            end_datetime=self.end_datetime,
            min_lat=self.min_lat,
            max_lat=self.max_lat,
            min_lon=self.min_lon,
            max_lon=self.max_lon,
            temporal_resolution=self.temporal_resolution,
            spatial_resolution=0.25,
            aggregation=self.time_series_aggregation_method,
            metadata=self.metadata.f_path,
        )
        raster = get_raster_executor.execute()

        # print(f"[TimeseriesExecutor] Raster executor log before append: {self.log_info}")
        self.log_info.append(get_raster_executor.get_log())
        # self.log_info = self.merge_log_infos()
        # print(f"[TimeseriesExecutor] Raster executor log after append: {self.log_info}")

        if self.time_series_aggregation_method == "mean":
            return raster.mean(dim=["latitude", "longitude"]).compute()
        elif self.time_series_aggregation_method == "max":
            return raster.max(dim=["latitude", "longitude"]).compute()
        elif self.time_series_aggregation_method == "min":
            return raster.min(dim=["latitude", "longitude"]).compute()
        else:
            raise ValueError(f"Invalid time series aggregation method: {self.time_series_aggregation_method}")
