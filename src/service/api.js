import Config from '@/config/config'
import Request from './request'

const API_URL1 = Config.apiUrl1
const API_URL2 = Config.apiUrl2

const API = {
    Category: {
        getStatics: () => {
            return Request.get(`${API_URL1}/category/statics`)
        },
        getCats: () => {
            return Request.get(`${API_URL1}/category/cats`)
        },
        getCategoryBookList: (params) => {
            return Request.get(`${API_URL1}/category/fuzzy-search`, params)
        }
    },
    Book: {
        getDetail: id => {
            return Request.get(`${API_URL2}/book/${id}`)
        },
        getCommentReview: id => {
            return Request.get(`${API_URL2}/post/review/best-by-book?book=${id}`)
        },
        getRecommendList: id => {
            return Request.get(`${API_URL2}/book/${id}/recommend`)
        }
    }
}

export default API