import { Box, Typography, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';

const TemporalResolutionInfo = ({ temporalResolution }) => {
    const getInfoText = (resolution) => {
        switch (resolution) {
            case 'hour':
                return 'Exact date/time precision will be used.';
            case 'day':
                return 'Dates will be expanded to full days (00:00 to 23:59).';
            case 'month':
                return 'Dates will be expanded to full months (1st to last day).';
            case 'year':
                return 'Dates will be expanded to full years (Jan 1st to Dec 31st).';
            default:
                return '';
        }
    };

    const infoText = getInfoText(temporalResolution);
    
    if (!infoText) return null;

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 0.5, 
                marginTop: 1,
                marginBottom: 1
            }}
        >
            <Tooltip title="Date Range Behavior">
                <span style={{ fontSize: '16px', color: '#1976d2' }}>ℹ️</span>
            </Tooltip>
            <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{ fontSize: '0.75rem' }}
            >
                {infoText}
            </Typography>
        </Box>
    );
};

TemporalResolutionInfo.propTypes = {
    temporalResolution: PropTypes.string
};

export default TemporalResolutionInfo;