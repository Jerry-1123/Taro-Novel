import Taro, { useState, useEffect } from '@tarojs/taro'
import { useSelector } from '@tarojs/redux'
import { createSelector } from 'reselect'
import { View } from '@tarojs/components'

import './book-recommend.scss'

import NovelItem from '@/components/novel-item/novel-item'
import NoMore from '@/components/no-more/no-more'

const selectRecommendList = () => {
    return createSelector(
        [state => state.novel.recommendBookList],
        recommendList => recommendList
    )
}

function BookRecommend() {

    const [bookRecommend, setBookRecommend] = useState([])

    // 推荐视频列表
    const recommendList = useSelector(selectRecommendList())

    useEffect(() => {
        setBookRecommend(recommendList)
    }, [])

    return (
        <View className='recommend'>
            {bookRecommend.map(item => <NovelItem novel={item} key={item._id} />)}
            <NoMore />
        </View>
    )
}

BookRecommend.config = {
    navigationBarTitleText: '你可能会喜欢'
}

export default BookRecommend