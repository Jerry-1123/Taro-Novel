import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View } from '@tarojs/components'
import Config from '@/config/config'

import './book-detail.scss'

import Content from './content/content'
import Comment from './comment/comment'
import Recommend from './recommend/recommend'

@connect(
    ({ novel }) => ({
        detail: novel.bookDetail,
        recommend: novel.recommendBookList
    }),
    {}
)
class BookDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            bookDetail: {},
            recommendList: []
        }
    }

    componentDidMount() {
        const {
            detail,
            recommend
        } = this.props
        this.setState({
            bookDetail: detail,
            recommendList: recommend
        })
        // 设置标题
        Taro.setNavigationBarTitle({ title: detail.title })
    }

    onShareAppMessage() {
        const { bookDetail } = this.state
        return {
            title: bookDetail.title,
            path: 'pages/index/index',
            imageUrl: Config.staticUrl + bookDetail.cover
        }
    }

    render() {
        const {
            bookDetail,
            recommendList
        } = this.state

        return (
            <View className='book'>
                <Content bookDetail={bookDetail} />
                <Comment />
                <Recommend recommendList={recommendList} />
            </View>
        )
    }
}

export default BookDetail