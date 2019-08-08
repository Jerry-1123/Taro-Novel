import Taro from '@tarojs/taro'
import { useSelector } from '@tarojs/redux'
import { createSelector } from 'reselect'
import { View } from '@tarojs/components'

import './list.scss'

import NovelItem from '@/components/novel-item/novel-item'

function List({ categoryBookList = [], categoryBookListTotal = 0 }) {

    return (
        <View className='list'>
            {categoryBookList.map(item => <NovelItem novel={item} key={item._id} />)}
            {(categoryBookListTotal <= categoryBookList.length || categoryBookList.length < 50)
                && <View className='no-more'>没有更多书籍</View>}
        </View>
    )
}

export default List