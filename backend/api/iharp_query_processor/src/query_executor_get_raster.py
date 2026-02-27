import tomli_w
from pathlib import Path
from datetime import datetime
import math
import cdsapi
import pandas as pd
import xarray as xr

from remote.driver import RequestRemoteData
from .metadata import query_get_overlap_and_leftover
from .query_executor import QueryExecutor
from .utils.const import DataRange, time_resolution_to_freq

# def write_toml_config(path, config_dict):

#     with open(path, "wb") as f:
#         tomli_w.dump(config_dict, f)

class GetRasterExecutor(QueryExecutor):
    def __init__(
        self,
        dr: DataRange,
        log_info=None,
    ):
        super().__init__(
            dr,
        )
        self.log_info = log_info if log_info is not None else []

    def get_log(self):
        # print(f"[GetRasterExecutor.get_log] log_info: {self.log_info}")
        return self.log_info
    
    def _data_files_for_query(self):

        df_overlap, leftover = query_get_overlap_and_leftover(self.dr)

        if not df_overlap["file_path"]:     # TODO: check if need this
            local_files = []
        else:
            local_files = df_overlap["file_path"].tolist()
            local_files = sorted(local_files)

        # TODO: allow multiple leftovers
        if leftover is not None:
            leftover_min_lat = math.floor(leftover.latitude.min().item())
            leftover_max_lat = math.ceil(leftover.latitude.max().item())
            leftover_min_lon = math.floor(leftover.longitude.min().item())
            leftover_max_lon = math.ceil(leftover.longitude.max().item())
            leftover_start_datetime = pd.Timestamp(leftover.time.min().item())
            leftover_end_datetime = pd.Timestamp(leftover.time.max().item())
            leftover_start_year, leftover_start_month, leftover_start_day = (
                leftover_start_datetime.year,
                leftover_start_datetime.month,
                leftover_start_datetime.day,
            )
            leftover_end_year, leftover_end_month, leftover_end_day = (
                leftover_end_datetime.year,
                leftover_end_datetime.month,
                leftover_end_datetime.day,
            )

            years = [str(i) for i in range(leftover_start_year, leftover_end_year + 1)]
            months = [str(i).zfill(2) for i in range(1, 13)]
            days = [str(i).zfill(2) for i in range(1, 32)]
            if self.dr.temporal_resolution == "month":
                if leftover_start_year == leftover_end_year:
                    months = [str(i).zfill(2) for i in range(leftover_start_month, leftover_end_month + 1)]
            if self.dr.temporal_resolution == "day" or self.dr.temporal_resolution == "hour":
                if leftover_start_year == leftover_end_year:
                    months = [str(i).zfill(2) for i in range(leftover_start_month, leftover_end_month + 1)]
                    if leftover_start_month == leftover_end_month:
                        days = [str(i).zfill(2) for i in range(leftover_start_day, leftover_end_day + 1)]

            request_params = {
                "dataset": "carra",     # TODO: add dataset variable to dr
                "variable": self.dr.variable,
                "years": years,
                "months": months,
                "days": days,
                "min_lat": leftover_min_lat,
                "max_lat": leftover_max_lat,
                "min_lon": leftover_min_lon,
                "max_lon": leftover_max_lon,
            }
        else:
            request_params = {}

        return local_files, request_params

    def _check_metadata(self):
        """
        Return: [local_files], [api_calls]
        """
        df_overlap, leftover = query_get_overlap_and_leftover(self.dr)

        local_files = df_overlap["file_path"].tolist()
        api_calls = []
        if leftover is not None:
            leftover_min_lat = math.floor(leftover.latitude.min().item())
            leftover_max_lat = math.ceil(leftover.latitude.max().item())
            leftover_min_lon = math.floor(leftover.longitude.min().item())
            leftover_max_lon = math.ceil(leftover.longitude.max().item())
            leftover_start_datetime = pd.Timestamp(leftover.time.min().item())
            leftover_end_datetime = pd.Timestamp(leftover.time.max().item())
            leftover_start_year, leftover_start_month, leftover_start_day = (
                leftover_start_datetime.year,
                leftover_start_datetime.month,
                leftover_start_datetime.day,
            )
            leftover_end_year, leftover_end_month, leftover_end_day = (
                leftover_end_datetime.year,
                leftover_end_datetime.month,
                leftover_end_datetime.day,
            )

            years = [str(i) for i in range(leftover_start_year, leftover_end_year + 1)]
            months = [str(i).zfill(2) for i in range(1, 13)]
            days = [str(i).zfill(2) for i in range(1, 32)]
            if self.dr.temporal_resolution == "month":
                if leftover_start_year == leftover_end_year:
                    months = [str(i).zfill(2) for i in range(leftover_start_month, leftover_end_month + 1)]
            if self.dr.temporal_resolution == "day" or self.dr.temporal_resolution == "hour":
                if leftover_start_year == leftover_end_year:
                    months = [str(i).zfill(2) for i in range(leftover_start_month, leftover_end_month + 1)]
                    if leftover_start_month == leftover_end_month:
                        days = [str(i).zfill(2) for i in range(leftover_start_day, leftover_end_day + 1)]

            dataset = "reanalysis-era5-single-levels"
            request = {
                "product_type": ["reanalysis"],
                "variable": [self.dr.variable],
                "year": years,
                "month": months,
                "day": days,
                "time": [f"{str(i).zfill(2)}:00" for i in range(0, 24)],
                "data_format": "netcdf",
                "download_format": "unarchived",
                "area": [leftover_max_lat, leftover_min_lon, leftover_min_lat, leftover_max_lon],
            }
            api_calls.append((dataset, request))
        local_files = sorted(local_files)
        print("local files:", local_files)
        print("api:", api_calls)
        return local_files, api_calls

    def _gen_download_file_name(self):
        dt = datetime.now().strftime("%Y%m%d_%H%M%S")
        return f"download_{dt}.nc"

    def execute(self):

        # 1. check local data
        ds_list = []
        local_files, params = self._data_files_for_query()

        # 2. join local data files
        if local_files:
            for file in local_files:
                ds = xr.open_dataset(file, engine="netcdf4").sel(
                    valid_time=slice(self.dr.start_datetime, self.dr.end_datetime),
                    latitude=slice(self.dr.max_lat, self.dr.min_lat),
                    longitude=slice(self.dr.min_lon, self.dr.max_lon),
                )
                ds_list.append(ds)

        # 3. if local data cannot answer query, call APIs to download needed data
        if params:

            # TODO: make toml method an option to pass dict to driver.py
            # write_toml_config("request.toml", config_dict)
            # driver = RequestRemoteData.from_toml("request.toml")

            driver = RequestRemoteData.from_dict(params)
            result = driver.execute()
            
            if result.success:

                downloaded_files = result.files

        # 4. join downloaded files
                for file in downloaded_files:
                    ds = xr.open_dataset(file, engine="netcdf4")
                    # drop unused variables
                    # if "number" in ds.coords:
                    #     ds = ds.drop_vars("number")
                    # if "expver" in ds.coords:
                    #     ds = ds.drop_vars("expver")
                    ds = ds.sel(
                        valid_time=slice(self.dr.start_datetime, self.dr.end_datetime),
                        latitude=slice(self.dr.max_lat, self.dr.min_lat),
                        longitude=slice(self.dr.min_lon, self.dr.max_lon),
                    )
                    # temporal resample
                    if self.dr.temporal_resolution != "hour":
                        resampled = ds.resample(valid_time=time_resolution_to_freq(self.dr.temporal_resolution))
                        if self.dr.aggregation == "mean":
                            ds = resampled.mean()
                        elif self.dr.aggregation == "max":
                            ds = resampled.max()
                        elif self.dr.aggregation == "min":
                            ds = resampled.min()
                        else:
                            raise ValueError("Invalid temporal_aggregation")
                    # spatial resample
                    if self.dr.spatial_resolution > 0.25:
                        c_f = int(self.dr.spatial_resolution / 0.25)
                        coarsened = ds.coarsen(latitude=c_f, longitude=c_f, boundary="trim")
                        if self.dr.aggregation == "mean":
                            ds = coarsened.mean()
                        elif self.dr.aggregation == "max":
                            ds = coarsened.max()
                        elif self.dr.aggregation == "min":
                            ds = coarsened.min()
                        else:
                            raise ValueError("Invalid spatial_aggregation")
                    ds_list.append(ds)

            else:
                raise RuntimeError(result.error)

        # 5. assemble result

        # ds = xr.concat([i.chunk() for i in ds_list], dim="valid_time", join='outer')
        # compat="override" is a temporal walkaround as pre-aggregation value conflicts with downloaded data
        # future solution: use new encoding when write pre-aggregated data
        try:
            ds = xr.merge([i.chunk() for i in ds_list], compat="no_conflicts", join="outer")
        except ValueError:
            print("WARNING: conflict in merging data, use override")
            ds = xr.merge([i.chunk() for i in ds_list], compat="override", join="outer")

        return ds.compute()
