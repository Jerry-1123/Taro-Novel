import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Config from '@/config/config'

import './novel-item.scss'

function NovelItem({ novel }) {

    const clickNovelItem = () => {
        Taro.navigateTo({
            url: `/pages/book-detail/book-detail?id=${novel._id}`
        })
    }

    return (
        <View className='novel' hoverClass='hover' onClick={clickNovelItem}>
            <Image className='cover' src={Config.staticUrl + novel.cover} />
            <View className='right'>
                <View className='title'>{novel.title}</View>
                <View className='shortIntro'>{novel.shortIntro}</View>
                <View className='bottom'>
                    <View className='author'>{novel.author}</View>
                    <View className='info'>
                        <View className='cate'>{novel.minorCate}</View>
                        <View className='latelyFollower'>{novel.latelyFollower}人气</View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default NovelItem