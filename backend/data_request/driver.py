import datetime
import traceback
import cdsapi
import tomllib

class RequestRemoteData:
    def __init__(self, config_path: str):
        self.config_path = config_path
        self.log_info = {}

    def execute(self):
        try:
            with open(self.config_path, "rb") as f:
                config = tomllib.load(f)

            dataset = config["dataset"]

            if dataset == "era5":
                repo = ERA5Data(config)

            elif dataset == "carra":
                repo = CARRAData(config)
            
            else: 
                raise ValueError(f"Unsupported dataset: {dataset}")

            file_list = repo.download_data()

            self.log_info = {
                "status": "success",
                "dataset": dataset,
                "files": file_list,
                "message": f"Downloaded {len(file_list)} file(s)"
            }

            return {
                "success": True,
                "files": file_list,
                "log": self.log_info
            }

        except Exception as e:
            error_msg = traceback.format_exec()

            self.log_info = {
                "status": "error",
                "message": str(e),
                "traceback": error_msg
            }

        return file_list


class ERA5Data:
    def __init__(self, params: dict):
        self.params = params

    def _gen_download_file_name(self):
        dt = datetime.now().strftime("%Y%m%d_%H%M%S")
        return f"download_{dt}.nc"

    def gen_api_calls(self):

        request = {
            "product_type": ["reanalysis"],
            "variable": [self.params["variable"]],
            "year": self.params["years"],
            "month": self.params["months"],
            "day": self.params["days"],
            "time": [f"{str(i).zfill(2)}:00" for i in range(0, 24)],
            "data_format": "netcdf",
            "download_format": "unarchived",
            "area": [
                self.params["max_lat"],
                self.params["min_lon"],
                self.params["min_lat"],
                self.params["max_lon"],
            ],
        }
        return [("reanalysis-era5-single-levels", request)]

    def download_data(self):

        api_calls = self.gen_api_calls()
        c = cdsapi.Client()
        files = []

        for dataset, request in api_calls:
            fname = self._gen_download_file_name()
            c.retrieve(dataset, request).download(fname)
            files.append(fname)
        
        return files


class CARRAData:
    def __init__(self, params: dict):
        self.params = params

    def _gen_download_file_name(self):
        dt = datetime.now().strftime("%Y%m%d_%H%M%S")
        return f"download_{dt}.nc"

    def gen_api_calls(self):

        request = {
            "domain":self.params["domain"],
            "product_type": ["reanalysis"],
            "variable": [self.params["variable"]],
            "height_level": [self.params["height_level"]],
            "year": self.params["years"],
            "month": self.params["months"],
            "day": self.params["days"],
            "time": [f"{str(i).zfill(2)}:00" for i in range(0, 24)],
            "data_format": "netcdf",
        }
        return [("reanalysis-carra-height-levels", request)]

    def download_data(self):

        api_calls = self.gen_api_calls()
        c = cdsapi.Client()
        files = []

        for dataset, request in api_calls:
            fname = self._gen_download_file_name()
            c.retrieve(dataset, request).download(fname)
            files.append(fname)
        
        return files