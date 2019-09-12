import Config from '@/config/config'
import Request from './request'

const API_URL1 = Config.apiUrl1
const API_URL2 = Config.apiUrl2
const Chapter_Url = Config.chapterUrl

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
        getDetail: bookId => {
            return Request.get(`${API_URL2}/book/${bookId}`)
        },
        getCommentReview: bookId => {
            return Request.get(`${API_URL2}/post/review/best-by-book?book=${bookId}`)
        },
        getRecommendList: bookId => {
            return Request.get(`${API_URL2}/book/${bookId}/recommend`)
        },
        getAuthorBookList: author => {
            return Request.get(`${API_URL1}/books/accurate-search-author?author=${author}&packageName=com.ifmoc.ZhuiShuShenQi`)
        },
        getTagBookList: tag => {
            return Request.get(`${API_URL1}/books/fuzzy-search?model.query=${tag}&model.start=0&model.limit=50`)
        },
        getSummaryId: bookId => {
            return Request.get(`${API_URL2}/btoc?view=summary&book=${bookId}`)
        },
        getChapter: summaryId => {
            return Request.get(`${API_URL2}/btoc/${summaryId}?view=chapters`)
        },
        getComments: params => {
            return Request.get(`${API_URL2}/post/review/by-book`, params)
        },
        getReaderContent: link => {
            return Request.get(`${Chapter_Url}/chapter/${link}`)
        }
    }
}

export default API