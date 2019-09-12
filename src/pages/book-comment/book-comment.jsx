import Taro, { useState, useEffect, useRouter, useReachBottom, usePageScroll } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import API from '@/service/api'
import Config from '@/config/config'
import Util from '@/utils/util'
import classNames from 'classnames'

import './book-comment.scss'

import Loading from '@/components/loading/loading'
import Comment from './comment/comment'

const sortTypeList = [
    {
        name: '默认',
        type: 'updated'
    },
    {
        name: '最新',
        type: 'created'
    },
    {
        name: '最热',
        type: 'comment-count'
    }
]

function BookComment() {

    const router = useRouter()

    const [bookId, setBookId] = useState(0)                 // 书籍编号
    const [isLoading, setLoading] = useState(true)          // 加载状态
    const [title, setTitle] = useState('')                  // 标题 
    const [author, setAuthor] = useState('')                // 作者
    const [cover, setCover] = useState('')                  // 封面
    const [popularity, setPopularity] = useState(0)         // 人气
    const [comments, setComments] = useState([])            // 书评列表
    const [totalComments, setTotalComments] = useState(0)   // 总书评
    const [pageIndex, setPageIndex] = useState(0)           // 页面下标
    const [sortIndex, setSortIndex] = useState(0)           // 排序状态
    const [fixBar, setFixBar] = useState(false)             // 操作栏悬浮状态
    const [scrollTopHeight, setScrollTopHeight] = useState(0)

    useEffect(async () => {
        const {
            id,
            title,
            author,
            cover,
            popularity
        } = router.params
        setBookId(id)
        setTitle(title)
        setAuthor(author)
        setCover(cover)
        setPopularity(popularity)

        const query = Taro.createSelectorQuery(this)
        query.select('#bar').boundingClientRect(res => {
            setScrollTopHeight(res.top)
        })
        query.exec()
    }, [])

    useEffect(() => {
        // 拉取数据
        getList()
    }, [pageIndex, bookId, sortIndex])

    usePageScroll(res => {
        if (res.scrollTop >= scrollTopHeight) {
            setFixBar(true)
        }else{
            setFixBar(false)
        }
    })

    useReachBottom(() => {
        if (comments.length !== totalComments) {
            setPageIndex(pageIndex + 1)
        }
    })

    const getList = async () => {
        if (bookId === 0) {
            return
        }
        setLoading(true)
        const params = {
            book: bookId,
            start: pageIndex * 20,
            limit: 20,
            sort: sortTypeList[sortIndex].type
        }
        const res = await API.Book.getComments(params)
        setTotalComments(res.total)
        setLoading(false)
        if (pageIndex === 0) {
            setComments(res.reviews)
        } else {
            setComments(comments.concat(res.reviews))
        }
    }

    const handleClickSortType = (index) => () => {
        setSortIndex(index)
        setPageIndex(0)
    }

    return (
        <View className='comment'>
            <Loading loading={isLoading} />
            <View className='header'>
                <Image className='cover' src={Config.staticUrl + cover} />
                <View className='desc'>
                    <View className='title'>{title}</View>
                    <View className='author'>{author}</View>
                    <View className='popularity'>讨论区人气：{Util.getFollower(popularity)}</View>
                </View>
            </View>
            {fixBar && <View className='bar fixed'>
                <View className='total'>{totalComments}条书评</View>
                <View className='action'>
                    {sortTypeList.map((item, index) => {
                        return <View className={classNames({
                            'action-item': true,
                            'action-item-selected': sortIndex === index
                        })} key={String(index)} onClick={handleClickSortType(index)}>
                            {item.name}
                        </View>
                    })}
                </View>
            </View>}
            <View id='bar' className='bar'>
                <View className='total'>{totalComments}条书评</View>
                <View className='action'>
                    {sortTypeList.map((item, index) => {
                        return <View className={classNames({
                            'action-item': true,
                            'action-item-selected': sortIndex === index
                        })} key={String(index)} onClick={handleClickSortType(index)}>
                            {item.name}
                        </View>
                    })}
                </View>
            </View>
            <View className='list'>
                {comments.map((item, index) => {
                    return <Comment comment={item} key={String(index)} />
                })}
            </View>
        </View >
    )
}

BookComment.config = {
    navigationBarTitleText: '书评'
}

export default BookComment