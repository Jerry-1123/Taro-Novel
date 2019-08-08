import {
    CATEGORY_LIST,
    MINOR_LIST,
    CATEGORY_BOOKLIST,
    CATEGORY_BOOKLIST_MORE,
    BOOK_DETAIL,
    RECOMMED_LIST
} from '@/constants/novel'

import API from '@/service/api'

export const dispatchCategoryList = () => {
    return async dispatch => {
        const res = await API.Novel.getCategoryList()
        dispatch({
            type: CATEGORY_LIST,
            categoryList: res
        })
    }
}

export const dispatchMinorList = () => {
    return async dispatch => {
        const res = await API.Novel.getMinorList()
        dispatch({
            type: MINOR_LIST,
            minorList: res
        })
    }
}

export const dispatchCategoryBookList = (type, major, start, minor, gender) => {
    return async dispatch => {
        if (minor === '全部') {
            minor = ''
        }
        const params = {
            type,
            major,
            start,
            limit: 50,
            minor,
            gender
        }
        const res = await API.Novel.getCategoryBookList(params)
        if (start === 0) {
            dispatch({
                type: CATEGORY_BOOKLIST,
                categoryBookList: res.books,
                categoryBookListTotal: res.total
            })
        } else {
            dispatch({
                type: CATEGORY_BOOKLIST_MORE,
                categoryBookList: res.books,
                categoryBookListTotal: res.total
            })
        }
    }
}

export const dispatchBookDetail = id => {
    return async dispatch => {
        const res = await API.Novel.getBookDetail(id)
        dispatch({
            type: BOOK_DETAIL,
            bookDetail: res
        })
    }
}

export const dispatchRecommendList = id => {
    return async dispatch => {
        const res = await API.Novel.getRecommendList(id)
        dispatch({
            type: RECOMMED_LIST,
            recommendList: res.books
        })
    }
}