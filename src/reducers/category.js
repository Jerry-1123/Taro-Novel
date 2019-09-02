import {
    STATICS,
    CATS,
    CLEAR_CATEGORY_BOOK_LIST,
    CATEGORY_BOOK_LIST
} from '@/constants/category'

const defaultState = {
    statics: {},
    cats: {},
    categoryBookList: [],
    categoryBookListTotal: 0
}

export default function counter(state = defaultState, action) {
    switch (action.type) {
        case STATICS:
            return {
                ...state,
                statics: action.statics
            }
        case CATS: {
            return {
                ...state,
                cats: action.cats
            }
        }
        case CLEAR_CATEGORY_BOOK_LIST:
            return {
                ...state,
                categoryBookList: [],
                categoryBookListTotal: 0
            }
        case CATEGORY_BOOK_LIST:
            return {
                ...state,
                categoryBookList: state.categoryBookList.concat(action.categoryBookList),
                categoryBookListTotal: action.categoryBookListTotal
            }
        default:
            return state
    }
}