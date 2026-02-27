import datetime
import cdsapi
import tomllib

# repository classes



class RequestRemoteData():
    def __init__(
            self,
            log_info=None,
    ):
        fpath:str
        self.log_info = log_info if log_info is not None else []

    def execute(self):
        
        with open(self.fpath, "rb") as f:
            config = tomllib.load(f)

            dataset = config["dataset"]

            if dataset == "era5":
                repo = ERA5Data(config)


            elif dataset == "carra":
                repo = CARRAData(config)
                
            # else:
            #     repo = None
            #     file_list = []
            #     p_out = f"Query includes data from {dataset} dataset that is not in local storage and downloading it is not currently supported."

            file_list, p_out = repo.download_data()

            self.log_info = {
                f"api: {p_out}"
            }

        return file_list


class ERA5Data():
    def __init__(
            self,
            params,):
        
        dr=params

    def _gen_download_file_name(self):
        dt = datetime.now().strftime("%Y%m%d_%H%M%S")
        return f"download_{dt}.nc"

    def gen_api_calls(self):

        api_calls = []
        dataset = "reanalysis-era5-single-levels"
        request = {
            "product_type": ["reanalysis"],
            "variable": [self.dr.variable],
            "year": [self.dr.years],
            "month": [self.dr.months],
            "day": [self.dr.days],
            "time": [f"{str(i).zfill(2)}:00" for i in range(0, 24)],
            "data_format": "netcdf",
            "download_format": "unarchived",
            "area": [self.dr.max_lat, self.dr.min_lon, self.dr.min_lat, self.dr.max_lon],
        }
        api_calls.append((dataset, request))

        return api_calls

    def download_data(self):
        api_calls = self.gen_api_calls()

        download_file_list = []
        c = cdsapi.Client()
        for dataset, request in api_calls:
            file_name = self._gen_download_file_name()
            c.retrieve(dataset, request).download(file_name)
            download_file_list.append(file_name)
        
        return download_file_list


class CARRAData():
    def __init__(
            self,
            params,):
        
        dr=params

    def _gen_download_file_name(self):
        dt = datetime.now().strftime("%Y%m%d_%H%M%S")
        return f"download_{dt}.nc"

    def gen_api_calls(self):

        api_calls = []
        dataset = "reanalysis-carra-height-levels"
        request = {
            "domain":self.dr.domain,
            "product_type": ["reanalysis"],
            "variable": [self.dr.variable],
            "height_level": [self.dr.height_level],
            "year": [self.dr.years],
            "month": [self.dr.months],
            "day": [self.dr.days],
            "time": [f"{str(i).zfill(2)}:00" for i in range(0, 24)],
            "data_format": "netcdf",
        }
        api_calls.append((dataset, request))

        return api_calls

    def download_data(self):
        api_calls = self.gen_api_calls()

        download_file_list = []
        c = cdsapi.Client()
        for dataset, request in api_calls:
            file_name = self._gen_download_file_name()
            c.retrieve(dataset, request).download(file_name)
            download_file_list.append(file_name)
        
        return download_file_list