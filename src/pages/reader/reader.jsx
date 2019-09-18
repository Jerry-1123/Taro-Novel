import Taro, { useRouter, useState, useEffect, usePageScroll, useReachBottom } from '@tarojs/taro'
import { useSelector } from '@tarojs/redux'
import { createSelector } from 'reselect'
import { View, Slider, Text } from '@tarojs/components'
import API from '@/service/api'
import classNames from 'classnames'
import Util from '@/utils/util'

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

const selectBookId = () => {
    return createSelector(
        [state => state.book.bookId],
        bookId => bookId
    )
}

function Reader() {

    const router = useRouter()

    const chapterList = useSelector(selectChapters())
    const bookId = useSelector(selectBookId())

    const [cpContent, setCpContent] = useState(null)            // 小说内容
    const [title, setTitle] = useState('')                      // 标题
    const [chapterIndex, setChapterIndex] = useState(-1)         // 目录索引
    const [showActionBar, setActionBarShow] = useState(true)    // 底部操作栏
    const [showDrawer, setDrawerShow] = useState(false)         // 左边目录
    const [showSetting, setSettingShow] = useState(false)       // 设置界面
    const [wallpaperType, setWallpaperType] = useState(0)       // 0:默认 1:护眼 2:夜间(暂时未做)
    const [contentFontSize, setContentFontSize] = useState(20)  // 默认字体大小30
    const [allBooks, setAllBooks] = useState([])

    useEffect(() => {
        // 获取本地缓存字体
        setContentFontSize(Taro.getStorageSync('fontSize') || 20)
        // 获取本地缓存书籍
        setAllBooks(Taro.getStorageSync('books') || [])
        // 获取本地缓存
        setWallpaperType(Taro.getStorageSync('wallPaper') || 0)
        // 设置状态栏护眼色
        if (Taro.getStorageSync('wallPaper') === 1) {
            Taro.setNavigationBarColor({
                frontColor: '#000000',
                backgroundColor: '#cce8cf'
            })
            Taro.setBackgroundColor({
                backgroundColor: '#cce8cf',
                backgroundColorTop: '#cce8cf',
                backgroundColorBottom: '#cce8cf'
            })
        }
        const { index } = router.params
        setChapterIndex(Number.parseInt(index))
    }, [])

    useEffect(() => {
        if (chapterIndex === -1) {
            return
        }
        const link = chapterList[chapterIndex].link
        getCpContent(link)
    }, [chapterIndex])

    usePageScroll(() => {
        setActionBarShow(false)
        setSettingShow(false)
    })

    // 获取小说章节内容
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
        Taro.setStorageSync(bookId, chapterIndex)
    }

    // 上一章
    const handleLastChapter = () => {
        const lastIndex = chapterIndex - 1
        setChapterIndex(lastIndex)
    }

    // 下一章
    const handleNextChapter = () => {
        const nextIndex = chapterIndex + 1
        setChapterIndex(nextIndex)
    }

    // 弹出操作栏/隐藏操作栏
    const handleClickConetnt = () => {
        if (showActionBar) {
            setSettingShow(false)
        }
        setActionBarShow(!showActionBar)
    }

    // 显示左侧滑块
    const handleShowDrawer = () => {
        setDrawerShow(true)
    }

    // 关闭左侧滑块
    const handleCloseDrawer = () => {
        setDrawerShow(false)
    }

    // 点击护眼模式
    const handleClickEyeProtection = () => {
        if (wallpaperType === 0) {
            Taro.setStorageSync('wallPaper', 1)
            setWallpaperType(1)
            Taro.setNavigationBarColor({
                frontColor: '#000000',
                backgroundColor: '#cce8cf'
            })
            Taro.setBackgroundColor({
                backgroundColor: '#cce8cf',
                backgroundColorTop: '#cce8cf',
                backgroundColorBottom: '#cce8cf'
            })
        } else if (wallpaperType === 1) {
            Taro.setStorageSync('wallPaper', 0)
            setWallpaperType(0)
            Taro.setNavigationBarColor({
                frontColor: '#000000',
                backgroundColor: '#ffffff'
            })
            Taro.setBackgroundColor({
                backgroundColor: '#ffffff',
                backgroundColorTop: '#ffffff',
                backgroundColorBottom: '#ffffff'
            })
        }
    }

    // 显示设置
    const handleClickSetting = () => {
        setSettingShow(!showSetting)
    }

    // 缩小字体
    const handleFontSmall = () => {
        if (contentFontSize > 0) {
            Taro.setStorageSync('fontSize', contentFontSize - 10)
            setContentFontSize(contentFontSize - 10)
        }
    }

    // 放大字体
    const handleFontBig = () => {
        if (contentFontSize < 40) {
            Taro.setStorageSync('fontSize', contentFontSize + 10)
            setContentFontSize(contentFontSize + 10)
        }
    }

    // 字体改变
    const handleFontChange = e => {
        const { value } = e.detail
        setContentFontSize(value)
        Taro.setStorageSync('fontSize', value)
    }

    // 添加到本地
    const handleAddToLocal = async () => {
        Taro.showLoading({
            title: '添加中...'
        })
        const res = await API.Book.getDetail(bookId)
        let books = Taro.getStorageSync('books') || []
        let book = {
            _id: bookId,
            title: res.title,
            cover: res.cover
        }
        if (!Util.isInArray(allBooks, bookId)) {
            books.unshift(book)
            Taro.setStorageSync('books', books)
            Taro.showToast({
                title: '添加成功',
                icon: "success"
            })
            setAllBooks(books)
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
                style={{ fontSize: `${17 + 1.5 * contentFontSize / 10}px` }}>
                {title}
            </View>}
            {cpContent !== null && <Text className='content'
                decode={true}
                style={{ fontSize: `${14 + 1.5 * contentFontSize / 10}px` }}
                onClick={handleClickConetnt}>{cpContent}
            </Text>}
            {cpContent != null && <View className={classNames({
                'next': true,
                'next-default': wallpaperType === 0,
                'next-protection': wallpaperType === 1,
            })}
                hoverClass='hover' onClick={handleNextChapter}>
                下一章
            </View>}
            {/* 操作栏 */}
            <View className={classNames({
                'action': true,
                'action-show': showActionBar,
                'default': wallpaperType === 0,
                'protection': wallpaperType === 1,
                'night': wallpaperType === 2
            })}>
                <View className='chapter' hoverClass='hover' onClick={handleShowDrawer}>
                    <Image className='chapter-img' src={imgChapter} />
                    <View className='chapter-txt'>目录</View>
                </View>
                <View className='eye' hoverClass='hover' onClick={handleClickEyeProtection}>
                    <Image className='eye-img' src={imgEye} />
                    <View className='eye-txt'>护眼</View>
                </View>
                <View className='setting' hoverClass='hover' onClick={handleClickSetting}>
                    <Image className='setting-img' src={imgSetting} />
                    <View className='setting-txt'>字体</View>
                </View>
                <View className='add'>
                    <View className={classNames({
                        'add-content': true,
                        'default': wallpaperType === 0,
                        'light-protection': wallpaperType === 1,
                        'night': wallpaperType === 2
                    })}>
                        <Image className='add-content-img' src={imgBook} />
                        {(allBooks.length > 0 && Util.isInArray(allBooks, bookId))
                            ? <View className='add-content-txt'>已加入书架</View>
                            : <View className='add-content-txt' onClick={handleAddToLocal}>加入书架</View>}
                    </View>
                </View>
            </View>
            {/* 左侧目录 */}
            <AtDrawer mask
                show={showDrawer}
                onClose={handleCloseDrawer}>
                <View className='drawer'>
                    {chapterList.slice(0, 100).map((item, index) => {
                        return <View className='drawer-item' key={String(index)}>{item.title}</View>
                    })}
                </View>
            </AtDrawer>
            {/* 设置弹窗 */}
            <View className={classNames({
                'setting-pop': true,
                'setting-pop-show': showSetting,
                'default': wallpaperType === 0,
                'protection': wallpaperType === 1,
                'night': wallpaperType === 2
            })}>
                <View className='font'>
                    <View className='font-small' hoverClass='hover' onClick={handleFontSmall}>A-</View>
                    <Slider className='slider'
                        min={0}
                        max={40}
                        step={10}
                        value={contentFontSize}
                        blockSize={20}
                        onChange={handleFontChange}>
                    </Slider>
                    <View className='font-big' hoverClass='hover' onClick={handleFontBig}>A+</View>
                </View>
            </View>
        </View>
    )
}

export default Reader