import type { ThemeConfig } from 'antd';

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1976d2',
    borderRadius: 8,
    fontSize: 14,
    colorBgContainer: '#ffffff',
    colorBorderSecondary: '#e8e8e8',
  },
  components: {
    Button: {
      algorithm: true,
    },
    Card: {
      borderRadiusLG: 12,
    },
    Menu: {
      colorBgContainer: '#ffffff',
    },
  },
};