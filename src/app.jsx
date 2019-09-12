import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store'

import './app.scss'

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/mall/mall',
      'pages/category/category',
      'pages/user/user',
      'pages/category-detail/category-detail',
      'pages/book-detail/book-detail',
      'pages/book-chapter/book-chapter',
      'pages/book-author/book-author',
      'pages/book-recommend/book-recommend',
      'pages/book-tag/book-tag',
      'pages/book-comment/book-comment',
      'pages/reader/reader'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#dbdbdb",
      selectedColor: "#757575",
      backgroundColor: "#ffffff",
      borderStyle: 'black',
      list: [
        {
          pagePath: "pages/index/index",
          iconPath: "./assets/images/default.png",
          selectedIconPath: "./assets/images/default_selected.png",
          text: "首页"
        },
        {
          pagePath: "pages/mall/mall",
          iconPath: "./assets/images/default.png",
          selectedIconPath: "./assets/images/default_selected.png",
          text: "书城"
        },
        {
          pagePath: "pages/category/category",
          iconPath: "./assets/images/default.png",
          selectedIconPath: "./assets/images/default_selected.png",
          text: "分类"
        },
        {
          pagePath: "pages/user/user",
          iconPath: "./assets/images/default.png",
          selectedIconPath: "./assets/images/default_selected.png",
          text: "我的"
        },
      ]
    }
  }

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
