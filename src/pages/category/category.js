import Taro, { useEffect, useCallback } from '@tarojs/taro'
import { useSelector, useDispatch } from '@tarojs/redux'
import { createSelector } from 'reselect'
import { View } from '@tarojs/components'
import { QUERY_TYPE } from '@/constants/novel'
import {
  dispatchCategoryList,
  dispatchMinorList,
  dispatchCategoryBookList
} from '@/actions/novel'

import './category.scss'

const selectCategoryList = () => {
  return createSelector(
    [state => state.novel.categoryList],
    list => list
  )
}

const selectMinorList = () => {
  return createSelector(
    [state => state.novel.minorList],
    minorList => minorList
  )
}

function Category() {
  const dispatch = useDispatch()

  // 取出类目列表
  const categoryList = useSelector(selectCategoryList())
  // 取出二级分类
  const minorList = useSelector(selectMinorList())

  // 获取类目列表
  const initCategoryList = useCallback(
    () => dispatch(dispatchCategoryList()),
    [dispatch]
  )
  // 获取二级类目列表
  const initMinorList = useCallback(
    () => dispatch(dispatchMinorList()),
    [dispatch]
  )

  // 获取类目详情
  const getCategoryBookList = useCallback(
    (type, major, start, minor, gender) => dispatch(dispatchCategoryBookList(type, major, start, minor, gender)),
    [dispatch]
  )

  useEffect(() => {
    initCategoryList()
    initMinorList()
  }, [])

  // 进入分类详情页
  const goCategoryDetail = (category, gender) => async () => {
    Taro.showLoading()
    await getCategoryBookList(QUERY_TYPE[0].type, category.name, 0, '全部', gender)
    Taro.navigateTo({
      url: `/pages/category-detail/category-detail?major=${category.name}&gender=${gender}`
    })
    Taro.hideLoading()
  }

  const Male = categoryList.male.map((item, index) => {
    return <View className='category-list-item' hoverClass='hover' key={String(index)}
      onClick={goCategoryDetail(item, 'male')}>
      <View className='category-list-item-name'>{item.name}</View>
      <View className='category-list-item-count'>{item.bookCount}本</View>
    </View>
  })

  const FeMale = categoryList.female.map((item, index) => {
    return <View className='category-list-item' hoverClass='hover' key={String(index)}
      onClick={goCategoryDetail(item, 'female')}>
      <View className='category-list-item-name'>{item.name}</View>
      <View className='category-list-item-count'>{item.bookCount}本</View>
    </View>
  })

  const Press = categoryList.press.map((item, index) => {
    return <View className='category-list-item' hoverClass='hover' key={String(index)}
      onClick={goCategoryDetail(item, 'press')}>
      <View className='category-list-item-name'>{item.name}</View>
      <View className='category-list-item-count'>{item.bookCount}本</View>
    </View>
  })

  const Picture = categoryList.picture.map((item, index) => {
    return <View className='category-list-item' hoverClass='hover' key={String(index)}
      onClick={goCategoryDetail(item, 'picture')}>
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