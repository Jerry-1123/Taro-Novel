import Taro, { useCallback } from '@tarojs/taro'
import { useDispatch } from '@tarojs/redux'
import { View, Image } from '@tarojs/components'
import Util from '@/util/util'
import Config from '@/config/config'
import {
    dispatchBookDetail,
    dispatchRecommendBookList
} from '@/actions/novel'

import './novel-item.scss'

function NovelItem({ novel = {} }) {
    const dispatch = useDispatch()

    // 获取书籍详情
    const getBookDetail = useCallback(
        id => dispatch(dispatchBookDetail(id)),
        [dispatch]
    )

    // 获取推荐列表
    const getRecommendList = useCallback(
        id => dispatch(dispatchRecommendBookList(id)),
        [dispatch]
    )

    const goBookDetail = (id) => async () => {
        Taro.showLoading()
        await getBookDetail(id)
        await getRecommendList(id)
        Taro.navigateTo({
            url: `/pages/book-detail/book-detail`
        })
        Taro.hideLoading()
    }

    return (
        <View className='item' hoverClass='hover' onClick={goBookDetail(novel._id)}>
            <Image className='cover' src={Config.staticUrl + novel.cover} />
            <View className='right'>
                <View className='wrap'>
                    <View className='name'>{novel.title}</View>
                </View>
                <View className='wrap'>
                    <View className='author'>{novel.author}</View>
                    <View className='split'>|</View>
                    <View className='majorCate'>{novel.majorCate}</View>
                </View>
                <View className='wrap'>
                    <View className='info'>{novel.shortIntro}</View>
                </View>
                <View className='wrap'>
                    <View className='follow'>
                        <Text className='red'>{Util.getFollower(novel.latelyFollower)}</Text>人气
                    </View>
                    <View className='split'>|</View>
                    <View className='ratio'>
                        <Text className='red'>{novel.retentionRatio}%</Text>读者留存
                    </View>
                </View>
            </View>
        </View>
    )
}

export default NovelItem