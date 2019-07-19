import {
    CATEGORY_LIST
} from '@/constants/novel'

import API from '@/service/api'

export const dispatchCategoryList = () => {
    console.lo
    return async dispatch => {
        const res = await API.Novel.getCategoryList()
        dispatch({
            type: CATEGORY_LIST,
            categoryList: res
        })
    }
}