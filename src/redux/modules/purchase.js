import { getProductDetail } from './entities/products';
import { AVAILABLE_TYPE, actions as orderActions } from './entities/orders';

const initState = {
	quanlity: 1,
	showTip: false
};

const types = {
	SET_ORDER_QUANLITY: 'PURCHASE/SET_ORDER_QUANLITY',
	CLOSE_TIP: 'PURCHASE/CLOSE_TIP',
	// through fetch submit order
	SUBMIT_ORDER_REQUEST: 'PURCHASE/SUBMIT_ORDER_REQUEST',
	SUBMIT_ORDER_SUCCESS: 'PURCHASE/SUBMIT_ORDER_SUCCESS',
	SUBMIT_ORDER_FAILURE: 'PURCHASE/SUBMIT_ORDER_FAILURE'
};

export const actions = {
	setOrderQuanlity: (quanlity) => ({
		type: types.SET_ORDER_QUANLITY,
		quanlity
	}),
	closeTip: () => ({
		type: types.CLOSE_TIP
	}),
	submitOrder: (productId) => {
		return (dispatch, getState) => {
			dispatch(submitOrderRequest());
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					const productDetail = getProductDetail(getState(), productId);
					const quanlity = getState().purchase.quanlity;
					const totalPrice = (quanlity * productDetail.currentPrice).toFixed(1);
					const text1 = `${quanlity}张 | 总价：${totalPrice}`;
					const text2 = productDetail.validityPeriod;
					const order = {
						statusText: '待消费',
						orderPicUrl: productDetail.picture,
						channel: '团购',
						title: `${productDetail.shop}：${productDetail.product}`,
						text: [ text1, text2 ],
						type: AVAILABLE_TYPE
					};
					dispatch(orderActions.addOrder(order));
					dispatch(submitOrderSuccess());
					resolve();
				}, 500);
			});
		};
	}
};

// util functions or help actionCreator

const submitOrderRequest = () => ({
	type: types.SUBMIT_ORDER_REQUEST
});

const submitOrderSuccess = () => ({
	type: types.SUBMIT_ORDER_SUCCESS
});

const reducer = (state = initState, action) => {
	switch (action.type) {
		case types.SET_ORDER_QUANLITY:
			return { ...state, quanlity: action.quanlity };
		case types.CLOSE_TIP:
			return { ...state, showTip: false };
		case types.SUBMIT_ORDER_SUCCESS:
			return { ...state, showTip: true };
		default:
			return state;
	}
};

export default reducer;

// selectors

export const getOrderQuanlity = (state) => state.purchase.quanlity;

export const getShowTip = (state) => state.purchase.showTip;

export const getProduct = (state, productId) => {
	return getProductDetail(state, productId);
};
