import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './content.scss'

function Content({ bookDetail = {} }) {

    return (
        <View className='book'>
            <View className='book-detail'>
                <Image className='cover' src={bookDetail.cover} />
                <View className='desc'>

                </View>
            </View>
            <View className='book-reader'>

            </View>
            <View className='book-intro'>

            </View>
        </View>
    )
}

export default Content