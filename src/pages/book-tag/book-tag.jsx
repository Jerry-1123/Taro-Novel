import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View } from '@tarojs/components'
import API from '@/service/api'

import './book-tag.scss'

import Loading from '@/components/loading/loading'
import NovelItem from '@/components/novel-item/novel-item'
import NoMore from '@/components/no-more/no-more'

function BookTag() {

    const router = useRouter()

    const [isLoading, setLoading] = useState(true)
    const [bookList, setBookList] = useState([])

    useEffect(async () => {
        const tag = router.params.tag
        Taro.setNavigationBarTitle({ title: tag })
        const res = await API.Book.getTagBookList(tag)
        setBookList(res.books)
        setLoading(false)
    }, [])

    return (
        <View className='tag'>
            <Loading loading={isLoading} />
            {bookList.length > 0 && <View className='list'>
                {bookList.map((item, index) => {
                    return <NovelItem key={item._id} novel={item} />
                })}
                <NoMore />
            </View>}
            {bookList.length === 0 && <NoMore />}
        </View>
    )
}

export default BookTag