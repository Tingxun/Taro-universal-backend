import Taro, { useDidShow, showToast } from '@tarojs/taro';
import { View, Button, Input, Form } from '@tarojs/components';
import { useCallback, useState } from 'react';
import { registerUser, checkUser } from '../../api/index';
import './register.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = useCallback(() => {
    const { username, password } = formData;
    if (!username || !password) {
      showToast({
        title: '请输入账号名和密码',
        icon: 'none',
      });
      return;
    }

    checkUser(formData).then((res) => {
      if (res.data.code === -20000) {
        showToast({
          title: res.data.message || '用户已存在',
          icon: 'none',
        });
        return Promise.reject('用户已存在'); // 这里返回一个被拒绝的Promise
      }
      return registerUser(formData); // 只有当用户不存在时才执行注册
    }).then((res) => {
      if (res.data.code === 20000) {
        showToast({
          title: '注册成功，5秒后自动跳转',
          icon: 'success',
          duration: 5000
        });
        setTimeout(() => {
          Taro.redirectTo({
            url: '/pages/login/index',
          });
        }, 5000);
      } else {
        showToast({
          title: res.data.message || '注册失败',
          icon: 'none',
        });
      }
    }).catch((err) => {
      // 这里捕获 checkUser 或 registerUser 的错误
      console.error('注册流程出错:', err);
    });
  }, [formData]);

  return (
    <View className="login-container">
      <View className="login-header">
        <View className="login-title">用户注册</View>
        <View className="login-subtitle">请输入您的注册信息</View>
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

      <View className="action-buttons">
        <Button className="login-btn primary" onClick={handleSubmit}>
          立即注册
        </Button>
        <Button 
          className="login-btn link"
          onClick={() => Taro.redirectTo({ url: '/pages/login/index' })}
        >
          已有账号？去登录
        </Button>
      </View>
    </View>
  );
}

export default Register;