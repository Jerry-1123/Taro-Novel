import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './mall.scss'

function Mall() {
    return (
        <View className='mall'>
            <View className='search'>请输入书名或者作者名</View>
        </View>
    )
}

Mall.config = {
    navigationBarTitleText: '书城'
}

export default Mall