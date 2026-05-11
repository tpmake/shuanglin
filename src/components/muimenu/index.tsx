import { useState } from 'react';
import { Box, Popover, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function MouseOverPopover() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    borderRadius: '24px',
          backgroundColor: 'transparent',
                    padding: '8px 20px',
                    cursor: 'pointerbm  ',
                    alignContent: 'center',
                    alignItems: 'center',
                              '&:hover': {
            backgroundColor: '#f5f5f5',
          },
                }}
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                <Typography
                    sx={{
                        fontSize: '15px',
                        fontWeight: 500,
                        color: '#333',
                        marginRight: '4px',
                    }}
                >
                    请选择
                </Typography>
                {open ? (
                    <ExpandLessIcon sx={{ fontSize: '18px', color: '#666' }} />
                ) : (
                    <ExpandMoreIcon sx={{ fontSize: '18px', color: '#666' }} />
                )}
            </Box>
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                PaperProps={{
                    sx: {
                        p: 1,
                    },
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography >I use Popover.</Typography>
            </Popover>
        </div>
    );
}
