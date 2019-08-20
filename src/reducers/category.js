import {
    STATICS,
    CATS,
    CLEAR_CATEGORY_BOOK_LIST,
    CATEGORY_BOOK_LIST
} from '@/constants/category'

const defaultState = {
    statics: {},
    cats: {},
    categoryBookList: []
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
                categoryBookList: []
            }
        case CATEGORY_BOOK_LIST:
            return {
                ...state,
                categoryBookList: state.categoryBookList.concat(action.categoryBookList)
            }
        default:
            return state
    }
}