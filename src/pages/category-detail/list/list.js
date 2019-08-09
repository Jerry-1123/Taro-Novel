import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './list.scss'

import NovelItem from '@/components/novel-item/novel-item'
import NoMore from '@/components/no-more/no-more'

function List({ categoryBookList = [], categoryBookListTotal = 0 }) {

    return (
        <View className='list'>
            {categoryBookList.map(item => <NovelItem novel={item} key={item._id} />)}
            {(categoryBookListTotal <= categoryBookList.length || categoryBookList.length < 20)
                && <NoMore />}
        </View>
    )
}

export default List