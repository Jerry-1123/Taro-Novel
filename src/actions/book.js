import {
    CHAPTER
} from '@/constants/book'

import API from '@/service/api'

export const dispatchChapters = (bookId) => {
    return async dispatch => {
        const res1 = await API.Book.getSummaryId(bookId)
        const summaryId = res1[0]._id
        const res2 = await API.Book.getChapter(summaryId)
        dispatch({
            type: CHAPTER,
            chapters: res2.chapters,
            bookId: res2.book
        })
    }
}