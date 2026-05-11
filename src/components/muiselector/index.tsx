import { useState } from 'react';
import { Button, Menu, MenuItem, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export interface LanguageOption {
  code: string;
  label: string;
  icon?: React.ReactNode;
}

export interface MuiLanguageSelectorProps {
  value?: LanguageOption;
  defaultValue?: LanguageOption;
  onChange?: (option: LanguageOption) => void;
  options?: LanguageOption[];
  placeholder?: string;
  buttonStyle?: React.CSSProperties;
}

const defaultLanguages: LanguageOption[] = [
  { code: 'zh-CN', label: '中文' },
  { code: 'en-US', label: 'English' },
  { code: 'ja-JP', label: '日本語' },
  { code: 'ko-KR', label: '한국어' },
];

const MuiLanguageSelector = ({
  value,
  defaultValue = defaultLanguages[0],
  onChange,
  options = defaultLanguages,
  placeholder = '选择语言',
  buttonStyle,
}: MuiLanguageSelectorProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [internalValue, setInternalValue] = useState<LanguageOption>(
    value || defaultValue
  );
  const open = Boolean(anchorEl);

  const currentValue = value !== undefined ? value : internalValue;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option?: LanguageOption) => {
    if (option) {
      if (value === undefined) {
        setInternalValue(option);
      }
      onChange?.(option);
    }
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        onClick={handleClick}
        sx={{
          borderRadius: '24px',
          backgroundColor: 'transparent',
          padding: '8px 20px',
          minWidth: 'auto',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
          ...buttonStyle,
        }}
      >
        <Typography
          sx={{
            fontSize: '15px',
            fontWeight: 500,
            color: '#333',
            marginRight: '4px',
          }}
        >
          {currentValue?.label || placeholder}
        </Typography>
        {open ? (
          <ExpandLessIcon sx={{ fontSize: '18px', color: '#666' }} />
        ) : (
          <ExpandMoreIcon sx={{ fontSize: '18px', color: '#666' }} />
        )}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            minWidth: '140px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            marginTop: '8px',
            '& .MuiMenuItem-root': {
              padding: '10px 16px',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            },
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.code}
            onClick={() => handleClose(option)}
            selected={currentValue?.code === option.code}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(238, 14, 96, 0.08)',
                '&:hover': {
                  backgroundColor: 'rgba(238, 14, 96, 0.12)',
                },
              },
            }}
          >
            {option.icon && (
              <Box sx={{ marginRight: '8px' }}>{option.icon}</Box>
            )}
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: currentValue?.code === option.code ? 600 : 400,
                color: currentValue?.code === option.code ? '#d21991ff' : '#333',
              }}
            >
              {option.label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default MuiLanguageSelector;