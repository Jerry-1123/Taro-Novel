import Taro, { useState, useEffect } from '@tarojs/taro'
import { useSelector } from '@tarojs/redux'
import { createSelector } from 'reselect'
import { View } from '@tarojs/components'

import './book-tag.scss'

import NovelItem from '@/components/novel-item/novel-item'

const selectTagBookList = () => {
    return createSelector(
        [state => state.novel.tagBookList],
        tagBookList => tagBookList
    )
}

function BookTag() {

    const [bookList, setBookList] = useState([])

    const tagBookList = useSelector(selectTagBookList())

    const { tag } = this.$router.params

    useEffect(() => {
        // 设置标题
        Taro.setNavigationBarTitle({ title: tag })
        setBookList(tagBookList)
    }, [])

    return (
        <View>
            {bookList.map(item => <NovelItem novel={item} key={item._id} />)}
        </View>
    )
}

export default BookTag