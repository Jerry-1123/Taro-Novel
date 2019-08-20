import Config from '@/config/config'
import Request from './request'

const API_URL = Config.apiUrl

const API = {
    Category: {
        getStatics: () => {
            return Request.get(`${API_URL}/category/statics`)
        },
        getCats: () => {
            return Request.get(`${API_URL}/category/cats`)
        },
        getCategoryBookList: (params) => {
            return Request.get(`${API_URL}/category/fuzzy-search`, params)
        }
    }
}

export default API