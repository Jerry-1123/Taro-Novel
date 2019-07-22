import {
    CATEGORY_LIST,
    CATEGORY_LIST2
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