import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import Config from '@/config/config'
import { format } from 'timeago.js'

import './comment.scss'

import { AtRate } from 'taro-ui'

function Comment({ comment = {} }) {

    return (
        <View className='comment'>
            <View className='title'>{comment.title}</View>
            <View className='content'>{comment.content}</View>
            <View className='desc'>
                <Image className='avatar' src={Config.staticUrl + comment.author.avatar} />
                <View className='sku all'>
                    <View className='sku-item'>
                        <Text className='nickname'>{comment.author.nickname}</Text>
                        <Text className='level'>lv.{comment.author.lv}</Text>
                        {comment.author.gender === 'male'
                            ? <Text className='male' />
                            : <Text className='female' />}
                    </View>
                    <View className='sku-item'>
                        <View className='time'>{format(comment.created, 'zh_CN')}</View>
                    </View>
                </View>
                <View className='sku'>
                    <View className='sku-item'>
                        <AtRate className='evaluate' value={comment.rating} size={10} />
                    </View>
                    <View className='sku-item'>
                        <View className='helpful'>{comment.helpful.total} 有用</View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Comment