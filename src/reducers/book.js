import {
    CHAPTER
} from '@/constants/book'

const defaultState = {
    chapters: []
}

export default function counter(state = defaultState, action) {
    switch (action.type) {
        case CHAPTER:
            return {
                ...state,
                chapters: action.chapters
            }
        default:
            return state
    }
}