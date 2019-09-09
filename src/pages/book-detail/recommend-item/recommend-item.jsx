import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Config from '@/config/config'

import './recommend-item.scss'

function RecommendItem({ recommend }) {

    const handleGoDetail = () => {
        Taro.navigateTo({
            url: '/pages/book-detail/book-detail'
        })
    }

    return (
        <View className='recommend' hoverClass='hover' onClick={handleGoDetail}>
            <Image className='cover' src={Config.staticUrl + recommend.cover} mode='widthFix' />
            <View className='title'>{recommend.title}</View>
            <View className='ratio'>{recommend.otherReadRatio}%读过</View>
        </View>
    )
}

export default RecommendItem