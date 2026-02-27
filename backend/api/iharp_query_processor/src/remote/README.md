# Handling Remote Data Requests

### Outline

1. A query calls `query_executor_get_raster.py` with the data it needs.
2. We check if the needed data is in local storage. If some subset of the data is in storage, we get the relevant file names.
3. If some subset of the data is missing, we:
    * Determine the range of data we need to download,
    * Call the `RequestRemoteData` driver to generate remote API requests, request and download the data, and return the downloaded file names.
4. Join all the relevant files into one dataset
5. Return the needed data.

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

### TODO
* standardize downloaded datasets before returning them to the `query_executor_get_raster.py` OR make query executor more general.
    * write function to turn lat/lon info into East or West domain for CARRA dataset
* add `dataset` parameter to `DataRange` class.
* allow multiple data regions/ranges to be needed for a query (so we do not have to just query one continuous region and time range).
* make toml method an option to pass dict to `driver.py`.
