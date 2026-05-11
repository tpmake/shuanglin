import { useState } from 'react';
import { Box, Typography, Tabs, Tab, Select, MenuItem, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, IconButton, Tooltip } from '@mui/material';
import { ExpandMore, ExpandLess, InfoOutlined, Download } from '@mui/icons-material';

interface DepartmentData {
  key: string;
  name: string;
  aprilDemand: number;
  year2024Vacancy: number;
  onJob: number;
  inTransit: number;
  eoffer: number;
  promotion: number;
  活水: number;
  internTransfer: number;
  recruitedOffer: number;
  monthBudget: number;
  yearBudget: number;
  children?: DepartmentData[];
}

const mockData: DepartmentData[] = [
  {
    key: '1',
    name: '中心直接编制',
    aprilDemand: 55,
    year2024Vacancy: 55,
    onJob: 0,
    inTransit: 0,
    eoffer: 0,
    promotion: 55,
    活水: 55,
    internTransfer: 55,
    recruitedOffer: 55,
    monthBudget: 55,
    yearBudget: 55,
    children: [
      {
        key: '1-1',
        name: '财务核算部',
        aprilDemand: 55,
        year2024Vacancy: 55,
        onJob: 0,
        inTransit: 0,
        eoffer: 0,
        promotion: 55,
        活水: 55,
        internTransfer: 55,
        recruitedOffer: 55,
        monthBudget: 55,
        yearBudget: 55,
        children: [
          {
            key: '1-1-1',
            name: '财务管理部',
            aprilDemand: 55,
            year2024Vacancy: 55,
            onJob: 0,
            inTransit: 0,
            eoffer: 0,
            promotion: 55,
            活水: 55,
            internTransfer: 55,
            recruitedOffer: 55,
            monthBudget: 55,
            yearBudget: 55,
          },
          {
            key: '1-1-2',
            name: '核算管理部',
            aprilDemand: 55,
            year2024Vacancy: 55,
            onJob: 0,
            inTransit: 0,
            eoffer: 0,
            promotion: 55,
            活水: 55,
            internTransfer: 55,
            recruitedOffer: 55,
            monthBudget: 55,
            yearBudget: 55,
          },
          {
            key: '1-1-3',
            name: '财务运营部',
            aprilDemand: 55,
            year2024Vacancy: 55,
            onJob: 0,
            inTransit: 0,
            eoffer: 0,
            promotion: 55,
            活水: 55,
            internTransfer: 55,
            recruitedOffer: 55,
            monthBudget: 55,
            yearBudget: 55,
          },
        ],
      },
      {
        key: '1-2',
        name: '财务信息部',
        aprilDemand: 55,
        year2024Vacancy: 55,
        onJob: 0,
        inTransit: 0,
        eoffer: 0,
        promotion: 55,
        活水: 55,
        internTransfer: 55,
        recruitedOffer: 55,
        monthBudget: 55,
        yearBudget: 55,
      },
      {
        key: '1-3',
        name: '资产管理部',
        aprilDemand: 55,
        year2024Vacancy: 55,
        onJob: 0,
        inTransit: 0,
        eoffer: 0,
        promotion: 55,
        活水: 55,
        internTransfer: 55,
        recruitedOffer: 55,
        monthBudget: 55,
        yearBudget: 55,
      },
    ],
  },
];

const Organization = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set(['1']));
  const [filters, setFilters] = useState({
    department: '',
    budgetCenter: '',
    position: '',
    year: '2024',
    employeeType: '正式员工',
    workLocation: '',
    budgetType: '',
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const toggleRow = (key: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedRows(newExpanded);
  };

  const renderRow = (record: DepartmentData, level: number = 0) => {
    const isExpanded = expandedRows.has(record.key);
    const hasChildren = record.children && record.children.length > 0;

    return (
      <>
        <TableRow
          key={record.key}
          sx={{
            '&:hover': { backgroundColor: '#f5f5f5' },
            backgroundColor: level === 0 ? '#fafafa' : 'inherit',
          }}
        >
          <TableCell sx={{ pl: level * 3 + 2, fontWeight: level === 0 ? 600 : 400 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {hasChildren && (
                <IconButton size="small" onClick={() => toggleRow(record.key)} sx={{ mr: 0.5 }}>
                  {isExpanded ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              )}
              {!hasChildren && <Box sx={{ width: 32 }} />}
              <Typography variant="body2" sx={{ fontWeight: 'inherit' }}>{record.name}</Typography>
            </Box>
          </TableCell>
          <TableCell align="center">{record.aprilDemand}</TableCell>
          <TableCell align="center">{record.year2024Vacancy}</TableCell>
          <TableCell align="center">
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
              {record.onJob}
              {record.onJob === 0 && <InfoOutlined sx={{ fontSize: 14, color: '#faad14' }} />}
            </Box>
          </TableCell>
          <TableCell align="center">{record.inTransit}</TableCell>
          <TableCell align="center">{record.eoffer}</TableCell>
          <TableCell align="center">{record.promotion}</TableCell>
          <TableCell align="center">{record.活水}</TableCell>
          <TableCell align="center">{record.internTransfer}</TableCell>
          <TableCell align="center">{record.recruitedOffer}</TableCell>
          <TableCell align="center">{record.monthBudget}</TableCell>
          <TableCell align="center">{record.yearBudget}</TableCell>
          <TableCell align="center">
            <Button size="small" sx={{ color: '#00b578', p: 0, minWidth: 'auto' }}>
              明细
            </Button>
          </TableCell>
        </TableRow>
        {hasChildren && (
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={13}>
              <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 0 }}>
                  {record.children!.map((child) => renderRow(child, level + 1))}
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        )}
      </>
    );
  };

  return (
    <Box sx={{ width: '100%', height: '100%', p: 3, backgroundColor: '#f5f5f5', overflow: 'auto' }}>
      {/* 页面标题 */}
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: 3,
          p: 2.5,
          mb: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              width: 24,
              height: 24,
              backgroundColor: '#00b578',
              borderRadius: 1,
              mr: 1,
            }}
          />
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#262626' }}>
            编制统计分析报表
          </Typography>
        </Box>
      </Box>

      {/* 筛选区域 */}
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: 3,
          p: 2.5,
          mb: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#262626' }}>
              一级中心/部门
            </Typography>
            <Select
              size="small"
              value={filters.department}
              onChange={(e) => setFilters({ ...filters, department: e.target.value })}
              displayEmpty
              sx={{
                width: '100%',
                '& .MuiSelect-select': { py: 1 },
              }}
            >
              <MenuItem value="">全部</MenuItem>
              <MenuItem value="finance">财务中心</MenuItem>
              <MenuItem value="product">商品中心</MenuItem>
            </Select>
          </Box>

          <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#262626' }}>
              编制归属中心
            </Typography>
            <Select
              size="small"
              value={filters.budgetCenter}
              onChange={(e) => setFilters({ ...filters, budgetCenter: e.target.value })}
              displayEmpty
              sx={{
                width: '100%',
                '& .MuiSelect-select': { py: 1 },
              }}
            >
              <MenuItem value="">全部</MenuItem>
            </Select>
          </Box>

          <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#262626' }}>
              职位
            </Typography>
            <Select
              size="small"
              value={filters.position}
              onChange={(e) => setFilters({ ...filters, position: e.target.value })}
              displayEmpty
              sx={{
                width: '100%',
                '& .MuiSelect-select': { py: 1 },
              }}
            >
              <MenuItem value="">全部</MenuItem>
            </Select>
          </Box>

          <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#262626' }}>
              年份
            </Typography>
            <Select
              size="small"
              value={filters.year}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
              sx={{
                width: '100%',
                '& .MuiSelect-select': { py: 1 },
              }}
            >
              <MenuItem value="2024">2024年</MenuItem>
              <MenuItem value="2023">2023年</MenuItem>
            </Select>
          </Box>

          <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#262626' }}>
              员工类型
            </Typography>
            <Select
              size="small"
              value={filters.employeeType}
              onChange={(e) => setFilters({ ...filters, employeeType: e.target.value })}
              sx={{
                width: '100%',
                '& .MuiSelect-select': { py: 1 },
              }}
            >
              <MenuItem value="正式员工">正式员工</MenuItem>
              <MenuItem value="实习生">实习生</MenuItem>
            </Select>
          </Box>

          <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#262626' }}>
              工作地点
            </Typography>
            <Select
              size="small"
              value={filters.workLocation}
              onChange={(e) => setFilters({ ...filters, workLocation: e.target.value })}
              displayEmpty
              sx={{
                width: '100%',
                '& .MuiSelect-select': { py: 1 },
              }}
            >
              <MenuItem value="">全部</MenuItem>
            </Select>
          </Box>

          <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#262626' }}>
              预算类型
            </Typography>
            <Select
              size="small"
              value={filters.budgetType}
              onChange={(e) => setFilters({ ...filters, budgetType: e.target.value })}
              displayEmpty
              sx={{
                width: '100%',
                '& .MuiSelect-select': { py: 1 },
              }}
            >
              <MenuItem value="">全部</MenuItem>
            </Select>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Button
              sx={{
                color: '#00b578',
                border: '1px solid #00b578',
                borderRadius: 2,
                px: 3,
                py: 0.75,
                textTransform: 'none',
                '&:hover': {
                  border: '1px solid #00b578',
                  backgroundColor: 'rgba(0,181,120,0.05)',
                },
              }}
              onClick={() => setFilters({
                department: '',
                budgetCenter: '',
                position: '',
                year: '2024',
                employeeType: '正式员工',
                workLocation: '',
                budgetType: '',
              })}
            >
              重置
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Tab 切换 */}
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: 3,
          p: 2.5,
          mb: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              color: '#8c8c8c',
              '&.Mui-selected': {
                color: '#00b578',
                fontWeight: 600,
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#00b578',
              height: 3,
              borderRadius: 1.5,
            },
          }}
        >
          <Tab label="财务中心" />
          <Tab label="商品中心" />
          <Tab label="全球运营中心" />
        </Tabs>
        <Box sx={{ display: 'flex', gap: 3, mt: 2, pt: 2, borderTop: '1px solid #f0f0f0' }}>
          <Typography
            variant="body2"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              cursor: 'pointer',
              color: '#262626',
              fontWeight: 500,
            }}
          >
            <Box
              component="span"
              sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: '#00b578',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box component="span" sx={{ width: 6, height: 6, backgroundColor: 'white', borderRadius: '50%' }} />
            </Box>
            全部部门
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              cursor: 'pointer',
              color: '#262626',
              fontWeight: 500,
            }}
          >
            <Box
              component="span"
              sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: '#1890ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box component="span" sx={{ width: 6, height: 6, backgroundColor: 'white', borderRadius: '50%' }} />
            </Box>
            实线部门
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              cursor: 'pointer',
              color: '#262626',
              fontWeight: 500,
            }}
          >
            <Box
              component="span"
              sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: '#faad14',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box component="span" sx={{ width: 6, height: 6, backgroundColor: 'white', borderRadius: '50%' }} />
            </Box>
            虚线部门
          </Typography>
        </Box>
      </Box>

      {/* 数据概览 */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#262626' }}>
            数据概览
          </Typography>
          <Typography variant="body2" color="text.secondary">
            每1小时更新一次，最新数据更新时间为15:15，下一次更新时间为16:15
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {/* 当月编制 */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: 'white',
              borderRadius: 3,
              p: 2.5,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <Typography variant="body2" sx={{ color: '#8c8c8c', mb: 1.5 }}>当月编制</Typography>
            <Typography variant="h2" sx={{ fontWeight: 700, color: '#1890ff', mb: 2 }}>50</Typography>
            <Box>
              <Typography variant="body2" sx={{ color: '#8c8c8c', mb: 0.5 }}>满编率</Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#00b578' }}>2.77%</Typography>
            </Box>
          </Box>

          {/* 12月编制 */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: 'white',
              borderRadius: 3,
              p: 2.5,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <Typography variant="body2" sx={{ color: '#8c8c8c', mb: 1.5 }}>12月编制</Typography>
            <Typography variant="h2" sx={{ fontWeight: 700, color: '#1890ff', mb: 2 }}>120</Typography>
            <Box>
              <Typography variant="body2" sx={{ color: '#8c8c8c', mb: 0.5 }}>年度增编</Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#00b578' }}>100%</Typography>
            </Box>
          </Box>

          {/* 4月可发需求数 */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: 'white',
              borderRadius: 3,
              p: 2.5,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5 }}>
              <Typography variant="body2" sx={{ color: '#8c8c8c' }}>4月可发需求数</Typography>
              <Tooltip title="提示">
                <InfoOutlined sx={{ fontSize: 16, color: '#8c8c8c', cursor: 'pointer' }} />
              </Tooltip>
            </Box>
            <Typography variant="h2" sx={{ fontWeight: 700, color: '#1890ff', mb: 2 }}>12</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography variant="body2" sx={{ color: '#00b578' }}>≤55: 10</Typography>
              <Typography variant="body2" sx={{ color: '#faad14' }}>≥57: 2</Typography>
            </Box>
          </Box>

          {/* 2024年空编数 */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: 'white',
              borderRadius: 3,
              p: 2.5,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5 }}>
              <Typography variant="body2" sx={{ color: '#8c8c8c' }}>2024年空编数</Typography>
              <InfoOutlined sx={{ fontSize: 16, color: '#faad14' }} />
            </Box>
            <Typography variant="h2" sx={{ fontWeight: 700, color: '#faad14', mb: 2 }}>120</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography variant="body2" sx={{ color: '#00b578' }}>≤55: 100</Typography>
              <Typography variant="body2" sx={{ color: '#faad14' }}>≥57: 20</Typography>
            </Box>
          </Box>

          {/* 在途 */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: 'white',
              borderRadius: 3,
              p: 2.5,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <Typography variant="body2" sx={{ color: '#8c8c8c', mb: 1.5 }}>在途</Typography>
            <Typography variant="h2" sx={{ fontWeight: 700, color: '#1890ff', mb: 2 }}>4</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography variant="body2" sx={{ color: '#00b578' }}>≤55: 3</Typography>
              <Typography variant="body2" sx={{ color: '#faad14' }}>≥57: 1</Typography>
            </Box>
          </Box>

          {/* 在职人数 */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: 'white',
              borderRadius: 3,
              p: 2.5,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <Typography variant="body2" sx={{ color: '#8c8c8c', mb: 1.5 }}>在职人数</Typography>
            <Typography variant="h2" sx={{ fontWeight: 700, color: '#1890ff', mb: 2 }}>320</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography variant="body2" sx={{ color: '#00b578' }}>≤55: 300</Typography>
              <Typography variant="body2" sx={{ color: '#faad14' }}>≥57: 20</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* 详细数据表格 */}
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: 3,
          p: 2.5,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#262626' }}>
            详细数据
          </Typography>
          <Button
            startIcon={<Download />}
            sx={{
              color: '#00b578',
              border: '1px solid #00b578',
              borderRadius: 2,
              px: 2,
              py: 0.75,
              textTransform: 'none',
              '&:hover': {
                border: '1px solid #00b578',
                backgroundColor: 'rgba(0,181,120,0.05)',
              },
            }}
          >
            下载明细
          </Button>
        </Box>

        <TableContainer sx={{ maxHeight: 'calc(100vh - 500px)', overflow: 'auto' }}>
          <Table size="small" sx={{ '& .MuiTableCell-root': { padding: '14px 16px' } }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#fafafa' }}>
                <TableCell sx={{ fontWeight: 600, minWidth: 200, color: '#262626' }}>部门</TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: 'center', color: '#262626' }}>4月可发需求数</TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: 'center', color: '#262626' }}>2024年空编数</TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: 'center', color: '#262626' }}>在职</TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: 'center', color: '#262626' }}>在途</TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: 'center', color: '#262626' }}>E/Offer未入职</TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: 'center', color: '#262626' }}>晋升</TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: 'center', color: '#262626' }}>活水</TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: 'center', color: '#262626' }}>实习生转正</TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: 'center', color: '#262626', minWidth: 150 }}>已提招聘需求未OFFER数</TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: 'center', color: '#262626' }}>当月编制</TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: 'center', color: '#262626' }}>12月编制</TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: 'center', color: '#262626' }}>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{mockData.map((row) => renderRow(row))}</TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Organization;
