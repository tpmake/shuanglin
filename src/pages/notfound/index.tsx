import { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GrassIcon from '@mui/icons-material/Grass';

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/home');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleGoHome = () => {
    navigate('/home');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        backgroundColor: '#d4e8e8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 白色圆形背景 */}
      <Box
        sx={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
        }}
      />

      {/* 内容区域 */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          mb: 8,
        }}
      >
        {/* 404 数字 */}
        <Typography
          variant="h1"
          sx={{
            fontSize: '120px',
            fontWeight: 'bold',
            color: '#3a4a5a',
            lineHeight: 1,
            mb: 2,
          }}
        >
          404
        </Typography>

        {/* 提示文字 */}
        <Typography
          variant="h6"
          sx={{
            color: '#3a4a5a',
            mb: 1,
            fontSize: '20px',
          }}
        >
          页面跑丢了~
        </Typography>

        {/* 倒计时文字 */}
        <Typography
          variant="body1"
          sx={{
            color: '#3a4a5a',
            fontSize: '18px',
          }}
        >
          <Typography
            component="span"
            sx={{
              color: '#ff4d4f',
              fontWeight: 'bold',
              fontSize: '20px',
            }}
          >
            {countdown}
          </Typography>
          秒后自动跳转首页......
        </Typography>
      </Box>

      {/* 底部装饰区域 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          zIndex: 2,
        }}
      >
        {/* 弧形地面 */}
        <svg
          width="100%"
          height="200"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0 }}
        >
          <path
            d="M0,100 C360,180 1080,180 1440,100 L1440,200 L0,200 Z"
            fill="#3a4a5a"
          />
        </svg>

        {/* 跑步的人 */}
        <Box
          sx={{
            position: 'absolute',
            left: '30%',
            bottom: '60px',
            zIndex: 3,
          }}
        >
          <DirectionsRunIcon
            sx={{
              fontSize: '120px',
              color: '#3a4a5a',
            }}
          />
        </Box>

        {/* 路灯 */}
        <Box
          sx={{
            position: 'absolute',
            right: '35%',
            bottom: '80px',
            zIndex: 3,
          }}
        >
          <LocationOnIcon
            sx={{
              fontSize: '100px',
              color: '#3a4a5a',
            }}
          />
        </Box>

        {/* 装饰植物 */}
        <Box
          sx={{
            position: 'absolute',
            right: '20%',
            bottom: '40px',
            zIndex: 3,
          }}
        >
          <GrassIcon
            sx={{
              fontSize: '80px',
              color: '#3a4a5a',
              transform: 'rotate(-15deg)',
            }}
          />
        </Box>
      </Box>

      {/* 按钮区域 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '40px',
          right: '60px',
          zIndex: 10,
          display: 'flex',
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={handleGoHome}
          sx={{
            backgroundColor: 'white',
            color: '#3a4a5a',
            textTransform: 'none',
            fontWeight: 500,
            px: 4,
            py: 1.5,
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          返回首页
        </Button>
        <Button
          variant="contained"
          onClick={handleGoBack}
          sx={{
            backgroundColor: 'white',
            color: '#3a4a5a',
            textTransform: 'none',
            fontWeight: 500,
            px: 4,
            py: 1.5,
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          返回上一页
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
