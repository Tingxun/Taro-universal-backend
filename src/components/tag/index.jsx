import { Tag, Space} from 'antd';
import Taro from '@tarojs/taro';
import './tag.css'

function TagComponent({navItem}){
    console.log('navItem:', navItem.label);
    function handleClose(){
    Taro.redirectTo({url: '/pages/home/index'})
    };
    return (
        <Space size={[0,8]} wrap>
            <Tag>首页</Tag>
            <Tag closeIcon color='#55acee' onClose={() => {handleClose()}}>{navItem.label}</Tag>
        </Space>
    )
}

export default TagComponent;