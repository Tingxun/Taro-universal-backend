
import Taro from '@tarojs/taro';
import { useState } from 'react';
// 父组件中需添加Outlet渲染子路由
import { Layout } from 'antd';
import AsideComponent from '../components/aside';
import HeaderComponent from '../components/header';
import TagComponent from '../components/tag';
import Outlet from '../components/outlet';
// import RouterAuth from '../router/routerAuth';

const { Content } = Layout;

function Main (){
    const [collapsed, setCollapsed] = useState(false);
    const [navItem, setNavItem] = useState({});
    const [outletPath, setOutletPath] = useState('/pages/main')

    return (
            <Layout className='main-container'>
            <AsideComponent collapsed={collapsed} setNavItem={setNavItem} setOutletPath={setOutletPath} />
            <Layout>
                <HeaderComponent collapsed={collapsed} setCollapsed={setCollapsed} />
                <TagComponent navItem={navItem} />
                <Content
                style={{
                    margin: '20px 16px',
                    padding: 24,
                    minHeight: 280,
                    background: 'LightGray',
                    borderRadius: '10px',
                }}
                >
                <Outlet path={outletPath} />
                </Content>
            </Layout>
        </Layout>
    );
}

export default Main;
