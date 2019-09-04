import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './tag-item.scss'

function TagItem({tag}) {

    return (
        <View className='tag'>{tag}</View>
    )
}

export default TagItem