import traceback
import tomllib

from typing import Dict
from .models import RemoteRequestConfig, RemoteDownloadResult
from .era5 import ERA5Repository
from .carra import CARRARepository

class RequestRemoteData:
    def __init__(self, config: RemoteRequestConfig):
        self.config = config

    @classmethod
    def from_toml(cls, path:str):

        with open(path, "rb") as f:
            data = tomllib.load(f)
            
        config = RemoteRequestConfig(**data)

        return cls(config)
    
    @classmethod
    def from_dict(cls, data: Dict):

        config = RemoteRequestConfig(**data)

        return cls(config)
        
    def _get_repository(self):

        dataset = self.config.dataset.lower()

        if dataset == "era5":
            return ERA5Repository(self.config)
        
        if dataset == "carra":
            return CARRARepository(self.config)
        
        raise ValueError(f"Unsupported dataset: {dataset}")
    
    def execute(self) -> RemoteDownloadResult:

        try:
            repo = self._get_repository()
            files = repo.download()

            return RemoteDownloadResult(
                success = True,
                files = files,
                log = {
                    "dataset": self.config.dataset,
                    "files_downloaded": len(files),
                },
            )
        except Exception as e:
            
            return RemoteDownloadResult(
                success = False,
                error = str(e),
                log = {
                    "traceback": traceback.format_exc()
                }
            )