"""
Integration tests for date trimming in API endpoints.
"""
from django.test import TestCase
from unittest.mock import patch, MagicMock
from api.views import format_datetime_string


class TestDateTrimmingIntegration(TestCase):
    
    def test_format_datetime_integration_day_resolution(self):
        """Test that format_datetime_string correctly trims dates for day resolution."""
        # Test data with day resolution
        start_datetime = '2023-01-15T14:30:45.000Z'  # Mid-day
        end_datetime = '2023-01-20T08:15:30.000Z'    # Morning
        temporal_resolution = 'day'
        
        # Format start and end dates
        formatted_start = format_datetime_string(start_datetime, temporal_resolution, is_start_date=True)
        formatted_end = format_datetime_string(end_datetime, temporal_resolution, is_start_date=False)
        
        # Start date should be trimmed to beginning of day
        self.assertEqual(formatted_start, '2023-01-15 00:00:00')
        # End date should be trimmed to end of day
        self.assertEqual(formatted_end, '2023-01-20 23:59:59')
        
    def test_format_datetime_integration_month_resolution(self):
        """Test that format_datetime_string correctly trims dates for month resolution."""
        # Test data with month resolution
        start_datetime = '2023-01-15T14:30:45.000Z'  # Mid-month
        end_datetime = '2023-03-20T08:15:30.000Z'    # Mid-month
        temporal_resolution = 'month'
        
        # Format start and end dates
        formatted_start = format_datetime_string(start_datetime, temporal_resolution, is_start_date=True)
        formatted_end = format_datetime_string(end_datetime, temporal_resolution, is_start_date=False)
        
        # Start date should be trimmed to beginning of month
        self.assertEqual(formatted_start, '2023-01-01 00:00:00')
        # End date should be trimmed to end of month
        self.assertEqual(formatted_end, '2023-03-31 23:59:59')
        
    def test_format_datetime_integration_year_resolution(self):
        """Test that format_datetime_string correctly trims dates for year resolution."""
        # Test data with year resolution
        start_datetime = '2023-06-15T14:30:45.000Z'  # Mid-year
        end_datetime = '2024-08-20T08:15:30.000Z'    # Mid-year
        temporal_resolution = 'year'
        
        # Format start and end dates
        formatted_start = format_datetime_string(start_datetime, temporal_resolution, is_start_date=True)
        formatted_end = format_datetime_string(end_datetime, temporal_resolution, is_start_date=False)
        
        # Start date should be trimmed to beginning of year
        self.assertEqual(formatted_start, '2023-01-01 00:00:00')
        # End date should be trimmed to end of year  
        self.assertEqual(formatted_end, '2024-12-31 23:59:59')
        
    def test_format_datetime_integration_hour_resolution(self):
        """Test that format_datetime_string does not trim dates for hour resolution."""
        # Test data with hour resolution
        start_datetime = '2023-01-15T14:30:45.000Z'
        end_datetime = '2023-01-20T08:15:30.000Z'
        temporal_resolution = 'hour'
        
        # Format start and end dates
        formatted_start = format_datetime_string(start_datetime, temporal_resolution, is_start_date=True)
        formatted_end = format_datetime_string(end_datetime, temporal_resolution, is_start_date=False)
        
        # Dates should preserve original precision for hour resolution
        self.assertEqual(formatted_start, '2023-01-15 14:30:45')
        self.assertEqual(formatted_end, '2023-01-20 08:15:30')
        
    def test_format_datetime_edge_cases(self):
        """Test edge cases for date trimming."""
        # Test leap year February
        start_datetime = '2024-02-15T14:30:45.000Z'  # 2024 is a leap year
        formatted_end = format_datetime_string(start_datetime, 'month', is_start_date=False)
        self.assertEqual(formatted_end, '2024-02-29 23:59:59')  # Should be 29th in leap year
        
        # Test non-leap year February
        start_datetime = '2023-02-15T14:30:45.000Z'  # 2023 is not a leap year
        formatted_end = format_datetime_string(start_datetime, 'month', is_start_date=False)
        self.assertEqual(formatted_end, '2023-02-28 23:59:59')  # Should be 28th in non-leap year
        
        # Test December (end of year) 
        start_datetime = '2023-12-15T14:30:45.000Z'
        formatted_end = format_datetime_string(start_datetime, 'month', is_start_date=False)
        self.assertEqual(formatted_end, '2023-12-31 23:59:59')
        
    def test_backward_compatibility(self):
        """Test that the old format_datetime_string behavior still works without temporal resolution."""
        datetime_input = '2023-01-15T14:30:45.000Z'
        
        # Without temporal resolution, should behave like the original function
        result = format_datetime_string(datetime_input)
        expected = '2023-01-15 14:30:45'
        self.assertEqual(result, expected)
        
        # With None temporal resolution, should also behave like the original function
        result = format_datetime_string(datetime_input, None, True)
        self.assertEqual(result, expected)