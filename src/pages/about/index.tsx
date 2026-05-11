import { Box, Typography, Paper, Avatar, Stack, Chip } from '@mui/material';
import { Card } from 'antd';

const About = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        关于系统
      </Typography>

      <Card sx={{ mt: 3, borderRadius: 4 }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h6" gutterBottom>
              技术栈
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {['React 18', 'TypeScript', 'Vite', 'MUI', 'Ant Design', 'React Router'].map(
                (tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    color="primary"
                    variant="outlined"
                  />
                )
              )}
            </Stack>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              项目特点
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              • 采用最新的 React 18 和 TypeScript，类型安全
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              • 集成 MUI 和 Ant Design 两大 UI 框架，组件丰富
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              • 使用 React Router v6 进行路由管理
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Vite 构建工具，开发体验极佳
            </Typography>
          </Box>
        </Stack>
      </Card>
    </Box>
  );
};

export default About;