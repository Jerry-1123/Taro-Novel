import Taro, { useState, useEffect, useCallback } from '@tarojs/taro'
import { useSelector, useDispatch } from '@tarojs/redux'
import { createSelector } from 'reselect'
import { View } from '@tarojs/components'

import './index.scss'

/**
 * 首页
 */
function Index() {

  return (
    <View className='index'>

    </View>
  )
}

Index.config = {
  navigationBarTitleText: '首页'
}

export default Index