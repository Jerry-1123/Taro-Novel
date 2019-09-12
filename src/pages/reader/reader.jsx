import Taro, { useRouter, useState, useEffect } from '@tarojs/taro'
import { View, RichText } from '@tarojs/components'
import API from '@/service/api'

import ParserRichText from '@/components/parser/parserRichText';

import './reader.scss'

function Reader() {

    const router = useRouter()

    const [chapter, setChapter] = useState(null)

    useEffect(async () => {
        const link = router.params.link
        const res = await API.Book.getReaderContent(link)
        setChapter(res.chapter.cpContent)
    }, [])

    return (
        <View className='reader'>
            <ParserRichText html={chapter} />
        </View>
    )
}

export default Reader