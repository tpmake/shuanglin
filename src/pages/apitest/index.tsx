import { useState } from 'react';
import { userApi } from '../../api/modules/user';
import { exampleApi } from '../../api/modules/example';
import { Button, Card, Typography, Space, message } from 'antd';

const { Title, Text } = Typography;

const ApiTest = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // 方式一：使用回调函数（推荐）
  const handleRequestWithCallback = (
    apiCall: (callbacks: any) => void,
    testName: string
  ) => {
    setLoading(true);
    
    apiCall({
      onSuccess: (data, response) => {
        setResult({
          test: testName,
          success: true,
          data: data,
          response: response,
        });
        message.success(`${testName} 成功`);
      },
      onError: (error, msg) => {
        setResult({
          test: testName,
          success: false,
          error: error,
          message: msg,
        });
        message.error(`${testName} 失败：${msg}`);
      },
      onFinally: () => {
        setLoading(false);
        console.log(`${testName} 请求完成`);
      },
    });
  };

  // 方式二：使用 Promise（保持原有方式）
  const handleRequestWithPromise = async (
    apiFunc: () => Promise<any>,
    testName: string
  ) => {
    setLoading(true);
    try {
      const response = await apiFunc();
      setResult({
        test: testName,
        success: true,
        data: response.data,
      });
      message.success(`${testName} 成功`);
    } catch (error: any) {
      setResult({
        test: testName,
        success: false,
        error: error.message,
      });
      message.error(`${testName} 失败：${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>API 测试工具</Title>
      <Text type="secondary">测试回调函数和 Promise 两种调用方式</Text>

      <Space direction="vertical" style={{ width: '100%' }} size="large">
        {/* 用户 API - 回调方式 */}
        <Card title="用户 API（回调方式）" size="small">
          <Space wrap>
            <Button
              loading={loading}
              onClick={() =>
                handleRequestWithCallback(
                  (callbacks) => userApi.getUserInfo(1, callbacks),
                  '获取用户信息'
                )
              }
            >
              获取用户信息
            </Button>
            <Button
              loading={loading}
              onClick={() =>
                handleRequestWithCallback(
                  (callbacks) =>
                    userApi.login(
                      {
                        username: 'test',
                        password: '123456',
                      },
                      callbacks
                    ),
                  '用户登录'
                )
              }
            >
              用户登录
            </Button>
            <Button
              loading={loading}
              onClick={() =>
                handleRequestWithCallback(
                  (callbacks) => userApi.getUserList(undefined, callbacks),
                  '获取用户列表'
                )
              }
            >
              获取用户列表
            </Button>
          </Space>
        </Card>

        {/* 示例 API - Promise 方式 */}
        <Card title="示例 API（Promise 方式）" size="small">
          <Space wrap>
            <Button
              loading={loading}
              onClick={() =>
                handleRequestWithPromise(
                  () => exampleApi.getList(),
                  '获取列表'
                )
              }
            >
              获取列表
            </Button>
            <Button
              loading={loading}
              onClick={() =>
                handleRequestWithPromise(
                  () => exampleApi.getDetail(1),
                  '获取详情'
                )
              }
            >
              获取详情
            </Button>
          </Space>
        </Card>

        {/* 测试结果展示 */}
        {result && (
          <Card title="测试结果" size="small">
            <pre style={{ background: '#f5f5f5', padding: 12, borderRadius: 4, overflow: 'auto' }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </Card>
        )}
      </Space>
    </div>
  );
};

export default ApiTest;