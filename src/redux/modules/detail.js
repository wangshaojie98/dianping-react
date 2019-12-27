import { schema as shopsSchema, getShopById } from './entities/shops';
import { schema as productSchema, getProductDetail, getProductById } from './entities/products';
import { FETCH_DATA } from '../middleware/api';
import url from '../../utils/url';
import { combineReducers } from 'redux';
// actionTypes
const types = {
	// 获取产品详情
	FETCH_PRODUCT_DETAIL_REQUEST: 'DETAIL/FETCH_PRODUCT_DETAIL_REQUEST',
	FETCH_PRODUCT_DETAIL_SUCCESS: 'DETAIL/FETCH_PRODUCT_DETAIL_SUCCESS',
	FETCH_PRODUCT_DETAIL_FAILURE: 'DETAIL/FETCH_PRODUCT_DETAIL_FAILURE',
	// 获取关联店铺信息
	FETCH_SHOP_REQUEST: 'DETAIL/FETCH_SHOP_REQUEST',
	FETCH_SHOP_SUCCESS: 'DETAIL/FETCH_SHOP_SUCCESS',
	FETCH_SHOP_FAILURE: 'DETAIL/FETCH_SHOP_FAILURE'
};

const fetchProductDetail = (endPoint, id) => ({
	[FETCH_DATA]: {
		types: [
			types.FETCH_PRODUCT_DETAIL_REQUEST,
			types.FETCH_PRODUCT_DETAIL_SUCCESS,
			types.FETCH_PRODUCT_DETAIL_FAILURE
		],
		schema: productSchema,
		endPoint
	},
	id
});

const fetchShopById = (endPoint, id) => ({
	[FETCH_DATA]: {
		types: [ types.FETCH_SHOP_REQUEST, types.FETCH_SHOP_SUCCESS, types.FETCH_SHOP_FAILURE ],
		schema: shopsSchema,
		endPoint
	},
	id
});

// actionCreators
const fetchProductDetailSuccess = (id) => ({
	type: types.FETCH_PRODUCT_DETAIL_SUCCESS,
	id
});

const fetchShopByIdSuccess = (id) => ({
	type: types.FETCH_SHOP_SUCCESS,
	id
});

export const actionCreators = {
	loadProductDetail: (id) => {
		return (dispatch, getState) => {
			if (getProductDetail(getState(), id)) {
				dispatch(fetchProductDetailSuccess(id));
			}
			dispatch(fetchProductDetail(url.getProductDetail(id), id));
		};
	},
	loadShopById: (id) => {
		return (dispatch, getState) => {
			if (getShopById(getState(), id)) {
				dispatch(fetchShopByIdSuccess(id));
			}
			dispatch(fetchShopById(url.getShopById(id), id));
		};
	}
};

// reducers
const initState = {
	product: {
		isFetching: false,
		id: null
	},
	relateShop: {
		isFetching: false,
		id: null
	}
};

// 产品详情的reducer
const productReducer = (state = initState.product, action) => {
	switch (action.type) {
		case types.FETCH_PRODUCT_DETAIL_REQUEST:
			return { ...state, isFetching: true };
		case types.FETCH_PRODUCT_DETAIL_SUCCESS:
			return { ...state, isFetching: false, id: action.id };
		case types.FETCH_PRODUCT_DETAIL_FAILURE:
			return { ...state, isFetching: false, id: null };
		default:
			return state;
	}
};
const shopReducer = (state = initState.relateShop, action) => {
	switch (action.type) {
		case types.FETCH_SHOP_REQUEST:
			return { ...state, isFetching: true };
		case types.FETCH_SHOP_SUCCESS:
			return { ...state, isFetching: false, id: action.id };
		case types.FETCH_SHOP_FAILURE:
			return { ...state, isFetching: false, id: null };
		default:
			return state;
	}
};

const reducer = combineReducers({
	product: productReducer,
	relateShop: shopReducer
});

export default reducer;
// selectors
//获取商品详情
export const getProduct = (state, id) => {
  return getProductDetail(state, id)
}

//获取管理的店铺信息
export const getRelatedShop = (state, productId) => {
  const product = getProductById(state, productId);
  let shopId = product ? product.nearestShop : null;
  if(shopId) {
    return getShopById(state, shopId);
  }
  return null;
}