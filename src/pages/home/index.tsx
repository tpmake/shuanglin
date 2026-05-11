import { useState, useMemo } from 'react';
import { Box, Typography, Grid, Paper, Container, Button, CircularProgress, InputBase, IconButton } from '@mui/material';
import { Card, Statistic, Row, Col, Button as ANTButton, Table, Pagination, Space, Tag, Select, DatePicker, InputNumber, Row as AntRow, Col as AntCol, Input } from 'antd';
import type { TableColumnsType } from 'antd';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import 'dayjs/locale/zh-cn';

dayjs.extend(isBetween);
dayjs.locale('zh-cn');

import {
  TrendingUp,
  People,
  ShoppingCart,
  AttachMoney,
  Search,
  FilterList
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface DataType {
  key: string;
  date: string;
  name: string;
  address: string;
  size: string;
  amount: number;
  region: string;
}

interface FilterState {
  dateRange: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null;
  size: string | null;
  amountRange: [number | null, number | null] | null;
  searchKeyword: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
    width: 120,
    fixed: 'left',
    sorter: (a, b) => a.date.localeCompare(b.date),
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: 150,
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
    width: 200,
  },
  {
    title: '尺寸',
    dataIndex: 'size',
    key: 'size',
    width: 120,
    filters: [
      { text: '大号', value: '大号' },
      { text: '中号', value: '中号' },
      { text: '小号', value: '小号' },
      { text: '特大号', value: '特大号' },
    ],
    onFilter: (value, record) => record.size === value,
  },
  {
    title: '金额',
    dataIndex: 'amount',
    key: 'amount',
    width: 120,
    render: (value: number) => `¥${value.toLocaleString()}`,
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: '区域',
    dataIndex: 'region',
    key: 'region',
    width: 120,
    render: (text: string) => {
      const color = text === '华东' ? 'blue' : text === '华南' ? 'green' : text === '华北' ? 'orange' : 'default';
      return <Tag color={color}>{text}</Tag>;
    },
  },
  {
    title: '编辑',
    key: 'action',
    fixed: 'right',
    width: 120,
    render: (_: any, record: DataType) => (
      <Space size="small">
        <ANTButton type="link" size="small">
          编辑
        </ANTButton>
        <ANTButton type="link" size="small" danger>
          删除
        </ANTButton>
      </Space>
    ),
  },
];

const generateData = (): DataType[] => {
  const data: DataType[] = [];
  const names = ['产品A', '产品B', '产品C', '产品D', '产品E', '产品F', '产品G', '产品H'];
  const addresses = ['北京市朝阳区', '上海市浦东新区', '广州市天河区', '深圳市南山区', '杭州市西湖区', '成都市武侯区'];
  const sizes = ['大号', '中号', '小号', '特大号'];
  const regions = ['华东', '华南', '华北', '西南', '华中'];

  for (let i = 1; i <= 100; i++) {
    data.push({
      key: String(i),
      date: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      name: names[Math.floor(Math.random() * names.length)],
      address: addresses[Math.floor(Math.random() * addresses.length)],
      size: sizes[Math.floor(Math.random() * sizes.length)],
      amount: Math.floor(Math.random() * 10000) + 1000,
      region: regions[Math.floor(Math.random() * regions.length)],
    });
  }
  return data;
};

const Home = () => {
  const [data] = useState<DataType[]>(generateData());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState<FilterState>({
    dateRange: null,
    size: null,
    amountRange: null,
    searchKeyword: '',
  });

  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size) setPageSize(size);
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const itemDate = dayjs(item.date);
      
      if (filters.dateRange && filters.dateRange[0] && filters.dateRange[1]) {
        if (!itemDate.isBetween(filters.dateRange[0], filters.dateRange[1], 'day', '[]')) {
          return false;
        }
      }

      if (filters.size && item.size !== filters.size) {
        return false;
      }

      if (filters.amountRange && filters.amountRange[0] !== null && filters.amountRange[1] !== null) {
        if (item.amount < filters.amountRange[0] || item.amount > filters.amountRange[1]) {
          return false;
        }
      }

      if (filters.searchKeyword && filters.searchKeyword.trim()) {
        const keyword = filters.searchKeyword.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(keyword);
        const matchAddress = item.address.toLowerCase().includes(keyword);
        const matchRegion = item.region.toLowerCase().includes(keyword);
        if (!matchName && !matchAddress && !matchRegion) {
          return false;
        }
      }

      return true;
    });
  }, [data, filters]);

  const currentData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      dateRange: null,
      size: null,
      amountRange: null,
      searchKeyword: '',
    });
    setCurrentPage(1);
  };

  const hasActiveFilters = filters.dateRange || filters.size || filters.amountRange || filters.searchKeyword;

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Card
        bordered={false}
        sx={{
          width: '100%',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          '.ant-card-body': {
            padding: '16px',
          },
        }}
      >
        <Box sx={{ pb: 1.5 }}>
          <AntRow gutter={[10, 10]}>
            <AntCol xs={24} sm={12} md={6}>
              <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                关键词搜索
              </Typography>
              <Input
                placeholder="搜索名称、地址、区域..."
                prefix={<Search fontSize="small" />}
                allowClear
                value={filters.searchKeyword}
                onChange={(e) => handleFilterChange('searchKeyword', e.target.value)}
              />
            </AntCol>

            <AntCol xs={24} sm={12} md={6}>
              <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                日期范围
              </Typography>
              <DatePicker.RangePicker
                style={{ width: '100%' }}
                value={filters.dateRange}
                onChange={(dates) => handleFilterChange('dateRange', dates)}
                placeholder={['开始日期', '结束日期']}
              />
            </AntCol>

            <AntCol xs={24} sm={12} md={6}>
              <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                尺寸
              </Typography>
              <Select
                style={{ width: '100%' }}
                value={filters.size}
                onChange={(value) => handleFilterChange('size', value)}
                placeholder="选择尺寸"
                allowClear
                options={[
                  { label: '大号', value: '大号' },
                  { label: '中号', value: '中号' },
                  { label: '小号', value: '小号' },
                  { label: '特大号', value: '特大号' },
                ]}
              />
            </AntCol>

            <AntCol xs={24} sm={12} md={6}>
              <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                金额范围
              </Typography>
              <AntRow gutter={8}>
                <AntCol span={11}>
                  <InputNumber
                    style={{ width: '100%' }}
                    value={filters.amountRange?.[0] || null}
                    onChange={(value) =>
                      handleFilterChange('amountRange', [
                        value,
                        filters.amountRange?.[1] || null,
                      ])
                    }
                    placeholder="最小值"
                    min={0}
                    prefix="¥"
                  />
                </AntCol>
                <AntCol span={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  -
                </AntCol>
                <AntCol span={11}>
                  <InputNumber
                    style={{ width: '100%' }}
                    value={filters.amountRange?.[1] || null}
                    onChange={(value) =>
                      handleFilterChange('amountRange', [
                        filters.amountRange?.[0] || null,
                        value,
                      ])
                    }
                    placeholder="最大值"
                    min={0}
                    prefix="¥"
                  />
                </AntCol>
              </AntRow>
            </AntCol>

            <AntCol xs={24} sm={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', height: '100%', pt: 0.5 }}>
                <Space>
                  <ANTButton
                    type="primary"
                    icon={<FilterList />}
                    onClick={() => {
                    }}
                    disabled={!hasActiveFilters}
                  >
                    筛选
                  </ANTButton>
                  <ANTButton
                    onClick={handleResetFilters}
                    disabled={!hasActiveFilters}
                  >
                    重置
                  </ANTButton>
                </Space>
              </Box>
            </AntCol>
          </AntRow>
        </Box>

        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <Table
            columns={columns}
            dataSource={currentData}
            pagination={false}
            size="middle"
            scroll={{ x: 'max-content' }}
            bordered
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pt: 3,
            pb: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              共 {filteredData.length} 条记录
            </Typography>
            {hasActiveFilters && (
              <Tag color="blue" style={{ ml: 2 }}>
                已筛选
              </Tag>
            )}
          </Box>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredData.length}
            onChange={handlePageChange}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `共 ${total} 条`}
            pageSizeOptions={['10', '20', '50', '100']}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default Home;