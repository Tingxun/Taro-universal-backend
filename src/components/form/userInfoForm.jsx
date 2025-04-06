import { View, Input, Label, Radio, RadioGroup } from '@tarojs/components'
import './form.css'
// 用户信息表单
function UserInfoForm({handleInputChange, formData}) {
    return (
        <View className='modal-form'>
            <Label>
                <span className="required-asterisk">*</span>姓名：
                <Input 
                    type='text'
                    name='name'
                    placeholder='请输入姓名'
                    value={formData.name}
                    onInput={(e) => handleInputChange(e)}
                    required
                />
            </Label>

            <Label>
                <span className="required-asterisk">*</span>年龄：
                <Input 
                    type='number'
                    name='age'
                    placeholder='请输入年龄'
                    value={formData.age}
                    onInput={(e) => handleInputChange(e)}
                    required
                />
            </Label>

            <Label>
                <span className="required-asterisk">*</span>性别：
                <RadioGroup 
                    onChange={(e) => {
                            handleInputChange({
                                target: {
                                    name: 'gender', 
                                    value: e.detail.value,                     
                                        }
                            })
                            }
                        }>
                    <View className='radio-label'>
                        <Label><Radio value={1} checked={formData.gender === 1}>男</Radio></Label>
                        <Label><Radio value={0} checked={formData.gender === 0}>女</Radio></Label>
                    </View>
                </RadioGroup>
            </Label>
                <Label><span className="required-asterisk">*</span>地址：</Label>
                <Input 
                    type='text'
                    name='addr'
                    placeholder='请输入地址'
                    value={formData.addr}
                    onInput={(e) => handleInputChange(e)}
                    required
                />
                <Label><span className="required-asterisk">*</span>出生日期：</Label>
                <Input 
                    type='date'
                    name='birth'
                    style={{width: '150px', marginBottom: '0'}}  // 移除左侧边距，统一底部边距
                    placeholder='请输入出生日期'
                    value={formData.birth}
                    onInput={(e) => handleInputChange(e)}
                    required
                />
        </View>
    )
}

export default UserInfoForm;