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
    },
    // 获取二级分类
    getCategoryList2() {
        return get(`${API_URL}/cats/lv2`)
    },
    // 获取书单列表
    getCategoryBookList(params) {
        return get(`${API_URL}/book/by-categories`, params)
    }
}

export default {
    Novel
}