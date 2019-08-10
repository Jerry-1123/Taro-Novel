import {
    CATEGORY_LIST,
    MINOR_LIST,
    CATEGORY_BOOKLIST,
    CATEGORY_BOOKLIST_MORE,
    BOOK_DETAIL,
    RECOMMED_BOOKLIST,
    TAG_BOOKLIST,
    AUTHOR_BOOKLIST,
    CHAPTER_LIST
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

export const dispatchBookDetail = id => {
    return async dispatch => {
        const res = await API.Novel.getBookDetail(id)
        dispatch({
            type: BOOK_DETAIL,
            bookDetail: res
        })
    }
}

export const dispatchRecommendBookList = id => {
    return async dispatch => {
        const res = await API.Novel.getRecommendBookList(id)
        dispatch({
            type: RECOMMED_BOOKLIST,
            recommendBookList: res.books
        })
    }
}

export const dispatchTagBookList = (tags, start) => {
    return async dispatch => {
        const params = {
            tags,
            start,
            limit: 30
        }
        const res = await API.Novel.getTagBookList(params)
        dispatch({
            type: TAG_BOOKLIST,
            tagBookList: res.books
        })
    }
}

export const dispatchAuthorBookList = author => {
    return async dispatch => {
        const res = await API.Novel.getAuthorBookList(author)
        dispatch({
            type: AUTHOR_BOOKLIST,
            authorBookList: res.books
        })
    }
}

export const dispatchChapterList = id => {
    return async dispatch => {
        const res = await API.Novel.getChapterList(id)
        dispatch({
            type: CHAPTER_LIST,
            chapterList: res.mixToc.chapters
        })
    }
}