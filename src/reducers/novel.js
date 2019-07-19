import {
  CATEGORY_LIST
} from '@/constants/novel'

const defaultState = {
  categoryList: {
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
    default:
      return state
  }
}
