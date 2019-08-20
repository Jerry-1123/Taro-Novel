import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Config from '@/config/config'

import './list.scss'

function List({ list = [] }) {

    // 跳转分类详情
    const goCategoryDetail = (item) => () => {
        Taro.navigateTo({
            url: `/pages/category-detail/category-detail?alias=${item.alias}&gender=${item.gender}&name=${item.name}`
        })
    }

    return (
        <View className='books'>
            {list.map((item, index) => {
                return <View className='book' hoverClass='hover'
                    key={String(index)} onClick={goCategoryDetail(item)}>
                    <View className='covers'>
                        <Image className='cover1' src={Config.staticUrl + item.bookCover[0]} />
                        <Image className='cover2' src={Config.staticUrl + item.bookCover[1]} />
                        <Image className='cover3' src={Config.staticUrl + item.bookCover[2]} />
                    </View>
                    <View className='name'>{item.name}</View>
                    <View className='bookCount'>{item.bookCount}本</View>
                </View>
            })}
        </View>
    )
}

export default List