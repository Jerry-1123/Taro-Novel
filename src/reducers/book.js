import {
    CHAPTER
} from '@/constants/book'

const defaultState = {
    chapters: [],
    bookId: 0
}

export default function counter(state = defaultState, action) {
    switch (action.type) {
        case CHAPTER:
            return {
                ...state,
                chapters: action.chapters,
                bookId: action.bookId
            }
        default:
            return state
    }
}