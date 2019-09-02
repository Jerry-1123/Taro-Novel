import {
    STATICS,
    CATS,
    CLEAR_CATEGORY_BOOK_LIST,
    CATEGORY_BOOK_LIST
} from '@/constants/category'

import API from '@/service/api'

export const dispatchStatics = () => {
    return async dispatch => {
        const res = await API.Category.getStatics()
        dispatch({
            type: STATICS,
            statics: res
        })
    }
}

export const dispatchCats = () => {
    return async dispatch => {
        const res = await API.Category.getCats()
        dispatch({
            type: CATS,
            cats: res
        })
    }
}

export const dispatchClearCategory = () => {
    return {
        type: CLEAR_CATEGORY_BOOK_LIST
    }
}

export const dispatchCategoryBookList =
    ({ alias, sort = '', cat = [], isSerial, wordCount = [], start = 0 }) => {
        return async dispatch => {
            const params = {
                alias: alias,
                sort: sort,
                cat: cat,
                isserial: isSerial,
                price: 1,
                wordCount: wordCount,
                start: start * 20,
                limit: 20,
                packageName: '',
                token: ''
            }
            const res = await API.Category.getCategoryBookList(params)
            dispatch({
                type: CATEGORY_BOOK_LIST,
                categoryBookList: res.books,
                categoryBookListTotal: res.total
            })
        }
    }