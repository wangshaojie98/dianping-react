import url from '../../utils/url';
import { schema } from '../modules/entities/products';
import { FETCH_DATA } from '../middleware/api';
import { combineReducers } from 'redux';
export const params = {
  PATH_LIKES: "likes",
  PATH_DISCOUNTS: "discounts",
  PAGE_SIZE_LIKES: 5,
  PAGE_SIZE_DISCOUNTS: 3
}

// actionTypes
const actionTypes = {
  FETCH_LIKES_REQUEST: "HOME/FETCH_LIKES_REQUEST",
  FETCH_LIKES_SUCCESS: "HOME/FETCH_LIKES_SUCCESS",
  FETCH_LIKES_FAILURE: "HOME/FETCH_LIKES_FAILURE",
  FETCH_DISCOUNTS_REQUEST: "HOME/FETCH_DISCOUNTS_REQUEST",
  FETCH_DISCOUNTS_SUCCESS: "HOME/FETCH_DISCOUNTS_SUCCESS",
  FETCH_DISCOUNTS_FAILURE: "HOME/FETCH_DISCOUNTS_FAILURE"
};
// actionCreator
const fetchLikes = (endPoint) => ({
  [FETCH_DATA]: {
    types: [
      actionTypes.FETCH_LIKES_REQUEST,
      actionTypes.FETCH_LIKES_SUCCESS,
      actionTypes.FETCH_LIKES_FAILURE
    ],
    schema,
    endPoint
  }
})

const fetchDiscounts = (endPoint) => ({
  [FETCH_DATA]: {
    types: [
      actionTypes.FETCH_DISCOUNTS_REQUEST,
      actionTypes.FETCH_DISCOUNTS_SUCCESS,
      actionTypes.FETCH_DISCOUNTS_FAILURE
    ],
    schema,
    endPoint
  }
})


export const actions = {
  loadLikes: () => {
    return (dispatch, getState) => {
      const { pageCount } = getState().home.likes;
      let rowIndex = pageCount * params.PAGE_SIZE_LIKES;
      const endPoint = url.getProductList(params.PATH_LIKES, rowIndex, params.PAGE_SIZE_LIKES);
      dispatch(fetchLikes(endPoint));
    }
  },
  loadDiscounts: () => {
    return (dispatch, getState) => {
      if (getState().home.discounts.ids.length > 0) {
        return null;
      }
      const endPoint = url.getProductList(params.PATH_DISCOUNTS, 0, params.PAGE_SIZE_DISCOUNTS);
      dispatch(fetchDiscounts(endPoint));
    }
  }
};

const initState = {
  likes: {
    isFetching: false,
    pageCount: 0,
    ids: []
  },
  discounts: {
    isFetching: false,
    ids: []
  }
}

// reducer
const likesReducer = (state = initState.likes, action) => {
  switch (action.type) {
    case actionTypes.FETCH_LIKES_REQUEST:
      return { ...state, isFetching: true };
    case actionTypes.FETCH_LIKES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        pageCount: state.pageCount + 1,
        ids: [...state.ids, ...action.response.ids]
      };
    case actionTypes.FETCH_LIKES_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
}
const discountsReducer = (state = initState.discounts, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DISCOUNTS_REQUEST:
      return { ...state, isFetching: true };
    case actionTypes.FETCH_DISCOUNTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: [...state.ids, ...action.response.ids]
      };
    case actionTypes.FETCH_DISCOUNTS_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
}

const reducer = combineReducers({
  likes: likesReducer,
  discounts: discountsReducer
})

// selectors
// 获取猜你喜欢state
export const getLikes = (state) => {
  return state.home.likes.ids.map(id => {
    return state.entities.products[id]
  })
}

export const getDiscounts = (state) => {
  return state.home.discounts.ids.map(id => {
    return state.entities.products[id]
  })
}

export const getPageCountOfLikes = (state) => {
  return state.home.likes.pageCount;
}

export default reducer;