import React from 'react';  
import { useState, useEffect } from 'react';
import { View, Input, Button } from '@tarojs/components';
import './user.css';
import { getUserList, createUser, updateUser, deleteUser } from '../../api/index';
import { Table, Popconfirm, Modal} from 'antd';
import UserInfoForm from '../../components/form/userInfoForm';


function User() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: null,
        addr: '',
        birth: ''
    });
    const [tableData, setTableData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editType, setEditType] = useState('');

    // 表格组件栏目及其渲染对象
    const tableColumns = [
        {
            title: '姓名',
            dataIndex: 'name'
        },
        {
            title: '年龄',
            dataIndex: 'age'
        },
        {
            title: '性别',
            dataIndex: 'gender',
            render:(record) => {
                return (record === '1') ? '男' : '女';
            }
        },
        {
            title: '地址',
            dataIndex: 'addr'
        },
        {
            title: '出生日期',
            dataIndex: 'birth'
        },
        {
            title: '操作',
            render: (rowData) => (
                <View className='table-btn'>
                    <Button
                    className="edit-btn" 
                    onClick={() => {
                        setFormData({
                            id : rowData.id,
                            name: rowData.name,
                            age: rowData.age,
                            gender: rowData.gender,
                            addr: rowData.addr,
                            birth: rowData.birth,
                        });
                        handleEdit('edit');}}
                        >编辑</Button>
                    <Popconfirm
                        title="提示"
                        description="此操作将删除用户，是否继续？"
                        onConfirm={() => handleDelete(rowData.id)}
                        okText="确定"
                        cancelText="取消"
                    ><Button 
                    className="delete-btn" 
                    onClick={() => {
                        setFormData({
                        id : rowData.id,
                    });}} >删除</Button>
                    </Popconfirm>
                </View>
            )
        }
    ]

    // 获取用户数据
    function getUserData() {
        getUserList().then((data) => {
            // console.log(data, 'res');
            const { items } = data.data;
            const tableData = items.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    gender: item.gender,
                    addr: item.addr,
                    age: item.age,
                    birth: item.birth,
                }
            });
            setTableData(tableData);
    });
    };

    useEffect(() => {
        getUserData();
    }, []);

    // 删除用户
    function handleDelete(id) { 
        deleteUser({id}).then(() => {
            getUserData();
        })
    };
    // 控制弹窗动作和编辑类型
    function handleEdit(type) {
        setIsModalOpen(true);
        setEditType(type);
        if (type === 'add') {
            setFormData({
                name: '',
                age: '',
                gender: '',
                addr: '',
                birth: ''
            });
        }
    };
    // 反馈输入变化
    function handleInputChange(e) {
        console.log('userInfoFormData', e.target); // 调试：打印输入值
        if (e.target.type === 'radio') {
            setFormData({
                ...formData,
                [e.target.name]: parseInt(e.target.value, 10)
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
        console.log('processedFormData', formData); // 调试：打印输入值
    };
    // 搜索用户
    function handleSearch() {
        // 获取用户数据
        getUserList({
            name: formData.name,
        }).then((data) => {
            const { items } = data.data;
            setTableData(items);
        }).catch(error => {
            console.error('搜索失败:', error); // 调试：捕获并打印错误
        });
        // 重置输入框
        setFormData({
            name: '',
        });
    };
    // 表单验证
    function formValidation(formData) {
        const errors = {};
    
        // 检查姓名是否为空
        if (!formData.name) {
            errors.name = '姓名不能为空';
        }
    
        // 检查年龄是否为空且为数字
        if (!formData.age) {
            errors.age = '年龄不能为空';
        } else if (isNaN(formData.age)) {
            errors.age = '年龄必须是数字';
        }
    
        // 检查性别是否为 0 或 1
        if (formData.gender !== '0' && formData.gender !== '1') {
            errors.gender = '请选择性别';
        }
    
        // 检查地址是否为空
        if (!formData.addr) {
            errors.addr = '地址不能为空';
        }
    
        // 检查出生日期是否为空
        if (!formData.birth) {
            errors.birth = '出生日期不能为空';
        }
    
        // 如果有错误，打印错误信息并返回 false
        if (Object.keys(errors).length > 0) {
            console.error('表单验证失败:', errors);
            return false;
        }
        // 如果没有错误，返回 true
        return true;
    }

    // 处理弹窗确定事件
    function handleOk () {
        // console.log(editType);
        if (formValidation(formData)) {
            if (editType === 'add') {
                createUser(formData).then(() => {
                    setIsModalOpen(false);
                    getUserData();
                });
            }else if (editType === 'edit') {
                updateUser(formData).then(() => {
                    setIsModalOpen(false);
                    getUserData();
                });
            }
        }

    }
    return (
        <View className='user-container'>
            <View className='search-bar'>
                <Button className='add-btn' onClick={() => handleEdit('add')} >+新增</Button>
                <Input 
                    type="text" name='name' placeholder="    请输入用户名" 
                    onChange={(e) => handleInputChange(e)} />
                <Button 
                    className='search-btn' formType='submit'
                    onClick={(e) => {console.log('e', e);e.preventDefault();handleSearch()}}
                >搜索</Button>
            </View>
            <View className='card' sytle={{marginTop: '0'}}>
                <Table rowKey={'id'} columns={tableColumns} dataSource={tableData} pagination={false} />
            </View>
            <Modal
                title={(editType !== '') &&editType === 'add' ? '新增用户' : '编辑用户'}
                open={isModalOpen}
                onOk={() => {handleOk()}}
                onCancel={() => {
                    setIsModalOpen(false);
                    setFormData({
                        name: '',
                        age: '',
                        gender: '',
                        addr: '',
                        birth: ''
                    });
                }}
                okText="确定"
                cancelText="取消"
            >
                <UserInfoForm handleInputChange={handleInputChange} formData={formData} />
            </Modal>
        </View>
    );
}

export default User;