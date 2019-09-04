import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'

import './modal.scss'

function Modal(props) {

    const handleCloseModal = () => {
        props.onClose()
    }

    return (
        <View className={classNames({
            'modal': true,
            'modal-show': props.visible
        })}>
            <View className='modal-dialog'>
                <View className='title'>{props.title}</View>
                <View className='content'>{props.content}</View>
                <Text className='close' onClick={handleCloseModal} />
            </View>
        </View>
    )
}

export default Modal