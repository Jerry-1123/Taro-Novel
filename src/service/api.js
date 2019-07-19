import config from '@/config/config'
import { get, post } from './request'

const API_URL = config.apiUrl

const Novel = {
    // 获取所有排行榜
    getRankingList() {
        return get(`${API_URL}/ranking/gender`)
    },
    // 获取分类
    getCategoryList() {
        return get(`${API_URL}/cats/lv2/statistics`)
    }
}

export default {
    Novel
}