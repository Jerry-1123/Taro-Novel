import Taro, { useCallback } from '@tarojs/taro'
import { useDispatch } from '@tarojs/redux'
import { View } from '@tarojs/components'
import Config from '@/config/config'
import Util from '@/util/util'
import { format } from 'timeago.js'
import { dispatchTagBookList } from '@/actions/novel'

import './content.scss'

function Content({ bookDetail = {} }) {
    const dispatch = useDispatch()

    // 获取标签推荐书籍
    const getTagBookList = useCallback(
        (tags, start) => dispatch(dispatchTagBookList(tags, start)),
        [dispatch]
    )

    const goBookTag = (tag) => async () => {
        Taro.showLoading()
        await getTagBookList(tag, 0)
        Taro.navigateTo({
            url: `/pages/book-tag/book-tag?tag=${tag}`
        })
        Taro.hideLoading()
    }

    return (
        <View className='book'>
            <View className='book-detail'>
                {bookDetail.cover && <Image className='cover' src={Config.staticUrl + bookDetail.cover} />}
                <View className='desc'>
                    <View className='title'>{bookDetail.title}</View>
                    <View className='sku'>
                        <View className='author'>{bookDetail.author}</View>
                        <View className='split'>|</View>
                        <View classNam='minor'>{bookDetail.minorCate}</View>
                        <View className='split'>|</View>
                        <View className='count'>{Util.getWordCount(bookDetail.wordCount)}字</View>
                    </View>
                    <View className='serial'>
                        {bookDetail.isSerial && <View>{format(bookDetail.updated, 'zh_CN')}更新</View>}
                        {!bookDetail.isSerial && <View>完结</View>}
                    </View>
                </View>
            </View>
            <View className='book-reader'>
                <View className='item'>
                    <View className='key'>追书人数</View>
                    <View className='val'>{Util.getFollower(bookDetail.latelyFollower)}</View>
                </View>
                <View className='item'>
                    <View className='key'>读者留存率</View>
                    <View className='val'>{bookDetail.retentionRatio}%</View>
                </View>
                <View className='item'>
                    <View className='key'>更新字数/日</View>
                    <View className='val'>{bookDetail.serializeWordCount}</View>
                </View>
            </View>
            <View className='tip'>简介</View>
            <View className='book-intro'>{bookDetail.longIntro}</View>
            {(bookDetail.tags && bookDetail.tags.length > 0)
                && <View>
                    <View className='tip'>标签</View>
                    <View className='book-tag'>
                        {bookDetail.tags.map((item, index) => {
                            return <View className='item' hoverClass='hover'
                                key={String(index)} onClick={goBookTag(item)}>
                                {item}
                            </View>
                        })}
                    </View>
                </View>}
        </View>
    )
}

export default Content