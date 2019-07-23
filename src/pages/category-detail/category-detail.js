import Taro, { useState, useEffect, useCallback } from '@tarojs/taro'
import { useSelector, useDispatch } from '@tarojs/redux'
import { createSelector } from 'reselect'
import { View, ScrollView, Image, Text } from '@tarojs/components'
import { QUERY_TYPE } from '@/constants/novel'
import { dispatchCategoryBookList } from '@/actions/novel'
import classNames from 'classNames'
import config from '@/config/config'
import Util from '@/util/util'

import './category-detail.scss'

const selectCategoryList2 = (major, gender) => {
    return createSelector(
        [state => state.novel.categoryList2],
        list => {
            if (gender) return ['全部'].concat(list[gender].filter(item => item.major === major)[0].mins)
        }
    )
}

const selectCategoryBookList = () => {
    return createSelector(
        [state => state.novel.categoryBookList],
        list => list
    )
}

const selectCategoryBookListTotal = () => {
    return createSelector(
        [state => state.novel.categoryBookListTotal],
        total => total
    )
}

function CategoryDetail() {
    const [navIndex, setNav] = useState(0)
    const [subNavIndex, setSubNav] = useState(0)
    const [startIndex, setStartIndex] = useState(0)
    const [scrollHeight, setScrollHeight] = useState(0)
    const [scrollTop, setScrollTop] = useState(0)
    const dispatch = useDispatch()

    const { major, gender } = this.$router.params

    // 获取书单列表
    const getCategoryBookList = useCallback(
        (type, start, minor) => dispatch(dispatchCategoryBookList(type, major, start, minor, gender)),
        [dispatch]
    )

    // 二级分类
    const categoryList2 = useSelector(selectCategoryList2(major, gender))
    // 书籍列表
    const categoryBookList = useSelector(selectCategoryBookList())
    // 书籍列表长度
    const categoryBookListTotal = useSelector(selectCategoryBookListTotal())

    useEffect(() => {
        Taro.setNavigationBarTitle({ title: major })    // 设置标题
        setScrollHeight(Taro.getSystemInfoSync().windowHeight)  // 给ScrollView高度
    }, [])

    useEffect(() => {
        Taro.showLoading()
        getCategoryBookList(QUERY_TYPE[navIndex].type, startIndex, categoryList2[subNavIndex]).then(() => {
            Taro.hideLoading()
        })
    }, [navIndex, startIndex, subNavIndex])

    const handleClickNavItem = (index) => () => {
        if (index !== navIndex) {
            setScrollTop(0)
            setNav(index)
            setStartIndex(0)
        }
    }

    const handleClickSubNavItem = (index) => () => {
        if (index !== subNavIndex) {
            setScrollTop(0)
            setSubNav(index)
            setStartIndex(0)
        }
    }

    const scrollToLower = () => () => {
        if (categoryBookListTotal > categoryBookList.length) {
            setStartIndex(startIndex + 20)
        }
    }

    const handleScroll = () => (e) => {
        const { scrollTop } = e.detail
        setScrollTop(scrollTop)
    }

    return (
        <View className='category'>
            <View className='top'>
                <ScrollView className='nav'>
                    {QUERY_TYPE.map((item, index) => {
                        return <View className={classNames({
                            'nav-item': true,
                            'active': index === navIndex
                        })} key={String(index)} onClick={handleClickNavItem(index)}>
                            {item.name}
                        </View>
                    })}
                </ScrollView>
                <ScrollView className='nav' scrollX>
                    {categoryList2 &&
                        categoryList2.map((item, index) => {
                            return <View className={classNames({
                                'nav-item': true,
                                'active': index === subNavIndex
                            })} key={String(index)} onClick={handleClickSubNavItem(index)}>
                                {item}
                            </View>
                        })}
                </ScrollView>
            </View>
            <ScrollView className='list'
                scrollY
                lowerThreshold={100}
                scrollTop={scrollTop}
                style={{ height: `${scrollHeight}px` }}
                onScrollToLower={scrollToLower()}
                onScroll={handleScroll()}>
                {categoryBookList.map(item => {
                    return <View className='list-item' key={item.id}>
                        <Image className='cover' src={config.staticUrl + item.cover} />
                        <View className='right'>
                            <View className='wrap'>
                                <View className='name'>{item.title}</View>
                            </View>
                            <View className='wrap'>
                                <View className='author'>{item.author}</View>
                                <View className='split'>|</View>
                                <View className='majorCate'>{item.majorCate}</View>
                            </View>
                            <View className='wrap'>
                                <View className='info'>{item.shortIntro}</View>
                            </View>
                            <View className='wrap'>
                                <View className='follow'>
                                    <Text className='red'>{Util.getFollower(item.latelyFollower)}</Text>人气
                                </View>
                                <View className='split'>|</View>
                                <View className='ratio'>
                                    <Text className='red'>{item.retentionRatio}%</Text>读者留存
                                </View>
                            </View>
                        </View>
                    </View>
                })}
                {((categoryBookListTotal === categoryBookList.length) || categoryBookList.length < 20)
                    && <View className='no-more'>没有更多书籍</View>}
            </ScrollView>
        </View>
    )
}

export default CategoryDetail