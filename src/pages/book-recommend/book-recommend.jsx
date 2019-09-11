import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View } from '@tarojs/components'
import API from '@/service/api'

import './book-recommend.scss'

import Loading from '@/components/loading/loading'
import NovelItem from '@/components/novel-item/novel-item'
import NoMore from '@/components/no-more/no-more'

function BookRecommend() {

    const router = useRouter()

    const [isLoading, setLoading] = useState(true)
    const [bookList, setBookList] = useState([])

    useEffect(async () => {
        const id = router.params.id
        const res = await API.Book.getRecommendList(id)
        setBookList(res.books)
        setLoading(false)
    }, [])

    return (
        <View className='recommend'>
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

BookRecommend.config = {
    navigationBarTitleText: '猜你喜欢'
}

export default BookRecommend