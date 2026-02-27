# Remote Data Requests

### Outline

- The `~/django-react-starter/backend/api/iharp_query_processor/src/query_executor_get_raster.py` checks if the storage has all the data requested in the current query

- If (requested data - storage data) has leftovers, we need to request the remote repository for it. `query_executor_get_raster.py` finds the start and end {year, month, day} we need to ask for, and the `dr` class has information about the variable and dataset we want.

- for each separate continuous region and time range, `query_executor_get_raster.py` will initialize an instance of the main remote data request driver `~/django-react-starter/backend/api/iharp_query_processor/src/remote/driver.py`

- The driver will take in this information about the data, and call the necessary repository class to generate and handle the requests.

- After the repository class returns confirmation that the data was downloaded successfully, the main driver will
    - send the information to the query processor to begin the aggregation for the current query OR
    - aggregate the data for the current query, then continue to aggregate to keep the data OR
    - whatever we decide to do with the data

### Description of remote directory files

        src/
        ├──...
        ├── query_executor_get_raster.py
        │
        ├── remote/
        │   ├── driver.py
        │   ├── models.py
        │   ├── base.py
        │   ├── era5.py
        │   ├── carra.py
        │

* **`models.py`** defines request and result objects
* **`base.py`** is the repository interface
* **dataset python files** generate API requests for the specific dataset
    * `era5.py`
    * `carra.py`
* **`driver.py`** handles the request, calls correct repository to download data (supports dict and toml input)

### How to add a new dataset
1. Create a python file for the dataset `newdataset.py`
2. Register the dataset in the driver (`driver.py`) by 

    * adding `from .newdataset import NewDatasetRepository` to the imports 
    * the following code to the `_get_repository` function:

            if dataset == "newdataset":
                return NewDataset(self.config)
