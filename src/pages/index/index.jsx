import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'

import './index.scss'


@connect(
  ({ }) => ({

  }),
  {

  }
)
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  render() {
    return (
      <View className='index'>
      </View>
    )
  }
}

export default Index
