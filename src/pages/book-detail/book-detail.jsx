import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import API from '@/service/api'
import Config from '@/config/config'
import Util from '@/utils/util'
import { format } from 'timeago.js'

import './book-detail.scss'

import { AtRate } from 'taro-ui'
import Loading from '@/components/loading/loading'
import Modal from '@/components/modal/modal'
import TagItem from './tag-item/tag-item'
import CommentItem from './comment-item/comment-item'
import RecommendItem from './recommend-item/recommend-item'

function BookDetail() {

    const router = useRouter()

    const [bookId, setBookId] = useState(0)
    const [isLoading, setLoading] = useState(true)
    const [showDetail, setShowDetail] = useState(false)
    const [bookDetail, setBookDetail] = useState(null)
    const [bookComments, setBookComments] = useState([])
    const [bookCommentsTotal, setBookCommentsTotal] = useState(0)
    const [bookRecommends, setBookRecommends] = useState([])

    useEffect(async () => {
        const id = router.params.id
        setBookId(id)
        // 获取基本详情
        const res1 = await API.Book.getDetail(id)
        setBookDetail(res1)
        setLoading(false)
        Taro.setNavigationBarTitle({
            title: res1.title
        })
        // 获取书评
        const res2 = await API.Book.getCommentReview(id)
        setBookComments(res2.reviews)
        setBookCommentsTotal(res2.total)
        // 获取推荐列表
        const res3 = await API.Book.getRecommendList(id)
        setBookRecommends(res3.books)
    }, [])

    const handleShowDetail = () => {
        setShowDetail(true)
    }

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
    const handleGoChapter = () => {
        Taro.navigateTo({
            url: '/pages/book-chapter/book-chapter'
        })
    }

    // 跳转评论
    const handleGoComment = () => {
        Taro.navigateTo({
            url: '/pages/book-comment/book-comment'
        })
    }

    // 跳转推荐列表
    const handleGoRecommend = () => {
        Taro.navigateTo({
            url: `/pages/book-recommend/book-recommend?id=${bookId}`
        })
    }

    return (
        <View className='detail'>
            <Loading loading={isLoading} />
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
                {/* 操作栏 */}
                <View className='action-bar'>
                </View>
                <Modal title='简介'
                    content={bookDetail.longIntro}
                    visible={showDetail}
                    onClose={handleCloseDetail} />
            </View>}
        </View>
    )
}

export default BookDetail