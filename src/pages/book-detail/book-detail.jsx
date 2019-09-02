import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import API from '@/service/api'

import './book-detail.scss'

import Loading from '@/components/loading/loading'

class BookDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            bookDetail: {}
        }
    }

    async  componentDidMount() {
        const { params } = this.$router
        const res = await API.Book.getDetail(params.id)
        this.setState({
            bookDetail: res,
            isLoading: false
        }, () => {
            Taro.setNavigationBarTitle({
                title: res.title
            })
        })
    }

    render() {

        const {
            isLoading
        } = this.state

        return (
            <View className='detail'>
                <Loading loading={isLoading} />
                <View className='header'>

                </View>
                <View className='comment'>

                </View>
                <View className='recommend'>

                </View>
                <View className='action-bar'>

                </View>
            </View>
        )
    }
}

export default BookDetail