import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './loading.scss'

function Loading({ loading = false }) {

    return (
        <View>
            {loading && <View className='body'>
                <View className='loading'></View>
            </View>}
        </View>
    )
}

export default Loading