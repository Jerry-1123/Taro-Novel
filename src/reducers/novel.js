import {
  CATEGORY_LIST,
  MINOR_LIST,
  CATEGORY_BOOKLIST,
  CATEGORY_BOOKLIST_MORE,
  BOOK_DETAIL,
  RECOMMED_LIST
} from '@/constants/novel'

const defaultState = {
  categoryList: {
    female: [],
    male: [],
    press: [],
    picture: []
  },
  minorList: {
    female: [],
    male: [],
    press: [],
    picture: []
  },
  categoryBookList: [],
  categoryBookListTotal: 0,
  bookDetail: {},
  recommendList: []
}

export default function counter(state = defaultState, action) {
  switch (action.type) {
    case CATEGORY_LIST:
      return {
        ...state,
        categoryList: action.categoryList
      }
    case MINOR_LIST:
      return {
        ...state,
        minorList: action.minorList
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
    case BOOK_DETAIL:
      return {
        ...state,
        bookDetail: action.bookDetail
      }
    case RECOMMED_LIST:
      return {
        ...state,
        recommendList: action.recommendList
      }
    default:
      return state
  }
}
