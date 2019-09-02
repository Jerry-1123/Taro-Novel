import Taro, { useCallback, useEffect, useState } from '@tarojs/taro'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import { useSelector, useDispatch } from '@tarojs/redux'
import { createSelector } from 'reselect'
import {
    dispatchStatics,
    dispatchCats
} from '@/actions/category'
import classNames from 'classnames'

import './category.scss'

import Loading from '@/components/loading/loading'

import Item from './item/item'

const selectStatics = () => {
    return createSelector(
        [state => state.category.statics],
        statics => statics
    )
}

function Category() {

    const [isLoading, setLoading] = useState(true)
    const [current, setCurrent] = useState(0)
    const [swiperHeight, setSwiperHeight] = useState(0)

    // 获取分类
    const statics = useSelector(selectStatics())

    const dispatch = useDispatch()

    // 初始化分类
    const initStatics = useCallback(
        () => dispatch(dispatchStatics()),
        [dispatch]
    )

    // 初始化二级分类
    const initCats = useCallback(
        () => dispatch(dispatchCats()),
        [dispatch]
    )

    useEffect(async () => {
        await initStatics()
        await initCats()
        setLoading(false)
        setSwiperHeight(Taro.getSystemInfoSync().windowHeight - 50)
    }, [])

    // 点击tab标签
    const clickTab = (index) => () => {
        setCurrent(index)
    }

    // 监听滑块滑动
    const handleChangeSwiper = (e) => {
        const {
            current
        } = e.detail
        setCurrent(current)
    }

    return (
        <View className='category'>
            <Loading loading={isLoading} />
            <View className='tab'
                style={{
                    height: `50px`,
                    lineHeight: `50px`
                }}>
                {['男生', '女生'].map((item, index) => {
                    return <View className='tab-item' key={String(index)}
                        onClick={clickTab(index)}>
                        <View className={classNames({
                            'title': true,
                            'title-active': index === current
                        })}>{item}</View>
                        <View className={classNames({
                            'underline': true,
                            'underline-active': index === current
                        })}></View>
                    </View>
                })}
            </View>
            <Swiper style={{ height: `${swiperHeight}px` }}
                current={current}
                onChange={handleChangeSwiper}>
                <SwiperItem>
                    {statics.male && <View className='books'>
                        {statics.male.map((item, index) => {
                            return <Item key={String(index)} item={item} />
                        })}
                    </View>}
                </SwiperItem>
                <SwiperItem>
                    {statics.female && <View className='books'>
                        {statics.female.map((item, index) => {
                            return <Item key={String(index)} item={item} />
                        })}
                    </View>}
                </SwiperItem>
            </Swiper>
        </View >
    )
}

Category.config = {
    navigationBarTitleText: '分类'
}

export default Category