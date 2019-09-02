import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Config from '@/config/config'

import './item.scss'

function Item({ item }) {

    // 跳转分类详情
    const clickCategoryItem = () => {
        Taro.navigateTo({
            url: `/pages/category-detail/category-detail?alias=${item.alias}&gender=${item.gender}&name=${item.name}`
        })
    }

    return (
        <View className='book' hoverClass='hover' onClick={clickCategoryItem}>
            <View className='covers'>
                <Image className='cover1' src={Config.staticUrl + item.bookCover[0]} />
                <Image className='cover2' src={Config.staticUrl + item.bookCover[1]} />
                <Image className='cover3' src={Config.staticUrl + item.bookCover[2]} />
            </View>
            <View className='name'>{item.name}</View>
            <View className='bookCount'>{item.bookCount}本</View>
        </View>
    )
}

export default Item