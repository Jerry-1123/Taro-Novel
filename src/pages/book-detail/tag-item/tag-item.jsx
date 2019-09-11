import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './tag-item.scss'

function TagItem({ tag }) {


    const handleGoTag = () => {
        Taro.navigateTo({
            url: `/pages/book-tag/book-tag?tag=${tag}`
        })
    }

    return (
        <View className='tag' hoverClass='hover' onClick={handleGoTag}>{tag}</View>
    )
}

export default TagItem