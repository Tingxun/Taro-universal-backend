import React from 'react';
import Taro from '@tarojs/taro';
import * as Icon from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import menuList from '../../config';

const { Sider } = Layout;
//动态获取icon，处理菜单数据
const iconToElement = (name) => React.createElement(Icon[name]);
const items = menuList.map(m => {
    //没有子菜单
    const item = {
        key: m.path,
        icon: iconToElement(m.icon),
        label: m.label,
    }
    if (m.children) {
        item.children = m.children.map(c => ({
            key: c.path,
            label: c.label,
        }))
    }
    return item;
})

function AsideComponent({collapsed, setNavItem, setOutletPath}) {
    // 菜单导航
    function menuNavigate(e) { 
        console.log("menuInfo", e.key);
        setOutletPath(`/pages${e.key}/index`);
        let data;
        menuList.forEach( item => {
            if (item.path === e.key) {
                data = item;
            } else if (item.children) {
                item.children.forEach(childItem => {
                    if (childItem.path === e.key) {
                        data = childItem;
                    }
                })
            }
        })
        setNavItem(data);
    }

    return (
        <Sider trigger={null} collapsible='ture' collapsed={collapsed}>
            <h3 className="app-name" style={{ fontSize: collapsed ? 0 : 20 }}>通用后台管理系统</h3>
            <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={items}
            style={{height: '100%'}}
            onClick={(e) => {menuNavigate(e)}}
            />
        </Sider>
    );
}

export default AsideComponent;