import Mock from 'mockjs';

const userDatabase = {
    'admin': { username: 'admin', password: 'admin' },
    'user': { username: 'user', password: 'user' }
};

const loginData = {
    check: (config) => {
        const {username, password} = JSON.parse(config.body);
        // 检查用户是否存在于模拟数据库中
        if (userDatabase[username] && userDatabase[username].password === password) {
            return {
                code: -20000,
                data: {
                    token: Mock.Random.guid(),
                    message: '用户已存在注册失败'  
                } 
            }  
        } else {
            return {
                code: 20000,
                data: {
                    token: Mock.Random.guid(),
                    message: '用户不存在可以注册'
                }
            }
        }
    },
    register: (config) => {
        const {username, password} = JSON.parse(config.body);
        // 将注册信息存入模拟数据库
        userDatabase[username] = { username, password };
        return {
            code: 20000,
            data: {
                message: '注册成功',
                token: Mock.Random.guid()
            }
        };
    },
    getMenu: (config) => {
        const {username, password} = JSON.parse(config.body);
        // 检查用户是否存在于模拟数据库中
        if (userDatabase[username] && userDatabase[username].password === password) {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: '/home',
                            name: 'home',
                            label: '首页',
                            icon: 's-home',
                            url: 'home/index'
                        },
                        {
                            path: '/user',
                            name: 'user',
                            label: '用户管理',
                            icon: 'user',
                            url: 'user/index'
                        },
                        {
                            path: '/mall',
                            name: 'mall',
                            label: '商品管理',
                            icon: 'video-play',
                            url: 'mall/index'
                        },
                        {
                            path: '/其他',
                            icon: 'loction',
                            children: [
                                {
                                    path: '/pageOne',
                                    name: 'pageOne',
                                    label: '页面1',
                                    icon: 'setting',
                                    url: 'other/pageOne.vue'
                                },
                                {
                                    path: '/pageTwo',
                                    name: 'pageTwo',
                                    label: '页面2',
                                    icon: 'setting',
                                    url: 'other/pageTwo.vue'
                                }
                            ]
                        }             
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'                
                }
            }
        }else if (username === 'user' && password === 'user') {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: '/home',
                            name: 'home',
                            label: '首页',
                            icon: 's-home',
                            url: 'home/index'
                        },
                        {
                            path: '/mall',
                            name: 'mall',
                            label: '商品管理',
                            icon: 'video-play',
                            url: 'mall/index'
                        }
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        }else {
            // 验证失败
            return {
                code: -20000,
                data: {
                    message: '账号或密码不正确'
                }
            }
        }
    }
}


export default loginData;