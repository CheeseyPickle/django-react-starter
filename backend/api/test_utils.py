"""
Tests for date trimming utility functions.
"""
from django.test import TestCase
from api.utils import trim_datetime_for_temporal_resolution, format_datetime_string


class TestDateTrimmingUtils(TestCase):
    
    def test_trim_datetime_hour_resolution(self):
        """Test that hour resolution doesn't trim dates."""
        dt_input = "2023-01-15T14:30:45Z"
        
        # For hour resolution, no trimming should occur
        result_start = trim_datetime_for_temporal_resolution(dt_input, 'hour', True)
        result_end = trim_datetime_for_temporal_resolution(dt_input, 'hour', False)
        
        expected = "2023-01-15 14:30:45"
        self.assertEqual(result_start, expected)
        self.assertEqual(result_end, expected)
    
    def test_trim_datetime_day_resolution(self):
        """Test day resolution trimming."""
        dt_input = "2023-01-15T14:30:45Z"
        
        # Start date should trim to beginning of day
        result_start = trim_datetime_for_temporal_resolution(dt_input, 'day', True)
        self.assertEqual(result_start, "2023-01-15 00:00:00")
        
        # End date should trim to end of day  
        result_end = trim_datetime_for_temporal_resolution(dt_input, 'day', False)
        self.assertEqual(result_end, "2023-01-15 23:59:59")
    
    def test_trim_datetime_month_resolution(self):
        """Test month resolution trimming."""
        dt_input = "2023-01-15T14:30:45Z"
        
        # Start date should trim to beginning of month
        result_start = trim_datetime_for_temporal_resolution(dt_input, 'month', True)
        self.assertEqual(result_start, "2023-01-01 00:00:00")
        
        # End date should trim to end of month
        result_end = trim_datetime_for_temporal_resolution(dt_input, 'month', False)
        self.assertEqual(result_end, "2023-01-31 23:59:59")
    
    def test_trim_datetime_year_resolution(self):
        """Test year resolution trimming."""
        dt_input = "2023-06-15T14:30:45Z"
        
        # Start date should trim to beginning of year
        result_start = trim_datetime_for_temporal_resolution(dt_input, 'year', True)
        self.assertEqual(result_start, "2023-01-01 00:00:00")
        
        # End date should trim to end of year
        result_end = trim_datetime_for_temporal_resolution(dt_input, 'year', False)
        self.assertEqual(result_end, "2023-12-31 23:59:59")
    
    def test_trim_datetime_leap_year(self):
        """Test month trimming in leap year."""
        dt_input = "2024-02-15T14:30:45Z"  # 2024 is a leap year
        
        # End of February in leap year should be 29th
        result_end = trim_datetime_for_temporal_resolution(dt_input, 'month', False)
        self.assertEqual(result_end, "2024-02-29 23:59:59")
    
    def test_trim_datetime_invalid_resolution(self):
        """Test that invalid temporal resolution raises ValueError."""
        dt_input = "2023-01-15T14:30:45Z"
        
        with self.assertRaises(ValueError):
            trim_datetime_for_temporal_resolution(dt_input, 'invalid', True)
    
    def test_format_datetime_string_with_trimming(self):
        """Test format_datetime_string with temporal resolution."""
        dt_input = "2023-01-15T14:30:45.000Z"
        
        # Test day resolution with trimming
        result_start = format_datetime_string(dt_input, 'day', True)
        self.assertEqual(result_start, "2023-01-15 00:00:00")
        
        result_end = format_datetime_string(dt_input, 'day', False)
        self.assertEqual(result_end, "2023-01-15 23:59:59")
        
        # Test month resolution with trimming
        result_start = format_datetime_string(dt_input, 'month', True)
        self.assertEqual(result_start, "2023-01-01 00:00:00")
        
        result_end = format_datetime_string(dt_input, 'month', False)
        self.assertEqual(result_end, "2023-01-31 23:59:59")
    
    def test_format_datetime_string_without_trimming(self):
        """Test format_datetime_string without temporal resolution (original behavior)."""
        dt_input = "2023-01-15T14:30:45.000Z"
        
        # Without temporal resolution, should behave like original function
        result = format_datetime_string(dt_input)
        self.assertEqual(result, "2023-01-15 14:30:45")
        
        # With hour resolution, should also behave like original function
        result = format_datetime_string(dt_input, 'hour', True)
        self.assertEqual(result, "2023-01-15 14:30:45")
    
    def test_edge_cases(self):
        """Test edge cases like end of year, different months."""
        # Test December (end of year)
        dt_input = "2023-12-15T14:30:45Z"
        result_end = trim_datetime_for_temporal_resolution(dt_input, 'month', False)
        self.assertEqual(result_end, "2023-12-31 23:59:59")
        
        # Test February non-leap year
        dt_input = "2023-02-15T14:30:45Z"
        result_end = trim_datetime_for_temporal_resolution(dt_input, 'month', False)
        self.assertEqual(result_end, "2023-02-28 23:59:59")
        
        # Test year boundary
        dt_input = "2023-12-31T23:30:45Z"
        result_start = trim_datetime_for_temporal_resolution(dt_input, 'year', True)
        self.assertEqual(result_start, "2023-01-01 00:00:00")
        result_end = trim_datetime_for_temporal_resolution(dt_input, 'year', False)
        self.assertEqual(result_end, "2023-12-31 23:59:59")