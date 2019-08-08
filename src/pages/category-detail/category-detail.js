import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import classNames from 'classNames'
import { QUERY_TYPE } from '@/constants/novel'
import { dispatchCategoryBookList } from '@/actions/novel'

import './category-detail.scss'

import List from './list/list'

@connect(
    ({ novel }) => ({
        list: novel.categoryBookList,
        listTotal: novel.categoryBookListTotal,
        minors: novel.minorList
    }),
    {
        dispatchCategoryBookList
    }
)
class CategoryDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            minorList: [],
            major: '',
            gender: '',
            navIndex: 0,
            subNavIndex: 0,
            startIndex: 0
        }
    }

    componentDidMount() {
        const { major, gender } = this.$router.params
        const { minors } = this.props
        // 设置标题
        Taro.setNavigationBarTitle({ title: major })
        // 默认初始化
        this.setState({
            minorList: ['全部'].concat(minors[gender].filter(item => item.major === major)[0].mins),
            major: major,
            gender: gender
        })
    }

    async getCategoryBookList() {
        Taro.showLoading()
        const {
            minorList,
            major,
            gender,
            navIndex,
            subNavIndex,
            startIndex
        } = this.state
        await this.props.dispatchCategoryBookList(QUERY_TYPE[navIndex].type, major, startIndex, minorList[subNavIndex], gender)
        Taro.hideLoading()
    }

    handleClickNavItem = (index) => () => {
        const { navIndex } = this.state
        if (index !== navIndex) {
            this.setState({
                navIndex: index,
                startIndex: 0
            }, async () => {
                await this.getCategoryBookList()
                Taro.pageScrollTo({
                    scrollTop: 0
                })
            })
        }
    }

    handleClickSubNavItem = (index) => () => {
        const { subNavIndex } = this.state
        if (index !== subNavIndex) {
            this.setState({
                subNavIndex: index,
                startIndex: 0
            }, async () => {
                await this.getCategoryBookList()
                Taro.pageScrollTo({
                    scrollTop: 0
                })
            })
        }
    }

    onReachBottom() {
        const {
            list,
            listTotal
        } = this.props
        if (listTotal > list.length) {
            this.setState(preState => ({
                startIndex: preState.startIndex + 50
            }), () => {
                this.getCategoryBookList()
            })
        }
    }

    render() {

        const {
            navIndex,
            subNavIndex,
            minorList
        } = this.state

        const {
            list,
            listTotal
        } = this.props

        return (
            <View className='detail'>
                <View className='header'>
                    <ScrollView className='nav'>
                        {QUERY_TYPE.map((item, index) => {
                            return <View className={classNames({
                                'nav-item': true,
                                'active': index === navIndex
                            })} key={String(index)} onClick={this.handleClickNavItem(index)}>
                                {item.name}
                            </View>
                        })}
                    </ScrollView>
                    <ScrollView className='nav' scrollX>
                        {minorList.map((item, index) => {
                            return <View className={classNames({
                                'nav-item': true,
                                'active': index === subNavIndex
                            })} key={String(index)} onClick={this.handleClickSubNavItem(index)}>
                                {item}
                            </View>
                        })}
                    </ScrollView>
                </View>
                <List categoryBookList={list} categoryBookListTotal={listTotal}/>
            </View>
        )
    }
}

export default CategoryDetail