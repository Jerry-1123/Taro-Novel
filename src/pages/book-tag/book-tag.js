import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './book-tag.scss'

import NovelItem from '@/components/novel-item/novel-item'
import NoMore from '@/components/no-more/no-more'

@connect(
    ({ novel }) => ({
        tagList: novel.tagBookList,
    }), {

    }
)
class BookTag extends Component {

    componentDidMount() {
        const { tag } = this.$router.params
        // 设置标题
        Taro.setNavigationBarTitle({ title: tag })
    }

    render() {
        const {
            tagList
        } = this.props

        return (
            <View>
                {tagList.map(item => <NovelItem novel={item} key={item._id} />)}
            </View>
        )
    }
}

export default BookTag