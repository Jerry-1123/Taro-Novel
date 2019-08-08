import Taro, { useCallback } from '@tarojs/taro'
import { useDispatch } from '@tarojs/redux'
import { View } from '@tarojs/components'
import Config from '@/config/config'
import {
    dispatchBookDetail,
    dispatchRecommendList
} from '@/actions/novel'

import './recommend.scss'

function Recommend({ recommendList = [] }) {
    const dispatch = useDispatch()

    // 获取书籍详情
    const getBookDetail = useCallback(
        id => dispatch(dispatchBookDetail(id)),
        [dispatch]
    )

    // 获取推荐列表
    const getRecommendList = useCallback(
        id => dispatch(dispatchRecommendList(id)),
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

    const goBookRecommend = () => {
        Taro.navigateTo({
            url: `/pages/book-recommend/book-recommend`
        })
    }

    return (
        <View>
            <View className='box'>
                <View className='tip'>你可能会喜欢</View>
                <View className='more' hoverClass='hover' onClick={goBookRecommend}>更多</View>
            </View>
            <View className='comment'>
                {recommendList.slice(0, 4).map((item, index) => {
                    return <View className='comment-item' hoverClass='hover'
                        key={String(index)} onClick={goBookDetail(item._id)}>
                        <Image className='cover' src={Config.staticUrl + item.cover} />
                        <View className='title'>{item.title}</View>
                    </View>
                })}
            </View>
        </View>
    )
}

export default Recommend