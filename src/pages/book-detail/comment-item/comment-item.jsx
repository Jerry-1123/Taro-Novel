import Taro, { useState } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import Config from '@/config/config'
import { format } from 'timeago.js'

import './comment-item.scss'

import { AtRate } from 'taro-ui'
import Modal from '@/components/modal/modal'

function CommentItem({ comment = { author: {} } }) {

    const [showComment, setComment] = useState(false)

    const handleShowModal = () => {
        setComment(true)
    }

    const handleCloseModal = () => {
        setComment(false)
    }

    return (
        <View className='comment'>
            <View className='header'>
                <View className='author'>
                    <Image className='avatar' src={Config.staticUrl + comment.author.avatar} />
                    <View className='nickname'>{comment.author.nickname}</View>
                    <View className='level'>Lv.{comment.author.lv}</View>
                    {comment.author.gender === 'male'
                        ? <Text className='male' />
                        : <Text className='female' />}
                </View>
                <AtRate className='evaluate' value={comment.rating} size={12} />
            </View>
            <View className='body' hoverClass='hover' onClick={handleShowModal}>
                <View className='title'>{comment.title}</View>
                <View className='content'>{comment.content}</View>
            </View>
            <View className='footer'>
                <View className='time'>{format(comment.created, 'zh_CN')}</View>
                <View className='action'>
                    <Text className='action-comment'>{comment.commentCount}</Text>
                    <Text className='action-like'>{comment.likeCount}</Text>
                </View>
            </View>
            <Modal title={comment.author.nickname + ' 说：'}
                content={comment.content}
                visible={showComment}
                onClose={handleCloseModal} />
        </View>
    )
}

export default CommentItem