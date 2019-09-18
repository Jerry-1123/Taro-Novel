import Taro, { useEffect } from '@tarojs/taro'
import { View, OpenData } from '@tarojs/components'

import './user.scss'

function User() {

    // github主页
    // 设置 清除缓存
    // 关于

    return (
        <View className='user'>
            <View className='avatar'>
                <OpenData type='userAvatarUrl'></OpenData>
            </View>
            <View className='nickname'>
                <OpenData type='userNickName'></OpenData>
            </View>
        </View>
    )
}

User.config = {
    navigationBarTitleText: '我的'
}

export default User