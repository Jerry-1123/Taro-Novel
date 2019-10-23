import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './about.scss'

function About() {

    return (
        <View className='about'>
            <View className='content'>
                <View className='title'>关于Taro-Novel</View>
                <View className='tip'>介绍</View>
                <View className='sku'>· 基于Taro的小说小程序，使用了最新的Hooks方式和基于此方式的Redux，小说API接口提取自追书神器APP，仅供学习交流使用，如有侵权，请及时联系。</View>
                <View className='line'></View>
                <View className='tip'>运行</View>
                <View className='sku'>· git clone https://github.com/Jerry-1123/Taro-Novel.git</View>
                <View className='sku'>· cd Taro-Novel</View>
                <View className='sku'>· npm install</View>
                <View className='sku'>· npm run dev:weapp</View>
                <View className='sku'>· demo小程序建议勾选"不校验合法域名"选项</View>
                <View className='line'></View>
                <View className='tip'>联系方式</View>
                <View className='sku'>· 610500714@qq.com</View>
                <View className='line'></View>
            </View>
        </View>
    )
}

About.config = {
    navigationBarTitleText: '关于'
}

export default About