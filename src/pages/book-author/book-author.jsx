import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View } from '@tarojs/components'
import API from '@/service/api'

import './book-author.scss'

import Loading from '@/components/loading/loading'
import NovelItem from '@/components/novel-item/novel-item'
import NoMore from '@/components/no-more/no-more'

function BookAuthor() {

    const router = useRouter()

    const [isLoading, setLoading] = useState(true)
    const [bookList, setBookList] = useState([])

    useEffect(async () => {
        const author = router.params.author
        const res = await API.Book.getAuthorBookList(author)
        setBookList(res.books)
        setLoading(false)
    }, [])

    return (
        <View className='author'>
            <Loading loading={isLoading} />
            {bookList.length > 0 && <View className='list'>
                {bookList.map((item, index) => {
                    return <NovelItem key={item._id} novel={item} />
                })}
                <NoMore />
            </View>}
        </View>
    )
}

BookAuthor.config = {
    navigationBarTitleText: '作者书单'
}

export default BookAuthor