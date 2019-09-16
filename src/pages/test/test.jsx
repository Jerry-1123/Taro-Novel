import Taro, { useState } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import classNames from 'classnames'

import './test.scss'

import { AtFloatLayout } from "taro-ui"

function Test() {

    const [showModal, setModalShow] = useState(false)

    const openModal = () => {
        setModalShow(true)
    }

    const closeModal = () => {
        setModalShow(false)
    }

    return (
        <View>
            <Button onClick={openModal}>点开</Button>
            <View className={classNames({
                'modal': true,
                'modal-show': showModal
            })} onClick={closeModal}>
                哈哈哈
            </View>
            {/* <AtFloatLayout isOpened={showModal} onClose={closeModal}>
                这是内容区 随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写这是内容区
                随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写
            </AtFloatLayout> */}
            {/* <View className={classNames({
                'modal': true,
                'modal-show': showModal,
            })} onClick={closeModal}>
                <View className={classNames({
                    'dialog': true,
                    'dialog-show': showModal
                })}>
                    11
                </View>
            </View> */}
        </View>
    )
}

export default Test