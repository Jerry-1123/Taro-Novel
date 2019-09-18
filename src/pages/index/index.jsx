import Taro, { useDidShow, useState } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

import Item from './item/item'

function Index() {

  const [books, setBooks] = useState([])

  useDidShow(() => {
    handleRefreshBooks()
  })

  const handleRefreshBooks = () => {
    setBooks(Taro.getStorageSync('books') || [])
  }

  return (
    <View className='index'>
      {books.map((item, index) => {
        return <Item
          className='list-item'
          key={String(index)}
          item={item}
          onRefreshBooks={handleRefreshBooks} />
      })}
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '书架'
}

export default Index