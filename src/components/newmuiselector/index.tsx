import { useState, useCallback, useRef } from 'react';
import { MenuItem, Typography, Box, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export interface LanguageOption {
  code: string;
  label: string;
  icon?: React.ReactNode;
}

export interface NewMuiLanguageSelectorProps {
  value?: LanguageOption;
  defaultValue?: LanguageOption;
  onChange?: (option: LanguageOption) => void;
  options?: LanguageOption[];
  placeholder?: string;
  triggerStyle?: React.CSSProperties;
  hideDelay?: number;
}

const defaultLanguages: LanguageOption[] = [
  { code: 'zh-CN', label: '中文' },
  { code: 'en-US', label: 'English' },
  { code: 'ja-JP', label: '日本語' },
  { code: 'ko-KR', label: '한국어' },
];

const NewMuiLanguageSelector = ({
  value,
  defaultValue = defaultLanguages[0],
  onChange,
  options = defaultLanguages,
  placeholder = '选择语言',
  triggerStyle,
  hideDelay = 50,
}: NewMuiLanguageSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<LanguageOption>(
    value || defaultValue
  );
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentValue = value !== undefined ? value : internalValue;

  const scheduleClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setOpen(false);
    }, hideDelay);
  }, [hideDelay]);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    cancelClose();
    setOpen(true);
  }, [cancelClose]);

  const handleMouseLeave = useCallback(() => {
    scheduleClose();
  }, [scheduleClose]);

  const handleSelect = useCallback((option?: LanguageOption) => {
    cancelClose();
    if (option) {
      if (value === undefined) {
        setInternalValue(option);
      }
      onChange?.(option);
    }
    setOpen(false);
  }, [value, onChange, cancelClose]);

  const preventEvent = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  return (
    <Box
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{ display: 'inline-block', position: 'relative' }}
    >
      <Box
        onClick={preventEvent}
        onMouseDown={preventEvent}
        onMouseUp={preventEvent}
        onTouchStart={preventEvent}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          borderRadius: '24px',
          backgroundColor: open ? '#f5f5f5' : 'transparent',
          padding: '8px 16px',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          userSelect: 'none',
          WebkitTapHighlightColor: 'transparent',
          pointerEvents: 'auto',
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
          ...triggerStyle,
        }}
      >
        <Typography
          sx={{
            fontSize: '15px',
            fontWeight: 500,
            color: '#333',
          }}
        >
          {currentValue?.label || placeholder}
        </Typography>
        {open ? (
          <ExpandLessIcon sx={{ fontSize: '18px', color: '#666' }} />
        ) : (
          <ExpandMoreIcon sx={{ fontSize: '18px', color: '#666' }} />
        )}
      </Box>

      {open && (
        <>
          <Box
            sx={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              height: '12px',
              zIndex: 1,
              pointerEvents: 'auto',
            }}
          />
          <Paper
            sx={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 0,
              borderRadius: '12px',
              minWidth: '140px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 2,
              py: 0,
              overflow: 'hidden',
            }}
            onClick={preventEvent}
            onMouseDown={preventEvent}
          >
            {options.map((option) => (
              <MenuItem
                key={option.code}
                onClick={() => handleSelect(option)}
                selected={currentValue?.code === option.code}
                sx={{
                  padding: '10px 16px',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
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
          </Paper>
        </>
      )}
    </Box>
  );
};

export default NewMuiLanguageSelector;