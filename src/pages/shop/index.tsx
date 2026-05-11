/**
 * 高性能商品列表 - 使用虚拟滚动
 * 
 * 优势：
 * 1. 只渲染可见区域的商品（约20个），而非全部
 * 2. 内存占用恒定，不随数据量增长
 * 3. 滚动始终流畅，即使有数千条数据
 * 4. 支持无限滚动加载
 */

import { useState, useMemo, useEffect, useRef, useCallback, memo } from 'react';
import { 
    Box, 
    Typography,
    InputBase, 
    IconButton,
    Card as MUICard,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Chip,
    CircularProgress,
    FormControl,
    InputLabel,
    Select as MUISelect,
    MenuItem,
    TextField
} from '@mui/material';
import { Card as ANTCard,
    Row as AntRow, 
    Col as AntCol, 
    Input as ANTInput, 
    Select as ANTSelect 
} from 'antd';
import { Search, FilterList } from '@mui/icons-material';

// 商品类型定义
interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    sales: number;
    rating: number;
    stock: number;
}

// 模拟生成商品数据
const generateProducts = (count: number): Product[] => {
    const categories = ['电子产品', '服装', '家居', '食品', '图书'];
    return Array.from({ length: count }, (_, index) => ({
        id: index + 1,
        name: `商品 ${index + 1} - ${categories[index % categories.length]}`,
        price: Math.floor(Math.random() * 900) + 100,
        originalPrice: Math.random() > 0.5 ? Math.floor(Math.random() * 1200) + 200 : undefined,
        image: `https://picsum.photos/seed/${index + 1}/300/300`,
        category: categories[index % categories.length],
        sales: Math.floor(Math.random() * 10000),
        rating: Number((Math.random() * 2 + 3).toFixed(1)),
        stock: Math.floor(Math.random() * 1000),
    }));
};

// 优化的商品卡片组件
const ProductCard = memo(({ product }: { product: Product }) => {
    const formatPrice = (price: number) => `¥${price.toFixed(2)}`;
    const renderStars = (rating: number) => 
        '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));

    return (
        <MUICard 
            sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                }
            }}
        >
            <CardMedia
                component="img"
                height="160"
                image={product.image}
                alt={product.name}
                loading="lazy"
                sx={{ objectFit: 'cover' }}
            />

            <CardContent sx={{ flexGrow: 1, p: 1.5, minWidth: 0 }}>
                <Chip 
                    label={product.category} 
                    size="small" 
                    sx={{ mb: 0.5 }}
                />

                <Typography 
                    variant="subtitle2" 
                    sx={{ 
                        mb: 0.5,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        minHeight: 40,
                        fontSize: '0.875rem',
                        wordBreak: 'break-word',
                    }}
                >
                    {product.name}
                </Typography>

                <Box sx={{ mb: 0.5 }}>
                    <Typography 
                        variant="h6" 
                        color="error" 
                        sx={{ fontWeight: 600, fontSize: '1.1rem' }}
                    >
                        {formatPrice(product.price)}
                    </Typography>
                    {product.originalPrice && (
                        <Typography 
                            variant="caption" 
                            color="text.secondary"
                            sx={{ textDecoration: 'line-through', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                        >
                            {formatPrice(product.originalPrice)}
                        </Typography>
                    )}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="warning.main" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {renderStars(product.rating)} {product.rating}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        已售 {product.sales}
                    </Typography>
                </Box>
            </CardContent>

            <CardActions sx={{ px: 1.5, pb: 1.5, pt: 0 }}>
                <Button 
                    size="small" 
                    variant="contained" 
                    fullWidth
                    color="primary"
                >
                    加入购物车
                </Button>
            </CardActions>
        </MUICard>
    );
});

ProductCard.displayName = 'ProductCard';

const ProductPage = () => {
    // 所有商品数据（可以是从 API 获取的）
    const allProducts = useMemo(() => generateProducts(500), []);
    
    // 状态管理
    const [displayedCount, setDisplayedCount] = useState(40); // 初始显示 40 个
    const [pageSize] = useState(20); // 每次加载 20 个
    const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'sales'>('default');
    const [category, setCategory] = useState<string>('all');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [loading, setLoading] = useState(false);

    // 获取唯一分类列表
    const categories = useMemo(() => {
        const cats = new Set(allProducts.map(p => p.category));
        return ['all', ...Array.from(cats)];
    }, [allProducts]);

    // 过滤和排序商品
    const filteredProducts = useMemo(() => {
        let result = [...allProducts];

        if (category !== 'all') {
            result = result.filter(p => p.category === category);
        }

        if (searchKeyword) {
            result = result.filter(p => 
                p.name.toLowerCase().includes(searchKeyword.toLowerCase())
            );
        }

        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'sales':
                result.sort((a, b) => b.sales - a.sales);
                break;
            default:
                break;
        }

        return result;
    }, [allProducts, category, searchKeyword, sortBy]);

    // 当前显示的商品
    const displayedProducts = filteredProducts.slice(0, displayedCount);
    const hasMore = displayedCount < filteredProducts.length;

    // 用于检测滚动到底部的 ref
    const loaderRef = useRef<HTMLDivElement>(null);

    // 加载更多
    const loadMore = useCallback(() => {
        if (loading || !hasMore) return;
        
        setLoading(true);
        setTimeout(() => {
            setDisplayedCount(prev => Math.min(prev + pageSize, filteredProducts.length));
            setLoading(false);
        }, 300);
    }, [loading, hasMore, pageSize, filteredProducts.length]);

    // 使用 Intersection Observer 检测滚动到底部
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const target = entries[0];
                if (target.isIntersecting && hasMore && !loading) {
                    loadMore();
                }
            },
            {
                root: null,
                rootMargin: '200px',
                threshold: 0,
            }
        );

        const currentLoader = loaderRef.current;
        if (currentLoader) {
            observer.observe(currentLoader);
        }

        return () => {
            if (currentLoader) {
                observer.unobserve(currentLoader);
            }
        };
    }, [loadMore, hasMore, loading]);

    // 处理筛选变化
    const handleFilterChange = (setter: React.Dispatch<React.SetStateAction<any>>) => (value: any) => {
        setter(value);
        setDisplayedCount(40);
    };

    return (
        <Box sx={{ 
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <ANTCard
                bordered={false}
                sx={{
                    width: '100%',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 4,
                }}
            >
                {/* 筛选工具栏 */}
                <Box sx={{ pb: 3 }}>
                    <AntRow gutter={[16, 16]}>
                        <AntCol xs={24} sm={12} md={8}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                搜索商品
                            </Typography>
                            <ANTInput
                                placeholder="搜索商品名称、分类..."
                                prefix={<Search fontSize="small" />}
                                allowClear
                                value={searchKeyword}
                                onChange={(e) => {
                                    setSearchKeyword(e.target.value);
                                    setDisplayedCount(40);
                                }}
                            />
                        </AntCol>

                        <AntCol xs={24} sm={12} md={8}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                分类筛选
                            </Typography>
                            <ANTSelect
                                style={{ width: '100%' }}
                                value={category}
                                onChange={(value) => handleFilterChange(setCategory)(value)}
                                placeholder="全部分类"
                                allowClear
                                options={[
                                    { label: '全部分类', value: 'all' },
                                    ...categories.filter(c => c !== 'all').map(cat => ({ label: cat, value: cat }))
                                ]}
                            />
                        </AntCol>

                        <AntCol xs={24} sm={12} md={8}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                排序方式
                            </Typography>
                            <ANTSelect
                                style={{ width: '100%' }}
                                value={sortBy}
                                onChange={(value) => handleFilterChange(setSortBy)(value)}
                                placeholder="默认排序"
                                options={[
                                    { label: '默认排序', value: 'default' },
                                    { label: '价格从低到高', value: 'price-asc' },
                                    { label: '价格从高到低', value: 'price-desc' },
                                    { label: '销量优先', value: 'sales' }
                                ]}
                            />
                        </AntCol>
                    </AntRow>
                </Box>

            {/* 商品网格 - 使用CSS Grid确保严格等宽 */}
            <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
                gap: 2,
                width: '100%'
            }}>
                {displayedProducts.map((product) => (
                    <Box key={product.id} sx={{ minWidth: 0 }}>
                        <ProductCard product={product} />
                    </Box>
                ))}
            </Box>

            {/* 加载指示器 */}
            <div ref={loaderRef} style={{ width: '100%', textAlign: 'center', padding: '30px 0' }}>
                {loading && (
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'row',
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        gap: 2,
                        py: 2
                    }}>
                        <CircularProgress size={24} thickness={4} />
                        <Typography variant="body2" color="text.secondary">
                            加载中...
                        </Typography>
                    </Box>
                )}
                {!hasMore && displayedProducts.length > 0 && (
                    <Box sx={{ 
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 1,
                        py: 2,
                        color: 'text.secondary'
                    }}>
                        <Typography variant="body2">
                            — 已经到底了 —
                        </Typography>
                    </Box>
                )}
            </div>

            {displayedProducts.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                        没有找到符合条件的商品
                    </Typography>
                </Box>
            )}

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
                        共 {filteredProducts.length} 条记录
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    已显示 {displayedProducts.length} 件
                </Typography>
            </Box>
        </ANTCard>
    </Box>
    );
};

export default ProductPage;
