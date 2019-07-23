import {
  CATEGORY_LIST,
  CATEGORY_LIST2,
  CATEGORY_BOOKLIST,
  CATEGORY_BOOKLIST_MORE
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
  },
  categoryBookList: [],
  categoryBookListTotal: 0
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
    case CATEGORY_BOOKLIST:
      return {
        ...state,
        categoryBookList: action.categoryBookList,
        categoryBookListTotal: action.categoryBookListTotal
      }
    case CATEGORY_BOOKLIST_MORE:
      return {
        ...state,
        categoryBookList: state.categoryBookList.concat(action.categoryBookList),
        categoryBookListTotal: action.categoryBookListTotal
      }
    default:
      return state
  }
}
