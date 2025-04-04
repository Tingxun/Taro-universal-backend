import Taro, { useDidShow } from '@tarojs/taro';
import { View, Button, Input, Checkbox } from '@tarojs/components';
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
    if (!username) {
      Taro.showToast({
        title: '请输入账号名',
        icon: 'none',
      });
      return;
    }
    if (!password) {
      Taro.showToast({
        title: '请输入密码',
        icon: 'none',
      });
      return;
    }
    getMenu(formData).then((res) => {
      console.log('res', res);
      if (res.data.code === -20000) {
        Taro.showToast({
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
      <View className="login-title">系统登录</View>
      <View className="form-item">
        <View className="label">账号名</View>
        <Input
          placeholder="请输入账号名"
          value={formData.username}
          onInput={(e) => setFormData({ ...formData, username: e.detail.value })}
        />
      </View>
      <View className="form-item">
        <View className="label">密码</View>
        <Input
          password
          placeholder="请输入密码"
          value={formData.password}
          onInput={(e) => setFormData({ ...formData, password: e.detail.value })}
        />
      </View>
      <View className="form-item" style={{display: 'flex', alignItems: 'center'}}>
        <Checkbox
          checked={formData.remember}
          style={{width: '24px'}}
          onChange={(e) => setFormData({ ...formData, remember: e.detail.value })}
        ></ Checkbox>
        <View style={{marginLeft: '5px', marginTop: '10px'}}>记住密码</View>
      </View>
      <View className="login-button">
        <Button type="primary" onClick={handleSubmit} style={{marginRight: '10px'}}>
          登录
        </Button>
        <Button>注册</Button>
      </View>
    </View>
  );
}

export default Login;