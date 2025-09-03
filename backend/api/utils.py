"""
Utility functions for date handling and temporal resolution processing.
"""
import pandas as pd
from django.utils.dateparse import parse_datetime
from django.utils.timezone import make_naive


def trim_datetime_for_temporal_resolution(dt_input, temporal_resolution, is_start_date=True):
    """
    Trim datetime to align with temporal resolution boundaries.
    
    For temporal resolution of:
    - 'day': Trim to start/end of day (00:00:00 or 23:59:59)
    - 'month': Trim to start/end of month (1st day 00:00:00 or last day 23:59:59)  
    - 'year': Trim to start/end of year (Jan 1st 00:00:00 or Dec 31st 23:59:59)
    - 'hour': No trimming needed
    
    Args:
        dt_input: Input datetime string or datetime object
        temporal_resolution: One of 'hour', 'day', 'month', 'year'
        is_start_date: If True, trim to period start; if False, trim to period end
        
    Returns:
        Formatted datetime string in 'YYYY-MM-DD HH:MM:SS' format
    """
    # Parse input datetime
    if isinstance(dt_input, str):
        dt = parse_datetime(dt_input)
        if dt and dt.tzinfo is not None:
            dt = make_naive(dt)
    else:
        dt = dt_input
        
    if dt is None:
        return None
    
    # Convert to pandas Timestamp for easier manipulation
    pd_dt = pd.Timestamp(dt)
    
    if temporal_resolution == 'hour':
        # For hourly resolution, no trimming needed
        result_dt = pd_dt
    elif temporal_resolution == 'day':
        if is_start_date:
            # Trim to start of day (00:00:00)
            result_dt = pd_dt.floor('D')
        else:
            # Trim to end of day (23:59:59) 
            result_dt = pd_dt.ceil('D') - pd.Timedelta(seconds=1)
    elif temporal_resolution == 'month':
        if is_start_date:
            # Trim to start of month (1st day, 00:00:00)
            result_dt = pd_dt.to_period('M').start_time
        else:
            # Trim to end of month (last day, 23:59:59)
            result_dt = pd_dt.to_period('M').end_time
    elif temporal_resolution == 'year':
        if is_start_date:
            # Trim to start of year (Jan 1st, 00:00:00)
            result_dt = pd_dt.to_period('Y').start_time
        else:
            # Trim to end of year (Dec 31st, 23:59:59)  
            result_dt = pd_dt.to_period('Y').end_time
    else:
        raise ValueError(f"Invalid temporal_resolution: {temporal_resolution}")
    
    return result_dt.strftime("%Y-%m-%d %H:%M:%S")


def format_datetime_string(dt_input, temporal_resolution=None, is_start_date=True):
    """
    Convert input datetime with optional trimming based on temporal resolution.
    
    Args:
        dt_input: Input datetime string (e.g., '2023-01-01T00:00:00.000Z')
        temporal_resolution: Optional temporal resolution for trimming
        is_start_date: If True and trimming, trim to period start; else period end
        
    Returns:
        Formatted datetime string in 'YYYY-MM-DD HH:MM:SS' format
    """
    if temporal_resolution and temporal_resolution != 'hour':
        return trim_datetime_for_temporal_resolution(dt_input, temporal_resolution, is_start_date)
    
    # Original behavior for hour resolution or no trimming
    dt = parse_datetime(dt_input)
    if dt and dt.tzinfo is not None:
        dt = make_naive(dt)
    dt_formatted = dt.strftime("%Y-%m-%d %H:%M:%S") if dt else None
    return dt_formatted