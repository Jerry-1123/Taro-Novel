import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './chapter.scss'

@connect(
    ({ novel }) => ({
        chapterList: novel.chapterList
    }),
    {

    }
)
class Chapter extends Component {

    constructor(props) {
        super(props)
        this.state = {
            list: [],
            index: 0
        }
    }

    componentDidMount() {
        const { title } = this.$router.params
        // 设置标题
        Taro.setNavigationBarTitle({ title: title })
        const {
            chapterList
        } = this.props
        if (chapterList.length === 0) {
            Taro.showModal({
                title: '提示',
                content: '本书暂无章节',
                showCancel: false,
                success: () => {
                    Taro.navigateBack()
                }
            })
        } else {
            this.setState({
                list: chapterList.slice(0, 100)
            })
        }
    }

    goChapterDetail = () => {

    }

    onReachBottom() {
        const {
            list,
            index
        } = this.state
        const {
            chapterList
        } = this.props
        if (list.length !== chapterList.length) {
            this.setState(preState => ({
                list: preState.list.concat(chapterList.slice((index + 1) * 100, (index + 2) * 100)),
                index: preState.index + 1
            }))
        }
    }

    render() {
        const {
            list
        } = this.state

        return (
            <View className='chapter'>
                {list.map((item, index) => {
                    return <View className='chapter-item' hoverClass='hover'
                        key={String(index)} onClick={this.goChapterDetail}>
                        <View className='index'>{index + 1}.</View>
                        <View className='title'>{item.title}</View>
                    </View>
                })}
            </View>
        )
    }
}

export default Chapter