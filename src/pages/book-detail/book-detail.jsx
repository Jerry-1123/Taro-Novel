import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import API from '@/service/api'
import Config from '@/config/config'
import Util from '@/utils/util'
import { format } from 'timeago.js'
import classNames from 'classnames'

import './book-detail.scss'

import { AtRate } from 'taro-ui'
import Loading from '@/components/loading/loading'
import Modal from '@/components/modal/modal'
import TagItem from './tag-item/tag-item'
import CommentItem from './comment-item/comment-item'

function BookDetail() {

    const router = useRouter()

    const [isLoading, setLoading] = useState(true)
    const [showDetail, setShowDetail] = useState(false)
    const [bookDetail, setBookDetail] = useState(null)
    const [bookComments, setBookComments] = useState([])
    const [bookCommentsTotal, setBookCommentsTotal] = useState(0)

    useEffect(async () => {
        const id = router.params.id
        const res1 = await API.Book.getDetail(id)
        setBookDetail(res1)
        setLoading(false)
        Taro.setNavigationBarTitle({
            title: res1.title
        })
        const res2 = await API.Book.getCommentReview(id)
        setBookComments(res2.reviews)
        setBookCommentsTotal(res2.total)
    }, [])

    const handleShowDetail = () => {
        setShowDetail(true)
    }

    const handleCloseDetail = () => {
        setShowDetail(false)
    }

    const handleGoAuthor = () => {
        Taro.navigateTo({
            url: '/pages/book-author/book-author'
        })
    }

    const handleGoChapter = () => {
        Taro.navigateTo({
            url: '/pages/book-chapter/book-chapter'
        })
    }

    const handleGoComment = () => {
        Taro.navigateTo({
            url: '/pages/book-comment/book-comment'
        })
    }

    const handleGoRecommend = () => {
        Taro.navigateTo({
            url: '/pages/book-recommend/book-recommend'
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
                {/* 书评 */}
                <View className='section'>
                    <View className='line' />
                    <View className='title'>书评</View>
                </View>
                <View className='comments' hoverClass='hover' onClick={handleGoComment}>
                    {bookCommentsTotal > 0 && bookComments.map((item, index) => {
                        return <CommentItem comment={item} key={String(index)} />
                    })}
                    {bookCommentsTotal === 0 && <View className='more-comment'>

                    </View>}
                </View>
                <View className='divider' />
                {/* 推荐 */}
                <View className='recommends' hoverClass='hover' onClick={handleGoRecommend}>
                </View>
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