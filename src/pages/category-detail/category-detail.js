import Taro, { useState, useEffect, useCallback } from '@tarojs/taro'
import { useSelector, useDispatch } from '@tarojs/redux'
import { createSelector } from 'reselect'
import { View } from '@tarojs/components'

import './category-detail.scss'

function CategoryDetail() {

    const setTitle = () => {
        const { tag } = this.$router.params
        Taro.setNavigationBarTitle({
            title: tag
        })
    }

    useEffect(() => {
        setTitle()
    }, [])

    return (
        <View></View>
    )
}

export default CategoryDetail