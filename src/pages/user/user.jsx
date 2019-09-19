import Taro from '@tarojs/taro'
import { View, OpenData } from '@tarojs/components'
import Config from '@/config/config'

import './user.scss'

function User() {

    const handleClickPage = () => {
        Taro.setClipboardData({
            data: 'https://github.com/Jerry-1123/X-Novel'
        }).then(res => {
            console.log(res)
        })
    }

    const handleClickSetting = () => {
        Taro.clearStorageSync()
        Taro.showToast({
            title: '清理成功',
            icon: 'success'
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
            <View className='version'>{Config.version}</View>
            <View className='github' hoverClass='hover' onClick={handleClickPage}>项目地址</View>
            <View className='setting' hoverClass='hover' onClick={handleClickSetting}>清除缓存</View>
            <View className='about' hoverClass='hover' onClick={handleClickAbout}>关于</View>
        </View>
    )
}

User.config = {
    navigationBarTitleText: '我的'
}

export default User