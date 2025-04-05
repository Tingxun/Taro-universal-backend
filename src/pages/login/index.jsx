import Taro, { useDidShow, showToast } from '@tarojs/taro';
import { View, Button, Input, Checkbox, Form } from '@tarojs/components';
import { useCallback, useState } from 'react';
import { getMenu } from '../../api/index';
import './login.css';

function Login() {
  // 使用useState管理表单数据
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false,
  });

  // 使用useCallback优化事件处理函数
  const handleSubmit = useCallback(() => {
    const { username, password } = formData;
    console.log('formData', formData);
    if (!username||!password) {
      showToast({
        title: '请输入账号名和密码',
        icon: 'none',
      });
      return;
    }

    getMenu(formData).then((res) => {
      // console.log('res', res);
      if (res.data.code === -20000) {
        showToast({
          title: res.data.data.message,
          icon: 'none',
        });
        return;
      }
      sessionStorage.setItem('token', res.data.data.token);
      Taro.redirectTo({
        url: '/pages/main',
      });
    });
  }, [formData]);

  // 使用useDidShow生命周期函数，在页面显示时检查token
  useDidShow(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      Taro.redirectTo({
        url: '/pages/main',
      });
    }
  });

  return (
    <View className="login-container">
      <View className="login-header">
        <View className="login-title">系统登录</View>
        <View className="login-subtitle">请输入您的账户信息</View>
      </View>

      <View className="form-item">
        <View className="input-label">账号</View>
        <Input
          placeholder="请输入账号"
          className="custom-input"
          value={formData.username}
          onInput={(e) => setFormData({ ...formData, username: e.detail.value })}
        />
      </View>

      <View className="form-item">
        <View className="input-label">密码</View>
        <Input
          password
          placeholder="请输入密码"
          className="custom-input"
          value={formData.password}
          onInput={(e) => setFormData({ ...formData, password: e.detail.value })}
        />
      </View>

      <View className="form-item remember-section">
        <Checkbox
          checked={formData.remember}
          className="custom-checkbox"
          onClick={(e) => 
            setFormData({ ...formData, remember: !formData.remember })
          }
        />
        <View className="remember-text">记住登录状态</View>
      </View>

      <View className="action-buttons">
        <Button className="login-btn primary" onClick={handleSubmit}>
          立即登录
        </Button>
        <Button className="login-btn link" onClick={() => 
        Taro.redirectTo({ url: '/pages/register/index' })
        }>注册新账户</Button>
      </View>
    </View>
  );
}

export default Login;