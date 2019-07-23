import {
    CATEGORY_LIST,
    CATEGORY_LIST2,
    CATEGORY_BOOKLIST,
    CATEGORY_BOOKLIST_MORE
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

export const dispatchCategoryList2 = () => {
    return async dispatch => {
        const res = await API.Novel.getCategoryList2()
        dispatch({
            type: CATEGORY_LIST2,
            categoryList2: res
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
            limit: 20,
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