import Taro, { useState, useEffect, useCallback } from '@tarojs/taro'
import { useSelector, useDispatch } from '@tarojs/redux'
import { createSelector } from 'reselect'
import { View, ScrollView } from '@tarojs/components'
import { QUERY_TYPE } from '@/constants/novel'
import classNames from 'classNames'

import './category-detail.scss'

const selectCategoryList2 = (major, type) => {
    return createSelector(
        [state => state.novel.categoryList2],
        list => {
            if (type) return ['全部'].concat(list[type].filter(item => item.major === major)[0].mins)
        }
    )
}

function CategoryDetail() {
    const { major, type } = this.$router.params

    // 设置标题
    const setTitle = () => {
        Taro.setNavigationBarTitle({
            title: major
        })
    }

    const [navIndex, setNav] = useState(0)
    const [subNavIndex, setSubNav] = useState(0)

    // 获取二级分类
    const categoryList2 = useSelector(selectCategoryList2(major, type))

    const handleClickNavItem = (index) => () => {
        setNav(index)
    }

    const handleClickSubNavItem = (index) => () => {
        setSubNav(index)
    }

    useEffect(() => {
        setTitle()
    }, [])

    return (
        <View className='category'>
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
    )
}

export default CategoryDetail