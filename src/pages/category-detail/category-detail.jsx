import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import classNames from 'classnames'
import {
    dispatchCategoryBookList
} from '@/actions/category.js'

import './category-detail.scss'

import Loading from '@/components/loading/loading'

const aliasList = [
    {
        name: '按人气',
        sort: 1
    },
    {
        name: '按留存',
        sort: 2
    },
    {
        name: '按评分',
        sort: 3
    },
    {
        name: '按字数',
        sort: 4
    }
]

const statusList = [
    {
        name: '连载',
        isSerial: true
    },
    {
        name: '完结',
        isSerial: false
    }
]

const wordCountList = [
    {
        name: '20万字以内',
        wordCount: 1
    },
    {
        name: '20万字-50万字',
        wordCount: 2
    },
    {
        name: '50万字-100万字',
        wordCount: 3
    },
    {
        name: '100万字-200万字',
        wordCount: 4
    },
    {
        name: '200万字以上',
        wordCount: 5
    }
]

@connect(
    ({ category }) => ({
        cats: category.cats
    }),
    {
        dispatchCategoryBookList
    }
)
class CategoryDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            alias: '',
            gender: '',
            name: '',
            start: 0,
            aliasPaneShow: false,
            aliasIndex: 0,
            selectionPaneShow: false,
            catItems: [],
            catIndeedItems: [],
            bookStatus: '',
            bookIndeedStatus: '',
            countItems: [],
            countIndeedItems: []
        }
    }

    componentDidMount() {
        const {
            alias,
            gender,
            name
        } = this.$router.params
        this.setState({
            alias: alias,
            gender: gender,
            name: name
        })
        Taro.setNavigationBarTitle({
            title: name
        })
        this.fetchList()
    }

    fetchList() {
        const {
            start,
            alias,
            aliasIndex,
            catIndeedItems,
            bookIndeedStatus,
            countIndeedItems
        } = this.state

        let count = []
        for (let i = 0; i < countIndeedItems.length; i++) {
            console.log(countIndeedItems[i])
            count.push(countIndeedItems[i].wordCount)
        }

        const params = {
            alias: alias,
            sort: aliasList[aliasIndex].sort,
            cat: catIndeedItems.length > 0 ? catIndeedItems : '',
            isserial: bookIndeedStatus.isSerial === undefined ? '' : bookIndeedStatus.isSerial,
            price: 1,
            wordCount: count.length > 0 ? count : '',
            start: start
        }
    }

    clickAlias = () => {
        this.setState(preState => ({
            aliasPaneShow: !preState.aliasPaneShow,
            selectionPaneShow: false
        }))
    }

    clickAliasItem = (index) => () => {
        this.setState({
            aliasIndex: index,
            aliasPaneShow: false
        })
    }

    clickSelection = () => {
        const {
            selectionPaneShow,
            catIndeedItems,
            bookIndeedStatus,
            countIndeedItems
        } = this.state
        if (!selectionPaneShow) {
            this.setState({
                catItems: catIndeedItems,
                bookStatus: bookIndeedStatus,
                countItems: countIndeedItems
            })
        }
        this.setState(preState => ({
            selectionPaneShow: !preState.selectionPaneShow,
            aliasPaneShow: false
        }))
    }

    clickCatItem = (item) => () => {
        const { catItems } = this.state
        const tempIndex = catItems.indexOf(item)
        if (tempIndex === -1) {
            this.setState({
                catItems: catItems.concat(item)
            })
        } else {
            catItems.splice(tempIndex, 1)
            this.setState({
                catItems: catItems
            })
        }
    }

    clickStatusItem = (item) => () => {
        const { bookStatus } = this.state
        if (bookStatus === item) {
            this.setState({
                bookStatus: ''
            })
        } else {
            this.setState({
                bookStatus: item
            })
        }
    }

    clickWordCountItem = (item) => () => {
        const { countItems } = this.state
        const tempIndex = countItems.indexOf(item)
        if (tempIndex === -1) {
            this.setState({
                countItems: countItems.concat(item)
            })
        } else {
            countItems.splice(tempIndex, 1)
            this.setState({
                countItems: countItems
            })
        }
    }

    clickConfirm = () => {
        const {
            catItems,
            bookStatus,
            countItems
        } = this.state
        this.setState({
            catIndeedItems: catItems,
            bookIndeedStatus: bookStatus,
            countIndeedItems: countItems,
            selectionPaneShow: false
        }, () => {
            this.fetchList()
        })
    }

    clickMask = () => {
        this.setState({
            aliasPaneShow: false,
            selectionPaneShow: false
        })
    }

    render() {

        const {
            gender,
            name,
            aliasPaneShow,
            aliasIndex,
            selectionPaneShow,
            catItems,
            bookStatus,
            countItems
        } = this.state

        const {
            cats
        } = this.props

        const catList = cats[gender] ? cats[gender].filter(item => item.major === name)[0].mins : []

        return <View className='detail'>
            <View className='condition'>
                <View className='header'>
                    <View className='action'>
                        <View className={classNames({
                            'action-item': true,
                            'action-item-active': aliasPaneShow
                        })} onClick={this.clickAlias}>
                            <View className='txt'>{aliasList[aliasIndex].name}</View>
                            <View className={classNames({
                                'more': true,
                                'more-active': aliasPaneShow
                            })} />
                        </View>
                        <View className={classNames({
                            'action-item': true,
                            'action-item-active': selectionPaneShow
                        })} onClick={this.clickSelection}>
                            <View className='txt'>筛选</View>
                            <View className={classNames({
                                'more': true,
                                'more-active': selectionPaneShow
                            })} />
                        </View>
                    </View>
                    <View className='line'>
                        <View className='line-item' />
                    </View>
                    {aliasPaneShow && <View className='alias'>
                        {aliasList.map((item, index) => {
                            return <View className={classNames({
                                'alias-item': true,
                                'alias-item-active': aliasIndex === index
                            })} key={String(index)}
                                onClick={this.clickAliasItem(index)}>
                                <View className='name'>{item.name}</View>
                                {aliasIndex === index && <View className='choice' />}
                            </View>
                        })}
                    </View>}
                    {selectionPaneShow && <View className='selection'>
                        <View className='selection-item'>
                            <View className='title'>子分类</View>
                            <View className='wrap'>
                                {(catList && catList.length > 0)
                                    && catList.map((item, index) => {
                                        return <View className={classNames({
                                            'wrap-item': true,
                                            'wrap-item-active': catItems.includes(item)
                                        })} key={String(index)} onClick={this.clickCatItem(item)}>
                                            {item}
                                        </View>
                                    })}
                            </View>
                        </View>
                        <View className='selection-item'>
                            <View className='title'>状态</View>
                            <View className='wrap'>
                                {statusList.map((item, index) => {
                                    return <View className={classNames({
                                        'wrap-item': true,
                                        'wrap-item-active': item === bookStatus
                                    })} key={String(index)} onClick={this.clickStatusItem(item)}>
                                        {item.name}
                                    </View>
                                })}
                            </View>
                        </View>
                        <View className='selection-item'>
                            <View className='title'>字数</View>
                            <View className='wrap'>
                                {wordCountList.map((item, index) => {
                                    return <View className={classNames({
                                        'wrap-item': true,
                                        'wrap-item-active': countItems.includes(item)
                                    })} key={String(index)} onClick={this.clickWordCountItem(item)}>
                                        {item.name}
                                    </View>
                                })}
                            </View>
                        </View>
                        <View className='confirm' onClick={this.clickConfirm}>确认</View>
                    </View>}
                </View>
                {(aliasPaneShow || selectionPaneShow)
                    && <View className='mask' onClick={this.clickMask} />}
            </View>
            <View className='list'>
            </View>
        </View>
    }
}

export default CategoryDetail