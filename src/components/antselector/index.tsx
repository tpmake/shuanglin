// src/components/LanguageSelector/AntLanguageSelector.tsx
import { useState } from 'react';
import { Button, Dropdown, Space, Typography } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

interface LanguageOption {
  code: string;
  label: string;
}

const languages: LanguageOption[] = [
  { code: 'zh-CN', label: '中文' },
  { code: 'en-US', label: 'English' },
  { code: 'ja-JP', label: '日本語' },
  { code: 'ko-KR', label: '한국어' },
];

const AntLanguageSelector = () => {
  const [currentLang, setCurrentLang] = useState<LanguageOption>(languages[0]);

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    const selectedLang = languages.find((lang) => lang.code === key);
    if (selectedLang) {
      setCurrentLang(selectedLang);
      console.log('切换语言:', selectedLang.label);
      // 这里可以添加语言切换逻辑
    }
  };

  const menuItems: MenuProps['items'] = languages.map((lang) => ({
    key: lang.code,
    label: (
      <Typography.Text
        style={{
          fontSize: '14px',
          fontWeight: currentLang.code === lang.code ? 600 : 400,
          color: currentLang.code === lang.code ? '#d21991ff' : '#333',
        }}
      >
        {lang.label}
      </Typography.Text>
    ),
  }));

  return (
    <Dropdown
      menu={{ items: menuItems, onClick: handleMenuClick }}
      placement="bottomRight"
      trigger={['click']}
      dropdownRender={(menu) => (
        <div
          style={{
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            overflow: 'hidden',
          }}
        >
          {menu}
        </div>
      )}
    >
      <Button
        style={{
          borderRadius: '24px',
          backgroundColor: '#f5f5f5',
          border: 'none',
          padding: '8px 20px',
          height: 'auto',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Space size={4}>
          <Typography.Text
            style={{
              fontSize: '15px',
              fontWeight: 500,
              color: '#333',
            }}
          >
            {currentLang.label}
          </Typography.Text>
          <DownOutlined style={{ fontSize: '12px', color: '#666' }} />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default AntLanguageSelector;