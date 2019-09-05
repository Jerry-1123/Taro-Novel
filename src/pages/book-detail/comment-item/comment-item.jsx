import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Config from '@/config/config'

import './comment-item.scss'

import { AtRate } from 'taro-ui'

function CommentItem({ comment = {} }) {

    return (
        <View className='comment'>
            <View className='header'>
                <View className='author'>
                    <Image className='avatar' src={Config.staticUrl + comment.author.avatar} />
                    <View className='nickname'>{comment.author.nickname}</View>
                    <View className='level'>lv{comment.author.lv}</View>
                    {comment.author.gender === 'male'
                        ? <Text className='male' />
                        : <Text className='female' />}
                </View>
                <AtRate className='evaluate' value={comment.rating} size={12} />
            </View>
            <View className='body'>
                <View className='title'>{comment.title}</View>
                <View className='content'>{comment.content}</View>
            </View>
            <View className='footer'>
                <View className='time'>{comment.created}</View>
                <View className='action'>
                </View>
            </View>
        </View>
    )
}

export default CommentItem