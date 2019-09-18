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

    const setData = () => {
        let array = Taro.getStorageSync('test') || []
        array.unshift(8)
        Taro.setStorageSync('test', array)
    }

    const getData = () => {
        console.log(Taro.getStorageSync('test'))
    }

    const showAction = () => {
        Taro.showActionSheet({
            itemList: ['删除本书']
        }).then(res => {
            const {tapIndex} = res
            console.log(tapIndex)
        })
    }

    return (
        <View>
            <Button onClick={openModal}>点开</Button>
            <Button onClick={setData}>存数据</Button>
            <Button onClick={getData}>取数据</Button>
            <Button onLongPress={showAction}>弹出</Button>
            <View className={classNames({
                'modal': true,
                'modal-show': showModal
            })} onClick={closeModal}>
                哈哈哈
            </View>
        </View>
    )
}

export default Test