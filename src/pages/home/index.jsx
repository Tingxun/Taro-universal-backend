import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { View, Text, Image } from '@tarojs/components';
import * as Icon from '@ant-design/icons';
import Echarts from '../../components/echarts';
import { getHomeData } from '../../api/index';  
import userImg from '../../assets/images/shadow4.jpg';
import './home.css';

const tableColumns = [
    {
        title: '品牌',
        dataIndex: 'name'
    },
    {
        title: '今日购买',
        dataIndex: 'todayBuy'
    },
    {
        title: '本月购买',
        dataIndex: 'monthBuy'
    },
    {
        title: '总购买',
        dataIndex: 'totalBuy'
    }
]

const countData = [
    {
        name: '今日支付订单',
        value: 1234,
        icon: 'CheckCircleOutlined',
        color: '#2ec7c9'
    },
    {
        name: '今日收藏订单',
        value: 1234,
        icon: 'ClockCircleOutlined',
        color: '#ffb980'
    },
    {
        name: '今日未支付订单',
        value: 1234,
        icon: 'CloseCircleOutlined',
        color: '#5ab1ef'
    },
    {
        name: '本月支付订单',
        value: 1234,
        icon: 'CheckCircleOutlined',
        color: '#2ec7c9'
    },
    {
        name: '本月收藏订单',
        value: 1234,
        icon: 'ClockCircleOutlined',
        color: '#ffb980'
    },
    {
        name: '本月未支付订单',
        value: 1234,
        icon: 'CloseCircleOutlined',
        color: '#5ab1ef'
    }
]
// 动态获取icon，处理菜单数据
const iconToElement = (name) => React.createElement(Icon[name]);
function Home() {
    const [tableData, setTableData] = useState([]);
    const [ echartData, setEchartData ] = useState({});

    // 页面初次渲染完成后请求加载数据
    // React严格模式下组件渲染一次，Effect执行一次会导致下列请求被调用两次
    useEffect(() => {
        // 通过api获取数据
        getHomeData().then(({data}) => {
            // 打印数据
            // console.log(data, 'res');
            // 解构数据
            const {tableData, orderData, videoData, userData} = data.data;
            // 设置表格数据
            setTableData(tableData);
            // 重组订单数据
            const order = orderData;
            const xAxis = order.date;
            const keyArray = Object.keys(order.data[0]);
            let orderSeries = [];
            keyArray.forEach((key) => {
                orderSeries.push({
                    name: key,
                    data: order.data.map(item => item[key]),
                    type: 'line'
                });
            });
            setEchartData({
                order: {
                    xAxis,
                    series: orderSeries
                },
                user: {
                    xAxis: userData.map(item => item.date),
                    series: [
                        {
                            name: '活跃用户',
                            data: userData.map(item => item.active),
                            type: 'bar'
                        },
                        {
                            name: '新增用户',
                            data: userData.map(item => item.new),
                            type: 'bar'
                        }
                    ]
                },
                video: {
                    series: [
                        {
                            name: '视频播放量',
                            data: videoData,
                            type: 'pie'
                        }
                    ]
                }
                });
        });
    }, []);
    
    return (
        <View className='home'>
            <View className='flex-container'>
                <View className='leftcolumn'>
                    <View className='card'>
                        <View className='user'>
                            <Image 
                            className='user-avatar'
                            src={userImg} 
                            mode='aspectFill'
                            style={{borderRadius: '50%', flex: '0 0 120px', width: '120px', height: '120px'}}
                            />
                            <View className='user-info'>
                                <Text style={{fontSize: '25px', marginRight: '10px'}}><b>Adimin</b></Text>
                                <Text>超级管理员</Text>
                            </View>
                        </View>
                        <View className='login-info'>
                                <Text>
                                    <View style={{whiteSpace: 'pre-wrap',marginRight: '15px'}}>上次登录时间:    <span>2025-2-20 17:18</span></View>
                                </Text>
                                <Text>
                                    <View style={{whiteSpace: 'pre-wrap'}}>上次登录地点:    <span>武汉-洪山区-华中科技大学</span></View>
                                </Text>
                        </View>
                    </View>
                    <View className='card'>
                        <Table rowKey={'name'} columns={tableColumns} dataSource={tableData} pagination={false} />
                    </View>
                </View>
                <View className='rightcolumn'>
                    <View className='sale-row'>
                        {countData.map((item, index) => {
                            return (
                                <View 
                                className='card' 
                                key={index}
                                style={{
                                    display: 'flex',
                                    flex: '1 1 100px',
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                    height: '100px',
                                    margin: '8px 4px 4px 4px'}}>
                                    <View className='icon-box' style={{backgroundColor: item.color}}>
                                        {iconToElement(item.icon)}
                                    </View>
                                    <View className='sale-info'>
                                        <Text className='sale-title' style={{ fontSize: '12px' ,color: 'Gray' }}>{item.name}</Text>
                                        <Text className='sale-value' style={{ fontSize: '18px' }}><b>￥</b>{item.value}</Text>
                                    </View>
                                </View>
                            )}
                        )}
                    </View>
                    <View className='chart-row' style={{justifyContent: 'center'}}>
                        <View 
                        className='card'
                        style={{
                            display: 'flex', 
                            height: '200px', 
                            width: '490px',  // 从680px缩小
                            alignItems: 'center',
                            margin: '10px 0'  // 增加上下边距
                        }}>
                            {echartData.order&&
                            <Echarts 
                                chartData={echartData.order} 
                                isAxisChart='true' 
                                style={{height: '240px', width: '490px'}}  // 相应缩小
                            />}
                        </View>
                    </View>
                    <View className='chart-row' style={{justifyContent: 'space-between'}}>
                        {echartData.video&&
                            <Echarts 
                                chartData={echartData.video} 
                                isAxisChart='false'
                                style={{
                                    height: '200px', 
                                    width: '200px',  // 从300px缩小
                                    margin: '0 5px'  // 调整边距
                                }}
                            />}
                        {echartData.user&&
                            <Echarts 
                                chartData={echartData.user} 
                                isAxisChart='true'
                                style={{
                                    height: '200px', 
                                    width: '270px',  // 从380px缩小
                                    margin: '0 5px'  // 调整边距
                                }}
                            />}
                    </View>
                </View>
            </View>
        </View>
    );
}

export default Home;