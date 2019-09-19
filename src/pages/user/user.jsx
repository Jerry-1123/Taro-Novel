import Taro, { useEffect } from '@tarojs/taro'
import { View, OpenData } from '@tarojs/components'

import './user.scss'

function User() {

    // github主页
    // 设置 清除缓存
    // 关于

    const handleClickPage = () => {
        Taro.setClipboardData({
            data: 'xx'
        }).then(res => {
            console.log(res)
        })
    }

    const handleClickSetting = () => {
        Taro.navigateTo({
            url: '/pages/setting/setting'
        })
    }

    const handleClickAbout = () => {
        Taro.navigateTo({
            url: '/pages/about/about'
        })
    }

    return (
        <View className='user'>
            <View className='avatar'>
                <OpenData type='userAvatarUrl'></OpenData>
            </View>
            <View className='nickname'>
                <OpenData type='userNickName'></OpenData>
            </View>
            <View className='github' hoverClass='hover' onClick={handleClickPage}>项目地址</View>
            <View className='setting' hoverClass='hover' onClick={handleClickSetting}>设置</View>
            <View className='about' hoverClass='hover' onClick={handleClickAbout}>关于</View>
        </View>
    )
}

User.config = {
    navigationBarTitleText: '我的'
}

export default User