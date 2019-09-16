import Taro, { useState, useEffect, useRouter, useReachBottom, useCallback } from '@tarojs/taro'
import { useSelector, useDispatch } from '@tarojs/redux'
import { createSelector } from 'reselect'
import { View, Text } from '@tarojs/components'

import './book-chapter.scss'

import imgVip from '@/assets/images/vip.png'

const selectChapters = () => {
    return createSelector(
        [state => state.book.chapters],
        chapters => chapters
    )
}

function BookChapter() {

    const router = useRouter()

    // 所有章节列表
    const chapterList = useSelector(selectChapters())

    const [list, setList] = useState([])
    const [index, setIndex] = useState(0)

    useEffect(async () => {
        const { title } = router.params
        Taro.setNavigationBarTitle({ title: title })
        if (chapterList.length === 0) {
            Taro.showModal({
                title: '提示',
                content: '本书暂无章节',
                showCancel: false,
                success: () => {
                    Taro.navigateBack()
                }
            })
        } else {
            setList(chapterList.slice(0, 100))
        }
    }, [])

    const handleGoReader = (item, index) => () => {
        if (item.isVip) {
            Taro.showToast({
                title: 'VIP章节暂未提供',
                icon: 'none'
            })
        } else {
            Taro.navigateTo({
                url: `/pages/reader/reader?index=${index}&link=${item.link}`
            })
        }
    }

    useReachBottom(() => {
        if (list.length !== chapterList.length) {
            setList(list.concat(chapterList.slice((index + 1) * 100, (index + 2) * 100)))
            setIndex(index + 1)
        }
    })

    return (
        <View className='chapter'>
            <View className='list'>
                {list.map((item, index) => {
                    return <View className='list-item' key={String(index)} hoverClass='hover'
                        onClick={handleGoReader(item, index)}>
                        <Text className='index'>{index + 1}.</Text>
                        <Text className='title'>{item.title}</Text>
                        {item.isVip && <Image className='vip' src={imgVip} />}
                    </View>
                })}
            </View>
        </View>
    )
}

export default BookChapter