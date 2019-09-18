import Taro, { useCallback } from '@tarojs/taro'
import { useDispatch } from '@tarojs/redux'
import { View, Image } from '@tarojs/components'
import Config from '@/config/config'
import Util from '@/utils/util'
import {
    dispatchChapters
} from '@/actions/book'

import './item.scss'

function Item({ item }) {

    const dispatch = useDispatch()

    // 获取所有章节列表
    const getChapterList = useCallback(
        (id) => dispatch(dispatchChapters(id)),
        [dispatch]
    )

    const handleClickItem = async () => {
        let books = Taro.getStorageSync('books') || []
        let booksIndex = Util.findIndexInArray(item, books)
        // 删除列表
        books.splice(booksIndex, 1)
        // 加入列表头部
        books.unshift(item)
        // 存入本地
        Taro.setStorageSync('books', books)
        // 获取目录
        Taro.showLoading({
            title: '加载中...'
        })
        await getChapterList(item._id)
        Taro.hideLoading()
        // 跳转阅读
        const chapterIndex = Taro.getStorageSync(item._id) || 0
        Taro.navigateTo({
            url: `/pages/reader/reader?index=${chapterIndex}`
        })
    }

    const handleLongClickItem = () => {
        Taro.showActionSheet({
            itemList: ['查看详情', '删除本书']
        }).then(res => {
            const { tapIndex } = res
            switch (tapIndex) {
                case 0:
                    Taro.navigateTo({
                        url: `/pages/book-detail/book-detail?id=${item._id}`
                    })
                    break
                case 1:
                    Taro.showModal({
                        title: '提示',
                        content: '确定要删除本书吗?',
                        success: res => {
                            if (res.confirm) {
                                let books = Taro.getStorageSync('books') || []
                                let booksIndex = Util.findIndexInArray(item, books)
                                books.splice(booksIndex, 1)
                                Taro.setStorageSync('books', books)
                                this.props.onRefreshBooks()
                            }
                        }
                    })
                    break
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <View className='item' hoverClass='hover' onClick={handleClickItem} onLongPress={handleLongClickItem}>
            <Image className='cover' src={Config.staticUrl + item.cover} />
            <View className='title'>{item.title}</View>
        </View>
    )
}

export default Item