import Taro, { useState, useEffect, useRouter, useCallback, useDidShow } from '@tarojs/taro'
import { useDispatch } from '@tarojs/redux'
import { View, Image } from '@tarojs/components'
import API from '@/service/api'
import Config from '@/config/config'
import Util from '@/utils/util'
import { format } from 'timeago.js'
import {
    dispatchChapters
} from '@/actions/book'

import './book-detail.scss'

import { AtRate } from 'taro-ui'
import Modal from '@/components/modal/modal'
import Blank from '@/components/blank/blank'
import TagItem from './tag-item/tag-item'
import CommentItem from './comment-item/comment-item'
import RecommendItem from './recommend-item/recommend-item'

function BookDetail() {

    const router = useRouter()
    const dispatch = useDispatch()

    const [showDetail, setShowDetail] = useState(false)
    const [bookDetail, setBookDetail] = useState(null)
    const [bookComments, setBookComments] = useState([])
    const [bookCommentsTotal, setBookCommentsTotal] = useState(0)
    const [bookRecommends, setBookRecommends] = useState([])
    const [allBooks, setAllBooks] = useState([])

    // 获取所有章节列表
    const getChapterList = useCallback(
        (id) => dispatch(dispatchChapters(id)),
        [dispatch]
    )

    useEffect(async () => {
        const id = router.params.id
        // 获取基本详情
        initBookDetail(id)
        // 获取书评
        initCommentList(id)
        // 获取推荐列表
        initRecommendList(id)
        // 获取目录列表
        initChapterList(id)
    }, [])

    useDidShow(() => {
        // 获取本地缓存书籍
        setAllBooks(Taro.getStorageSync('books'))
    })

    const initBookDetail = async id => {
        Taro.showLoading({
            title: '加载中...'
        })
        const res = await API.Book.getDetail(id)
        setBookDetail(res)
        Taro.setNavigationBarTitle({
            title: res.title
        })
        Taro.hideLoading()
    }

    const initCommentList = async id => {
        const res = await API.Book.getCommentReview(id)
        setBookComments(res.reviews)
        setBookCommentsTotal(res.total)
    }

    const initRecommendList = async id => {
        const res = await API.Book.getRecommendList(id)
        setBookRecommends(res.books)
    }

    const initChapterList = async id => {
        getChapterList(id)
    }

    // 显示详情
    const handleShowDetail = () => {
        setShowDetail(true)
    }

    // 关闭详情
    const handleCloseDetail = () => {
        setShowDetail(false)
    }

    // 跳转作者详情
    const handleGoAuthor = () => {
        Taro.navigateTo({
            url: `/pages/book-author/book-author?author=${bookDetail.author}`
        })
    }

    // 跳转章节
    const handleGoChapter = async () => {
        Taro.navigateTo({
            url: `/pages/book-chapter/book-chapter?title=${bookDetail.title}`
        })
    }

    // 跳转评论
    const handleGoComment = () => {
        Taro.navigateTo({
            url: `/pages/book-comment/book-comment?id=${bookDetail._id}&title=${bookDetail.title}&author=${bookDetail.author}&cover=${bookDetail.cover}&popularity=${bookDetail.latelyFollower}`
        })
    }

    // 跳转推荐列表
    const handleGoRecommend = () => {
        Taro.navigateTo({
            url: `/pages/book-recommend/book-recommend?id=${bookDetail._id}`
        })
    }

    // 添加到本地
    const handleAddToLocal = () => {
        let books = Taro.getStorageSync('books') || []
        let book = {
            _id: bookDetail._id,
            title: bookDetail.title,
            cover: bookDetail.cover
        }
        if (!Util.isInArray(allBooks, bookDetail._id)) {
            books.unshift(book)
            Taro.setStorageSync('books', books)
            Taro.switchTab({
                url: '/pages/index/index'
            })
            Taro.showToast({
                title: '添加成功',
                icon: "success"
            })
        }
    }

    // 开始阅读(默认从0开始，如果本地有缓存跳转到看过的页面)
    const handleGoRead = async () => {
        let books = Taro.getStorageSync('books') || []
        let booksIndex = Util.findIndexInArray(bookDetail, books)
        if (booksIndex !== -1) {
            books.splice(booksIndex, 1)
            Taro.setStorageSync('books', books)
            let book = {
                _id: bookDetail._id,
                title: bookDetail.title,
                cover: bookDetail.cover
            }
            books.unshift(book)
            Taro.setStorageSync('books', books)
        }

        const chapterIndex = Taro.getStorageSync(bookDetail._id) || 0
        Taro.navigateTo({
            url: `/pages/reader/reader?index=${chapterIndex}`
        })
    }

    return (
        <View className='detail'>
            {bookDetail !== null && <View>
                {/* 顶部信息 */}
                <View className='header'>
                    <View className='info'>
                        <Image className='cover' src={Config.staticUrl + bookDetail.cover} />
                        <View className='desc'>
                            <View className='title'>{bookDetail.title}</View>
                            <View className='sku'>
                                <View className='author' hoverClass='hover' onClick={handleGoAuthor}>{bookDetail.author}</View>
                                <View className='line' />
                                <View className='cate'>{bookDetail.minorCate}</View>
                            </View>
                            <View className='sku'>
                                <AtRate className='evaluate' value={bookDetail.rating.score / 2} size={12} />
                                <View className='score'>{bookDetail.rating.score}分</View>
                                <View className='tip'>{bookDetail.rating.tip}</View>
                            </View>
                            <View className='sku'>
                                <View className='word-count'>{Util.getWordCount(bookDetail.wordCount)}字</View>
                                <View className='line' />
                                <View className='update'>{format(bookDetail.updated, 'zh_CN')}更新</View>
                            </View>
                        </View>
                    </View>
                    <View className='bar'>
                        <View className='sku'>
                            <View className='key'>追书人气</View>
                            <View className='val'>{bookDetail.latelyFollower}</View>
                        </View>
                        <View className='sku'>
                            <View className='key'>读者留存</View>
                            <View className='val'>{bookDetail.retentionRatio}%</View>
                        </View>
                        <View className='sku'>
                            <View className='key'>社区贴子</View>
                            <View className='val'>{bookDetail.postCount}</View>
                        </View>
                        <View className='sku'>
                            <View className='key'>日更新字</View>
                            <View className='val'>{bookDetail.serializeWordCount}</View>
                        </View>
                    </View>
                </View>
                <View className='divider' />
                {/* 简介 */}
                <View className='section'>
                    <View className='line' />
                    <View className='title'>简介</View>
                </View>
                <View className='intro' hoverClass='hover' onClick={handleShowDetail}>{bookDetail.longIntro}</View>
                <View className='divider' />
                {/* 目录 */}
                <View className='section'>
                    <View className='line' />
                    <View className='title'>目录</View>
                </View>
                <View className='catalog' hoverClass='hover' onClick={handleGoChapter}>
                    <View className='update'>{format(bookDetail.updated, 'zh_CN')}更新</View>
                    <View className='chapter'>{bookDetail.lastChapter}</View>
                </View>
                <View className='divider' />
                {/* 标签 */}
                {(bookDetail !== null && bookDetail.tags.length > 0) && <View>
                    <View className='section'>
                        <View className='line' />
                        <View className='title'>标签</View>
                    </View>
                    <View className='tags'>
                        {bookDetail.tags.map((item, index) => {
                            return <TagItem tag={item} key={String(index)} />
                        })}
                    </View>
                    <View className='divider' />
                </View>}
                {/* 书评 */}
                {bookComments.length > 0 && <View>
                    <View className='section'>
                        <View className='line' />
                        <View className='title'>书评</View>
                    </View>
                    <View className='comments'>
                        {bookComments.map((item, index) => {
                            return <CommentItem comment={item} key={String(index)} />
                        })}
                        <View className='more-comments' hoverClass='hover' onClick={handleGoComment}>
                            全部书评{bookCommentsTotal}条
                    </View>
                    </View>
                    <View className='divider' />
                </View>}
                {/* 推荐 */}
                {bookRecommends.length > 0 && <View>
                    <View className='section'>
                        <View className='line' />
                        <View className='title'>猜你喜欢</View>
                        <View className='more-recommend' hoverClass='hover' onClick={handleGoRecommend}>更多</View>
                    </View>
                    <View className='recommends'>
                        {bookRecommends.slice(0, 4).map((item, index) => {
                            return <RecommendItem recommend={item} key={String(index)} />
                        })}
                    </View>
                    <View className='divider' />
                </View>}
                {/* 图书信息 */}
                <View className='section'>
                    <View className='line' />
                    <View className='title'>图书信息</View>
                </View>
                <View className='copyright'>{bookDetail.copyrightInfo}</View>
                {/* 操作栏 */}
                <View className='action-bar'>
                    {(allBooks.length > 0 && bookDetail !== null && Util.isInArray(allBooks, bookDetail._id))
                        ? <View className='action add' hoverClass='hover'>已加入书架</View>
                        : <View className='action add' hoverClass='hover' onClick={handleAddToLocal}>加入书架</View>}
                    <View className='action read' hoverClass='hover' onClick={handleGoRead}>开始阅读</View>
                </View>
                <Modal title='简介'
                    content={bookDetail.longIntro}
                    visible={showDetail}
                    onClose={handleCloseDetail} />
            </View>}
            <Blank />
        </View>
    )
}

export default BookDetail