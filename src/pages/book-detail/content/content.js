import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Config from '@/config/config'
import Util from '@/util/util'
import { format } from 'timeago.js'

import './content.scss'

function Content({ bookDetail = {} }) {

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
            <View className='box'>
                <View className='tip'>详情</View>
            </View>
            <View className='book-intro'>
                <View className='intro'>{bookDetail.longIntro}</View>
            </View>
        </View>
    )
}

export default Content