import Taro, { useState, useEffect, useCallback } from '@tarojs/taro'
import { useSelector, useDispatch } from '@tarojs/redux'
import { createSelector } from 'reselect'
import { View } from '@tarojs/components'
import { dispatchCategoryList, dispatchCategoryList2 } from '@/actions/novel'

import './category.scss'

const selectCategoryList = createSelector(
  [state => state.novel.categoryList],
  list => list
)

function Category() {
  // 取出类目列表
  const categoryList = useSelector(selectCategoryList)

  const dispatch = useDispatch()
  
  // 获取类目列表
  const initCategoryList = useCallback(
    () => dispatch(dispatchCategoryList()),
    [dispatch]
  )
  // 获取二级类目列表
  const initCategoryList2 = useCallback(
    () => dispatch(dispatchCategoryList2()),
    [dispatch]
  )

  useEffect(() => {
    initCategoryList()
    initCategoryList2()
  }, [])

  // 进入分类详情页
  const handleClickCategory = (category, gender) => () => {
    Taro.navigateTo({
      url: `/pages/category-detail/category-detail?major=${category.name}&gender=${gender}`
    })
  }

  const Male = categoryList.male.map((item, index) => {
    return <View className='category-list-item' hoverClass='hover' key={String(index)}
      onClick={handleClickCategory(item, 'male')}>
      <View className='category-list-item-name'>{item.name}</View>
      <View className='category-list-item-count'>{item.bookCount}本</View>
    </View>
  })

  const FeMale = categoryList.female.map((item, index) => {
    return <View className='category-list-item' hoverClass='hover' key={String(index)}
      onClick={handleClickCategory(item, 'female')}>
      <View className='category-list-item-name'>{item.name}</View>
      <View className='category-list-item-count'>{item.bookCount}本</View>
    </View>
  })

  const Press = categoryList.press.map((item, index) => {
    return <View className='category-list-item' hoverClass='hover' key={String(index)}
      onClick={handleClickCategory(item, 'press')}>
      <View className='category-list-item-name'>{item.name}</View>
      <View className='category-list-item-count'>{item.bookCount}本</View>
    </View>
  })

  const Picture = categoryList.picture.map((item, index) => {
    return <View className='category-list-item' hoverClass='hover' key={String(index)}
      onClick={handleClickCategory(item, 'picture')}>
      <View className='category-list-item-name'>{item.name}</View>
      <View className='category-list-item-count'>{item.bookCount}本</View>
    </View>
  })

  return (
    <View className='category'>
      <View className='category-menu'>男性</View>
      <View className='category-list'>
        {Male}
      </View>
      <View className='category-menu'>女性</View>
      <View className='category-list'>
        {FeMale}
      </View>
      <View className='category-menu'>出版</View>
      <View className='category-list'>
        {Press}
      </View>
      <View className='category-menu'>漫画</View>
      <View className='category-list'>
        {Picture}
      </View>
    </View>
  )
}

Category.config = {
  navigationBarTitleText: '分类'
}

export default Category