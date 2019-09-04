import Taro, { Component } from '@tarojs/taro'
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

class BookDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            bookDetail: {
                cover: '',
                rating: {
                    count: 0,
                    isEffect: true,
                    score: 0,
                    tip: ""
                },
                tags: []
            },
            showMoreDetail: false
        }
    }

    async componentDidMount() {
        const { params } = this.$router
        const res = await API.Book.getDetail(params.id)
        this.setState({
            bookDetail: res,
            isLoading: false
        }, () => {
            Taro.setNavigationBarTitle({
                title: res.title
            })
        })
    }

    handleShowMoreDetail = () => {
        this.setState({
            showMoreDetail: true
        })
    }

    handleCloseMoreDetail = () => {
        this.setState({
            showMoreDetail: false
        })
    }

    render() {

        const {
            bookDetail,
            isLoading,
            showMoreDetail
        } = this.state

        return (
            <View className='detail'>
                <Loading loading={isLoading} />
                {/* 顶部信息 */}
                <View className='header'>
                    <View className='info'>
                        <Image className='cover' src={Config.staticUrl + bookDetail.cover} />
                        <View className='desc'>
                            <View className='title'>{bookDetail.title}</View>
                            <View className='sku'>
                                <View className='author'>{bookDetail.author}</View>
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
                <View className='intro' onClick={this.handleShowMoreDetail}>{bookDetail.longIntro}</View>
                <View className='divider' />
                {/* 目录 */}
                <View className='catalog'>

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
                <View className='comments'>
                </View>
                <View className='recommends'>
                </View>
                <View className='action-bar'>
                </View>
                <Modal title='简介'
                    content={bookDetail.longIntro}
                    visible={showMoreDetail}
                    onClose={this.handleCloseMoreDetail} />
            </View>
        )
    }
}

export default BookDetail