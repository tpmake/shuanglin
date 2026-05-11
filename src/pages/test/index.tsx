import { useState } from 'react';
import { Box, Typography, Grid, Paper, Container, Button, CircularProgress, InputBase, IconButton } from '@mui/material';
import { Card, Statistic, Row, Col, Button as ANTButton } from 'antd';
import {
  TrendingUp,
  People,
  ShoppingCart,
  AttachMoney,
  Search
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Test = () => {
  const [loading, setLoading] = useState(false);

  const [isFocused, setIsFocused] = useState(false);

  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 2000);
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      console.log('搜索内容:', searchValue);
      // 在这里执行搜索逻辑
      alert(`搜索: ${searchValue}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        欢迎回家
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        这是一个基于 React + TypeScript + MUI + Ant Design 的管理系统
      </Typography>

      {/* 统计卡片 */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <Statistic
              title="总用户数"
              value={12680}
              prefix={<People />}
              valueStyle={{ color: '#1976d2' }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <Statistic
              title="销售额"
              value={98260}
              prefix="¥"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <Statistic
              title="订单数"
              value={3580}
              prefix={<ShoppingCart />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <Statistic
              title="增长率"
              value={23.5}
              suffix="%"
              prefix={<TrendingUp />}
              valueStyle={{ color: '#eb2f96' }}
            />
          </Card>
        </Grid>
      </Grid>

      {/* 内容区域 */}
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              },
            }}
          >
            <Typography variant="h6" gutterBottom>
              最近更新
            </Typography>
            <Typography variant="body2" color="text.secondary">
              这里可以展示最近的活动、通知或数据图表
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <Typography variant="h6" gutterBottom>
              快捷操作
            </Typography>
            <Typography variant="body2" color="text.secondary">
              放置常用功能入口
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '30px' }} gap={3}>
        <Button
          disabled={loading}
          onClick={handleSubmit}
          sx={{
            color: '#fff',
            fontSize: '16px',
            paddingLeft: '30px',
            paddingRight: '30px',
            backgroundColor: '#328bfe',
            borderRadius: '0px',
            '&:hover': {
              backgroundColor: '#6e6c6f',
            },
            '&.Mui-disabled': {
              backgroundColor: '#328bfe',
              color: '#fff',
              opacity: 0.8,
            },
          }}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {loading ? '提交中' : '提交'}
        </Button>

        <ANTButton loading={loading} style={{ height: '60px', paddingLeft: '30px', paddingRight: '30px' }}>提交</ANTButton>
      </Box>

      {/* 搜索框 */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 4,
        transition: 'all 0.3s ease',
      }}>
        <Paper
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: isFocused ? 500 : 300,
            height: '30px',
            borderRadius: 4,
            boxShadow: isFocused ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, fontSize: '12px' }}
            placeholder="搜索内容..."
            value={searchValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            inputProps={{ 'aria-label': 'search' }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search" disabled={!searchValue.trim()}>
            <Search />
          </IconButton>
        </Paper>
      </Box>

      {/* 显示搜索内容 */}
      {searchValue && (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            当前搜索: <strong>{searchValue}</strong>
          </Typography>
        </Box>
      )}

      <Button
        variant="text"  // 文本按钮，默认透明背景
        sx={{
          borderRadius: '24px',  // 圆角
          px: 3,  // 左右内边距
          py: 1,  // 上下内边距
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',  // 悬停灰色背景
          },
        }}
      >
        非标设备
      </Button>
    </Box>
  );
};

export default Test;