import datetime
import cdsapi

from typing import List
from .base import RemoteRepository

class CARRARepository(RemoteRepository):

    DATASET = "reanalysis-carra-height-levels"

    def _gen_filename(self):

        ts = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")

        return f"carra_{ts}.nc"
    
    # TODO: write function to turn lat/lon info into East or West domain
    
    def _build_request(self):

        cfg = self.config

        return {
            "domain": cfg.domain,
            "product_type": ["reanalysis"],
            "variable": [cfg.variable],
            "height_level": [cfg.height_level],
            "year": cfg.years,
            "month": cfg.months,
            "day": cfg.days,
            "time": [f"{i:02d}" for i in range(24)],
            "data_format": "netcdf",
        }
    
    def download(self) ->List[str]:

        client = cdsapi.Client()
        request = self._build_request()
        fname = self._gen_filename()
        client.retrieve(self.DATASET, request).download(fname)

        return[fname]
    