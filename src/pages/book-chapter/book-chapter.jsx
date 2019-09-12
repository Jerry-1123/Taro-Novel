import Taro, { useState, useEffect, useRouter, useReachBottom } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import API from '@/service/api'

import './book-chapter.scss'

import Loading from '@/components/loading/loading'

function BookChapter() {

    const router = useRouter()

    const [isLoading, setLoading] = useState(true)
    const [chapterList, setChapterList] = useState([])
    const [list, setList] = useState([])
    const [index, setIndex] = useState(0)

    useEffect(async () => {
        const { id, title } = router.params
        Taro.setNavigationBarTitle({ title: title })

        const res1 = await API.Book.getSummaryId(id)
        const summaryId = res1[0]._id
        const res2 = await API.Book.getChapter(summaryId)
        setLoading(false)
        setChapterList(res2.chapters)

        if (res2.chapters.length === 0) {
            Taro.showModal({
                title: '提示',
                content: '本书暂无章节',
                showCancel: false,
                success: () => {
                    Taro.navigateBack()
                }
            })
        } else {
            setList(res2.chapters.slice(0, 100))
        }
    }, [])

    const handleGoReader = (item) => () => {
        Taro.navigateTo({
            url: `/pages/reader/reader?link=${item.link}`
        })
    }

    useReachBottom(() => {
        if (list.length !== chapterList.length) {
            setList(list.concat(chapterList.slice((index + 1) * 100, (index + 2) * 100)))
            setIndex(index + 1)
        }
    })

    return (
        <View className='chapter'>
            <Loading loading={isLoading} />
            <View className='list'>
                {list.map((item, index) => {
                    return <View className='list-item' key={String(index)} hoverClass='hover'
                        onClick={handleGoReader(item)}>
                        <Text className='index'>{index + 1}.</Text>
                        <Text className='title'>{item.title}</Text>
                    </View>
                })}
            </View>
        </View>
    )
}

export default BookChapter