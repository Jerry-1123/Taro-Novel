import Taro, { useRouter, useState, useEffect, usePageScroll } from '@tarojs/taro'
import { useSelector } from '@tarojs/redux'
import { createSelector } from 'reselect'
import { View } from '@tarojs/components'
import API from '@/service/api'
import classNames from 'classnames'

import './reader.scss'

import imgChapter from '@/assets/images/chapter.png'
import imgSetting from '@/assets/images/setting.png'
import imgEye from '@/assets/images/eye.png'
import imgBook from '@/assets/images/book.png'

import { AtDrawer } from 'taro-ui'

const selectChapters = () => {
    return createSelector(
        [state => state.book.chapters],
        chapters => chapters
    )
}

function Reader() {

    const router = useRouter()

    // 所有章节列表
    const chapterList = useSelector(selectChapters())

    const [cpContent, setCpContent] = useState(null)            // 小说内容
    const [title, setTitle] = useState('')                      // 标题
    const [chapterIndex, setChapterIndex] = useState(0)         // 目录索引
    const [showActionBar, setActionBarShow] = useState(true)    // 底部操作栏
    const [showDrawer, setDrawerShow] = useState(false)         // 左边目录
    const [wallpaperType, setWallpaperType] = useState(0)       // 0:默认 1:护眼 2：夜间

    useEffect(() => {
        const { link, index } = router.params
        setChapterIndex(Number.parseInt(index))
        getCpContent(link)
    }, [])

    usePageScroll(res => {
        console.log(res)
    })

    const getCpContent = async link => {
        Taro.showLoading({
            title: '加载中...'
        })
        const res = await API.Book.getReaderContent(link)
        let content = res.chapter.cpContent.replace(/(\n\n)/g, "\n").replace(/(\r\n\r\n)/g, "\r\n")
        setCpContent(content)
        setTitle(res.chapter.title)
        Taro.hideLoading()
        Taro.setNavigationBarTitle({
            title: res.chapter.title
        })
        Taro.pageScrollTo({
            scrollTop: 0,
            duration: 200
        })
    }

    const handleLastChapter = () => {
        const lastIndex = index - 1
        setIndex(lastIndex)
        const lastLink = chapterList[lastIndex].link
        getCpContent(lastLink)
    }

    const handleNextChapter = () => {
        const nextIndex = index + 1
        setIndex(nextIndex)
        const nextLink = chapterList[nextIndex].link
        getCpContent(nextLink)
    }

    const handleClickConetnt = () => {
        setActionBarShow(!showActionBar)
    }

    const handleShowDrawer = () => {
        setDrawerShow(true)
    }

    const handleCloseDrawer = () => {
        setDrawerShow(false)
    }

    const handleClickEyeProtection = () => {
        if (wallpaperType === 0) {
            setWallpaperType(1)
            Taro.setNavigationBarColor({
                frontColor: '#000000',
                backgroundColor: '#CCE8CF'
            })
        } else if (wallpaperType === 1) {
            setWallpaperType(0)
            Taro.setNavigationBarColor({
                frontColor: '#000000',
                backgroundColor: '#ffffff'
            })
        }
    }

    return (
        <View className={classNames({
            'reader': true,
            'default': wallpaperType === 0,
            'protection': wallpaperType === 1,
            'night': wallpaperType === 2
        })}>
            {chapterIndex > 0 && <View className='last' hoverClass='hover' onClick={handleLastChapter}>
                上一章
            </View>}
            {title !== '' && <View className='title'
                style={{ fontSize: `20px` }}>
                {title}
            </View>}
            {cpContent !== null && <Text className='content'
                decode={true}
                style={{ fontSize: `17px` }}
                onClick={handleClickConetnt}>
                {cpContent}
            </Text>}
            {cpContent != null && <View className='next' hoverClass='hover' onClick={handleNextChapter}>
                下一章
            </View>}
            {/* 操作栏 */}
            <View className={classNames({
                'action': true,
                'action-show': showActionBar
            })}>
                <View className='chapter' hoverClass='hover' onClick={handleShowDrawer}>
                    <Image className='chapter-img' src={imgChapter} />
                    <View className='chapter-txt'>目录</View>
                </View>
                <View className='eye' hoverClass='hover' onClick={handleClickEyeProtection}>
                    <Image className='eye-img' src={imgEye} />
                    <View className='eye-txt'>护眼</View>
                </View>
                <View className='setting'>
                    <Image className='setting-img' src={imgSetting} />
                    <View className='setting-txt'>设置</View>
                </View>
                <View className='add'>
                    <View className='add-content' hoverClass='hover'>
                        <Image className='add-content-img' src={imgBook} />
                        <View className='add-content-txt'>加入书架</View>
                    </View>
                </View>
            </View>
            {/* 左侧目录 */}
            <AtDrawer mask
                show={showDrawer}
                onClose={handleCloseDrawer}>
                <View className='drawer'>
                    {chapterList.map((item, index) => {
                        return <View className='drawer-item' key={String(index)}>{item.title}</View>
                    })}
                </View>
            </AtDrawer>
        </View>
    )
}

export default Reader