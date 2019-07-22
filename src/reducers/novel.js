import {
  CATEGORY_LIST,
  CATEGORY_LIST2
} from '@/constants/novel'

const defaultState = {
  categoryList: {
    female: [],
    male: [],
    press: [],
    picture: []
  },
  categoryList2: {
    female: [],
    male: [],
    press: [],
    picture: []
  }
}

export default function counter(state = defaultState, action) {
  switch (action.type) {
    case CATEGORY_LIST:
      return {
        ...state,
        categoryList: action.categoryList
      }
    case CATEGORY_LIST2:
      return {
        ...state,
        categoryList2: action.categoryList2
      }
    default:
      return state
  }
}
