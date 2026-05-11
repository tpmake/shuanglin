import { useState, useCallback, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  IconButton,
  Grid
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export interface DropdownOption {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface FullSelectorProps {
  label?: string;
  options?: DropdownOption[];
  imageComponent?: React.ReactNode;
  width?: string | number;
  triggerStyle?: React.CSSProperties;
  onOptionClick?: (option: DropdownOption, index: number) => void;
}

const defaultOptions: DropdownOption[] = [
  {
    title: '3D CAD',
    description: '强大的三维建模和实时协同设计',
  },
  {
    title: '3D一览通',
    description: '轻松查看、标记和评论CAD设计',
  },
  {
    title: '产品研发管理',
    description: '统一管理产品相关的数据、过程与变更',
  },
  {
    title: '3D工艺大师',
    description: '制作高质量的图像、动画和交互式内容',
  },
  {
    title: '几何搜索',
    description: '3D数据分类、模型搜索、模型对比',
  },
  {
    title: '3D培训大师',
    description: '快速制作标准化3D课件，实现线上培训',
  },
];

const FullSelector = ({
  label = '产品',
  options = defaultOptions,
  imageComponent,
  width = '80vw',
  triggerStyle,
  onOptionClick,
}: FullSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const scheduleClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setOpen(false);
      setHoveredIndex(null);
    }, 100);
  }, []);

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

  const handleItemClick = useCallback((option: DropdownOption, index: number) => {
    if (onOptionClick) {
      onOptionClick(option, index);
    }
    setOpen(false);
    setHoveredIndex(null);
  }, [onOptionClick]);

  const preventEvent = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <Box
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{ 
        display: 'inline-block', 
        position: 'relative',
      }}
    >
      {/* 触发器 */}
      <Box
        ref={triggerRef}
        onClick={preventEvent}
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
          {label}
        </Typography>
        {open ? (
          <ExpandLessIcon sx={{ fontSize: '18px', color: '#666' }} />
        ) : (
          <ExpandMoreIcon sx={{ fontSize: '18px', color: '#666' }} />
        )}
      </Box>

      {/* 下拉面板 */}
      {open && (
        <>
          {/* 透明桥梁，防止鼠标移动到面板时中断 */}
          <Box
            sx={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              height: '20px',
              zIndex: 1,
              pointerEvents: 'auto',
            }}
          />
          
          {/* 下拉内容 */}
          <Paper
            sx={{
              position: 'fixed',
              top: 'auto',
              left: '50%',
              transform: 'translateX(-50%)',
              mt: 2,
              width: {
                xs: 'calc(100vw - 32px)',
                sm: 'calc(100vw - 64px)',
                md: 'calc(100vw - 100px)',
              },
              maxWidth: '1200px',
              maxHeight: 'calc(100vh - 100px)',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              zIndex: 1300,
              p: {
                xs: 2,
                md: 4,
              },
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                },
              },
            }}
            onClick={preventEvent}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 4,
              }}
            >
              {/* 选项列表区域 */}
              <Box
                sx={{
                  flex: 1,
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: '1fr 1fr',
                    md: imageComponent ? '1fr 1fr 1fr' : '1fr 1fr 1fr 1fr',
                  },
                  gap: 3,
                  alignContent: 'start',
                }}
              >
                {options.map((option, index) => (
                  <Box
                    key={index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => handleItemClick(option, index)}
                    sx={{
                      p: 2.5,
                      borderRadius: 2,
                      cursor: 'pointer',
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                      backgroundColor: hoveredIndex === index ? 'rgba(102, 126, 234, 0.08)' : 'transparent',
                      border: '1px solid',
                      borderColor: hoveredIndex === index ? 'rgba(102, 126, 234, 0.2)' : 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(102, 126, 234, 0.08)',
                        borderColor: 'rgba(102, 126, 234, 0.2)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
                      },
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        fontSize: '16px',
                        color: hoveredIndex === index ? '#667eea' : '#1a1a1a',
                        mb: 1,
                        transition: 'color 0.25s',
                        lineHeight: 1.4,
                      }}
                    >
                      {option.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.7,
                        fontSize: '14px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {option.description}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* 右侧图片展示 */}
              {imageComponent && (
                <Box
                  sx={{
                    flex: '0 0 300px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    borderRadius: 3,
                    backgroundColor: '#f8f9fa',
                    p: 3,
                    border: '1px solid',
                    borderColor: '#e9ecef',
                    maxHeight: '320px',
                    overflow: 'auto',
                    '&::-webkit-scrollbar': {
                      width: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                      backgroundColor: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                      borderRadius: '3px',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    {imageComponent}
                  </Box>
                </Box>
              )}
            </Box>

          </Paper>
        </>
      )}
    </Box>
  );
};

export default FullSelector;