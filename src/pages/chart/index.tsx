import { useState, useMemo } from 'react';
import { Box, Typography, Grid, Paper, Container, Button, CircularProgress, InputBase, IconButton } from '@mui/material';
import { Card, Row, Col, Statistic } from 'antd';
import ReactECharts from 'echarts-for-react';
import {
    TrendingUp,
    TrendingDown,
    Analytics,
    FolderOpen,
    Storage,
    EditNote,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Chart = () => {
    const navigate = useNavigate();

    // 统计卡片数据
    const statsData = [
        {
            title: '数据源总数 (个)',
            value: 22925,
            change: '+1.5%',
            trend: 'up' as const,
            icon: <Analytics sx={{ fontSize: 32, color: '#1890ff' }} />,
        },
        {
            title: '同步任务总数 (个)',
            value: 22925,
            change: '-1.5%',
            trend: 'down' as const,
            icon: <FolderOpen sx={{ fontSize: 32, color: '#1890ff' }} />,
        },
        {
            title: '同步数据总量 (GB)',
            value: 22925,
            progress: '599/63.1%',
            icon: <Storage sx={{ fontSize: 32, color: '#1890ff' }} />,
        },
        {
            title: '同步记录总数同步记录总数 (万条)\n同步记录总数',
            value: 22925,
            change: '+1.5%',
            trend: 'up' as const,
            icon: <EditNote sx={{ fontSize: 32, color: '#1890ff' }} />,
        },
    ];

    // 环形图数据
    const pieData = [
        { value: 224, name: '已完成' },
        { value: 224, name: '未运行' },
        { value: 224, name: '已停止' },
        { value: 224, name: '停止中' },
        { value: 224, name: '已报错' },
        { value: 224, name: '运行中' },
    ];

    const pieColors = ['#5470c6', '#91cc75', '#73c0de', '#fac858', '#ee6666', '#3ba272'];

    // 创建环形图配置（移除图例）
    const createPieOption = () => ({
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)',
            backgroundColor: 'rgba(255, 255, 255, 0.96)',
            borderColor: '#eee',
            borderWidth: 1,
            textStyle: {
                color: '#333',
                fontSize: 12,
            },
            confine: true,
            appendToBody: true,
            extraCssText: 'z-index: 100;',
        },
        series: [
            {
                type: 'pie',
                radius: ['55%', '90%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 6,
                    borderColor: '#f5f5f5',
                    borderWidth: 2,
                    shadowBlur: 8,
                    shadowColor: 'rgba(0, 0, 0, 0.08)',
                },
                label: {
                    show: true,
                    position: 'center',
                    formatter: '总数\n1,123',
                    fontSize: 14,
                    lineHeight: 24,
                    rich: {
                        title: {
                            fontSize: 13,
                            color: '#999',
                            fontWeight: 'normal',
                        },
                        value: {
                            fontSize: 28,
                            color: '#333',
                            fontWeight: 'bold',
                            padding: [0, 0, 0, 0],
                        },
                    },
                },
                emphasis: {
                    scale: true,
                    scaleSize: 8,
                    itemStyle: {
                        shadowBlur: 16,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.15)',
                    },
                },
                labelLine: {
                    show: false,
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                data: pieData.map((item, index) => ({
                    ...item,
                    itemStyle: { color: pieColors[index] },
                })),
            },
        ],
        graphic: [],
    });

    const taskStatusOption = createPieOption();
    const offlineTaskOption = createPieOption();
    const realtimeTaskOption = createPieOption();

    // 柱状图配置 - 各时段任务执行分布数
    const barChartOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
        },
        legend: {
            data: ['执行成功', '执行失败'],
            right: '5%',
            itemWidth: 20,
            itemHeight: 10,
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '15%',
            containLabel: true,
        },
        xAxis: {
            type: 'category',
            data: [
                '00:00-01:00',
                '01:00-02:00',
                '02:00-03:00',
                '03:00-04:00',
                '04:00-05:00',
                '05:00-06:00',
                '06:00-07:00',
                '07:00-08:00',
                '08:00-09:00',
                '09:00-10:00',
                '10:00-11:00',
                '11:00-12:00',
            ],
            axisLabel: {
                interval: 0,
                fontSize: 10,
            },
        },
        yAxis: {
            type: 'value',
            max: 50,
        },
        series: [
            {
                name: '执行成功',
                type: 'bar',
                data: [35, 18, 28, 24, 28, 33, 15, 37, 28, 42, 8, 28],
                itemStyle: {
                    color: '#5470c6',
                    borderRadius: [4, 4, 0, 0],
                },
                barWidth: '40%',
            },
            {
                name: '执行失败',
                type: 'bar',
                data: [43, 23, 35, 30, 40, 41, 19, 41, 35, 51, 11, 42],
                itemStyle: {
                    color: '#e8eaf6',
                    borderRadius: [4, 4, 0, 0],
                },
                barWidth: '40%',
            },
        ],
    };

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                backgroundColor: '#fff',
                borderRadius: '4px',
                p: 2,
                overflow: 'auto',
            }}
        >
            {/* 统计卡片区域 */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', width: '100%' }}>
                {statsData.map((stat, index) => (
                    <Card key={index} sx={{ width: '100%', height: '100%', borderRadius: '8px', border: '1px solid #e8e8e8', overflow: 'hidden', '.ant-card-body': { padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' } }}>
                        <Box sx={{ width: '100%', overflow: 'hidden', minWidth: 0 }}>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', minHeight: 36, wordBreak: 'break-all', lineHeight: 1.4, maxWidth: '100%' }}>
                                    {stat.title}
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1, wordBreak: 'break-all' }}>
                                    {stat.value.toLocaleString()}
                                </Typography>
                                {stat.change && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <Typography variant="caption" color="text.secondary">
                                            较上周{stat.trend === 'up' ? '增加' : '减少'}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: stat.trend === 'up' ? '#f5222d' : '#52c41a',
                                                fontWeight: 500,
                                            }}
                                        >
                                            {stat.change}
                                        </Typography>
                                        {stat.trend === 'up' ? (
                                            <TrendingUp sx={{ fontSize: 14, color: '#f5222d' }} />
                                        ) : (
                                            <TrendingDown sx={{ fontSize: 14, color: '#52c41a' }} />
                                        )}
                                    </Box>
                                )}
                                {stat.progress && (
                                    <Typography variant="caption" color="primary" sx={{ fontWeight: 500 }}>
                                        已同步 {stat.progress}
                                    </Typography>
                                )}
                            </Box>
                            <Box
                                sx={{
                                    width: 56,
                                    height: 56,
                                    borderRadius: '50%',
                                    backgroundColor: '#e6f7ff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {stat.icon}
                            </Box>
                        </Box>
                    </Card>
                ))}
            </Box>

            <Box sx={{ width: '100%' }}>
                <Grid container spacing={1}>
                   {statsData.map((sta, index) => (
                         <Grid item size={3} key={index}>
                            <Box sx={{ display: 'flex', backgroundColor: '#fff', height: '100%', flexDirection: 'column', gap: 1, minWidth: 0, overflow: 'hidden', borderRadius: '8px', border: '1px solid #e8e8e8', paddingLeft: 2, paddingRight: 2, paddingTop: 2 }}>
                                <Typography fontSize={16} color='#666666'>
                                   {sta.title}
                                </Typography>

                                 <Typography fontSize={30} color='#333333' fontWeight={600}>
                                   {sta.value}
                                </Typography>

                                <Box
                                    sx={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: '50%',
                                        backgroundColor: '#e6f7ff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {sta.icon}
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* 环形图区域 */}
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={8}>
                    <Card
                        sx={{ height: '100%', '.ant-card-body': { padding: 0 } }}
                        title={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box
                                    sx={{
                                        width: 3,
                                        height: 16,
                                        backgroundColor: '#1890ff',
                                        borderRadius: 1,
                                    }}
                                />
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    任务状态占比分析
                                </Typography>
                            </Box>
                        }
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', height: 280 }}>
                            <Box sx={{ flex: 1 }}>
                                <ReactECharts option={taskStatusOption} style={{ height: 280 }} />
                            </Box>
                            <Box sx={{ width: 180, display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center', height: '100%', pl: 2 }}>
                                {pieData.map((item, index) => {
                                    const percent = Math.round((item.value / 1344) * 100);
                                    return (
                                        <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Box
                                                sx={{
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: '50%',
                                                    backgroundColor: pieColors[index],
                                                    flexShrink: 0,
                                                }}
                                            />
                                            <Typography variant="body2" sx={{ flex: 1, minWidth: 50, color: '#666' }}>
                                                {item.name}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#666', minWidth: 35 }}>
                                                {percent}%
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#666', minWidth: 35, textAlign: 'right' }}>
                                                {item.value}
                                            </Typography>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Box>
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Card
                        sx={{ height: '100%', '.ant-card-body': { padding: 0 } }}
                        title={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box
                                    sx={{
                                        width: 3,
                                        height: 16,
                                        backgroundColor: '#1890ff',
                                        borderRadius: 1,
                                    }}
                                />
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    离线任务状态占比分析
                                </Typography>
                            </Box>
                        }
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', height: 280 }}>
                            <Box sx={{ flex: 1 }}>
                                <ReactECharts option={offlineTaskOption} style={{ height: 280 }} />
                            </Box>
                            <Box sx={{ width: 180, display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center', height: '100%', pl: 2 }}>
                                {pieData.map((item, index) => {
                                    const percent = Math.round((item.value / 1344) * 100);
                                    return (
                                        <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Box
                                                sx={{
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: '50%',
                                                    backgroundColor: pieColors[index],
                                                    flexShrink: 0,
                                                }}
                                            />
                                            <Typography variant="body2" sx={{ flex: 1, minWidth: 50, color: '#666' }}>
                                                {item.name}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#666', minWidth: 35 }}>
                                                {percent}%
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#666', minWidth: 35, textAlign: 'right' }}>
                                                {item.value}
                                            </Typography>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Box>
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Card
                        sx={{ height: '100%', '.ant-card-body': { padding: 0 } }}
                        title={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box
                                    sx={{
                                        width: 3,
                                        height: 16,
                                        backgroundColor: '#1890ff',
                                        borderRadius: 1,
                                    }}
                                />
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    实时任务状态占比分析
                                </Typography>
                            </Box>
                        }
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', height: 280 }}>
                            <Box sx={{ flex: 1 }}>
                                <ReactECharts option={realtimeTaskOption} style={{ height: 280 }} />
                            </Box>
                            <Box sx={{ width: 180, display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center', height: '100%', pl: 2 }}>
                                {pieData.map((item, index) => {
                                    const percent = Math.round((item.value / 1344) * 100);
                                    return (
                                        <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Box
                                                sx={{
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: '50%',
                                                    backgroundColor: pieColors[index],
                                                    flexShrink: 0,
                                                }}
                                            />
                                            <Typography variant="body2" sx={{ flex: 1, minWidth: 50, color: '#666' }}>
                                                {item.name}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#666', minWidth: 35 }}>
                                                {percent}%
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#666', minWidth: 35, textAlign: 'right' }}>
                                                {item.value}
                                            </Typography>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Box>
                    </Card>
                </Col>
            </Row>

            {/* 柱状图区域 */}
            <Card
                title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                            sx={{
                                width: 3,
                                height: 16,
                                backgroundColor: '#1890ff',
                                borderRadius: 1,
                            }}
                        />
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            各时段任务执行分布数
                        </Typography>
                    </Box>
                }
                extra={
                    <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                执行成功总数(个):
                            </Typography>
                            <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
                                140
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                较上周:
                            </Typography>
                            <Typography variant="body2" color="success.main" sx={{ fontWeight: 600 }}>
                                -20.5%
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                执行失败总数(个):
                            </Typography>
                            <Typography variant="body2" color="error" sx={{ fontWeight: 600 }}>
                                35
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                较上周:
                            </Typography>
                            <Typography variant="body2" color="success.main" sx={{ fontWeight: 600 }}>
                                -20.5%
                            </Typography>
                        </Box>
                    </Box>
                }
            >
                <ReactECharts option={barChartOption} style={{ height: 350 }} />
            </Card>
        </Box>
    );
};

export default Chart;