import Taro, { useState, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useSelector } from '@tarojs/redux'
import { createSelector } from 'reselect'

import './book-author.scss'

import NovelItem from '@/components/novel-item/novel-item'

const selecAuthorBookList = () => {
    return createSelector(
        [state => state.novel.authorBookList],
        authorBookList => authorBookList
    )
}

function BookAuthor() {

    const [bookList, setBookList] = useState([])

    const authorBookList = useSelector(selecAuthorBookList())

    const { author } = this.$router.params

    useEffect(() => {
        // 设置标题
        Taro.setNavigationBarTitle({ title: author })
        setBookList(authorBookList)
    }, [])

    return (
        <View>
            {bookList.map(item => <NovelItem novel={item} key={item._id} />)}
        </View>
    )
}

export default BookAuthor