import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { ConfigProvider } from 'antd';
import { muiTheme } from '../../theme/muiTheme';
import { antdTheme } from '../../theme/antdTheme';
import MuiLanguageSelector from '../muiselector';
import AntLanguageSelector from '../antselector';
import NewMuiLanguageSelector from '../newmuiselector';
import MouseOverPopover from '../muimenu';
import FullSelector from '../fullselector';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
} from '@mui/material';

// Ant Design Icons
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import {
  HomeOutlined,
  DashboardOutlined,
  BarChartOutlined,
  ShopOutlined,
  ApartmentOutlined
} from '@mui/icons-material';
import { InfoCircleOutlined } from '@ant-design/icons';

const drawerWidth = 240;

const menuItems = [
  {
    key: '/home',
    icon: <HomeOutlined />,
    label: '首页',
  },
  {
    key: '/chart',
    icon: <BarChartOutlined />,
    label: '数据',
  },
  {
    key: '/dashboard',
    icon: <DashboardOutlined />,
    label: '仪表盘',
  },
  {
    key: '/about',
    icon: <InfoCircleOutlined />,
    label: '关于',
  },
  {
    key: '/shop',
    icon: <ShopOutlined />,
    label: '商城',
  },
  {
    key: '/organization',
    icon: <ApartmentOutlined />,
    label: '组织',
  },
  {
    key: '/test',
    icon: <InfoCircleOutlined />,
    label: 'Test',
  },
];

const Layout = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [useMuiSelector, setUseMuiSelector] = useState(true);

  const [language, setLanguage] = useState<LanguageOption>({
    code: 'zh-CN',
    label: '中文'
  });

  const handleLanguageChange = (option: LanguageOption) => {
    console.log('选中的语言:', option);
    setLanguage(option);
    // 这里可以添加语言切换逻辑
  };

  const customOptions: LanguageOption[] = [
    { code: 'zh-CN', label: '简体中文' },
    { code: 'en-US', label: 'English' },
    { code: 'ja-JP', label: '日本語' },
  ];


  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  const [v1, setV1] = useState<LanguageOption>({
    code: '1',
    label: '选项1'
  });

  const handleV1Change = (option: LanguageOption) => {
    console.log('选中的语言:', option);
    setV1(option);
    // 这里可以添加语言切换逻辑
  };

  const v1Options: LanguageOption[] = [
    { code: '1', label: '选项1' },
    { code: '2', label: '选项2' },
    { code: '3', label: '选项3' },
  ];

  return (
    <ConfigProvider theme={antdTheme}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%', overflow: 'hidden' }}>
          {/* 顶部导航栏 */}
          <AppBar
            position="fixed"
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
              background: '#fff',
              color: '#333',
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
              width: '100%',
            }}
          >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <IconButton
                  color="inherit"
                  edge="start"
                  onClick={() => setDrawerOpen(!drawerOpen)}
                  sx={{ mr: 2 }}
                >
                  {drawerOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                  React + TypeScript 管理系统
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <FullSelector
                  label="产品"
                  options={[
                    { title: '3D CAD', description: '强大的三维建模和实时协同设计' },
                    { title: '3D一览通', description: '轻松查看、标记和评论CAD设计' },
                    // ...
                  ]}
                  onOptionClick={(option, index) => {
                    console.log('点击了选项:', option.title);
                    console.log('选项索引:', index);
                    console.log('完整数据:', option);
                    alert('点击了选项:' + option.title + '\n选项索引:' + index + '\n完整数据:', option)
                  }}
                />

                <FullSelector
                  label="产品"
                  imageComponent={
                    <img
                      src="https://inews.gtimg.com/om_bt/OUJW0nsyUo8680iQDFd69BAkjMWuTgiKfMep1vA83uFX0AA/1000"
                      alt="Product"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  }
                  onOptionClick={(option, index) => {
                    console.log('点击了选项:', option.title);
                    console.log('选项索引:', index);
                    console.log('完整数据:', option);
                    alert('点击了选项:' + option.title + '\n选项索引:' + index + '\n完整数据:', option)
                  }}
                />

                <FullSelector
                  label="行业方案"
                  width="90vw"
                />

                <NewMuiLanguageSelector value={v1}
                  onChange={handleV1Change}
                  options={v1Options} />

                <MuiLanguageSelector
                  value={language}
                  onChange={handleLanguageChange}
                  options={customOptions}
                />
                <MouseOverPopover />
              </Box>
            </Toolbar>
          </AppBar>

          <Box sx={{ display: 'flex', flex: 1, mt: 8, overflow: 'hidden' }}>
            {/* 侧边栏 */}
            <Drawer
              variant="permanent"
              sx={{
                width: drawerOpen ? drawerWidth : 0,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                  overflowX: 'hidden',
                  transition: 'width 0.3s',
                  borderRight: 'none',
                  boxShadow: 'none',
                  visibility: drawerOpen ? 'visible' : 'hidden',
                  height: 'calc(100vh - 64px)',
                  top: 64,
                },
              }}
              open={drawerOpen}
            >
              <Box sx={{ overflow: 'auto', pt: 2 }}>
                <List>
                  {menuItems.map((item) => (
                    <ListItem key={item.key} disablePadding>
                      <ListItemButton
                        selected={location.pathname === item.key}
                        onClick={() => handleMenuClick(item.key)}
                        sx={{
                          '&.Mui-selected': {
                            backgroundColor: 'rgba(238, 14, 96, 0.08)',
                            '&:hover': {
                              backgroundColor: 'rgba(238, 14, 96, 0.12)',
                            },
                          },
                        }}
                      >
                        <ListItemIcon sx={{ color: '#d21991ff' }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>

            {/* 主内容区 */}
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                backgroundColor: '#f5f5f5',
                overflow: 'auto',
                width: '100%',
                minWidth: 0,
              }}
            >
              <Outlet />
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </ConfigProvider>
  );
};

export default Layout;