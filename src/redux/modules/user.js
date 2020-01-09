import {
	schema,
	TO_PAY_TYPE,
	AVAILABLE_TYPE,
	REFUND_TYPE,
	getOrderById,
	actions as orderActions,
	types as orderTypes
} from './entities/orders';
import { actions as commentsActions } from '../modules/entities/comments';
import { FETCH_DATA } from '../../redux/middleware/api';
import url from '../../utils/url';
import { combineReducers } from 'redux';

const initState = {
	currentTab: 0,
	orders: {
		isFetching: false,
		ids: [],
		toPayIds: [],
		availableIds: [],
		refundIds: []
	},
	currentOrder: {
		id: null,
		isDeleting: false,
		isCommenting: false,
		comment: '',
		stars: 0
	}
};

const types = {
	FETCH_ORDERS_REQUEST: 'USER/FETCH_ORDERS_REQUEST',
	FETCH_ORDERS_SUCCESS: 'USER/FETCH_ORDERS_SUCCESS',
	FETCH_ORDERS_FAILURE: 'USER/FETCH_ORDERS_FAILURE',
	// set current tab
	SET_CURREN_TAB: 'USER/SET_CURREN_TAB',
	// delete order
	DELETE_ORDER_REQUEST: 'USER/DELETE_ORDER_REQUEST',
	DELETE_ORDER_SUCCESS: 'USER/DELETE_ORDER_SUCCESS',
	DELETE_ORDER_FAILURE: 'USER/DELETE_ORDER_FAILURE',
	// show or hide 'delete dialog-box'
	SHOW_DELETE_DIALOG: 'USER/SHOW_DELETE_DIALOG',
	HIDE_DELETE_DIALOG: 'USER/HIDE_DELETE_DIALOG',
	// show or hide 'comment area'
	SHOW_COMMENT_AREA: 'USER/SHOW_COMMENT_AREA',
	HIDE_COMMENT_AREA: 'USER/HIDE_COMMENT_AREA',
	// set comment text
	SET_COMMENT: 'USER/SET_COMMENT',
	// set comment star
	SET_STARS: 'USER/SET_STARS',
	// submit order
	POST_COMMENT_REQUEST: 'USER/POST_COMMENT_REQUEST',
	POST_COMMENT_SUUCCESS: 'USER/POST_COMMENT_SUUCCESS',
	POST_COMMENT_FAILURE: 'USER/POST_COMMENT_FAILURE'
};

export const actions = {
	loadOrders: () => {
		return (dispatch, getState) => {
			const { ids } = getState().user.orders;
			if (ids.length > 0) {
				return null;
			}
			const endPoint = url.getOrders();
			dispatch(fetchOrders(endPoint));
		};
	},
	setCurrentTab: (index) => ({
		type: types.SET_CURREN_TAB,
		index
	}),
	reomveOrder: () => {
		return (dispatch, getState) => {
			const { id } = getState().user.currentOrder;
			if (id) {
				dispatch(deleteOrderRequest());
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve();
						dispatch(orderActions.deleteOrder(id)); // 删除实体模块的id
						dispatch(deleteOrderSuccsee(id)); // 删除user页面状态的id
					}, 500);
				});
			}
		};
	},
	showDeleteDialog: (orderId) => ({
		type: types.SHOW_DELETE_DIALOG,
		orderId
	}),
	hideDeleteDialog: () => ({
		type: types.HIDE_DELETE_DIALOG
	}),
	showCommentArea: (orderId) => ({
		type: types.SHOW_COMMENT_AREA,
		orderId
	}),
	hideCommentArea: () => ({
		type: types.HIDE_COMMENT_AREA
	}),
	setComment: (comment) => ({
		type: types.SET_COMMENT,
		comment
	}),
	setStars: (stars) => ({
		type: types.SET_STARS,
		stars
	}),
	submitComment: () => {
		return (dispatch, getState) => {
			const { id, comment, stars } = getState().user.currentOrder;
			dispatch(postCommentRequest());
			new Promise((resolve, reject) => {
				setTimeout(() => {
					dispatch(postCommentSuccess());
					const commentObj = { id: +new Date(), comment, stars };
					dispatch(commentsActions.addComment(commentObj));
					dispatch(orderActions.addComment(id, commentObj.id));
					resolve();
				}, 500);
			});
		};
	}
};

// above is util function
// need use GET or POST fetch actionCreator
const fetchOrders = (endPoint) => ({
	[FETCH_DATA]: {
		types: [ types.FETCH_ORDERS_REQUEST, types.FETCH_ORDERS_SUCCESS, types.FETCH_ORDERS_FAILURE ],
		schema,
		endPoint
	}
});

const deleteOrderRequest = () => ({
	type: types.DELETE_ORDER_REQUEST
});

const deleteOrderSuccsee = (orderId) => ({
	type: types.DELETE_ORDER_SUCCESS,
	orderId
});

const postCommentRequest = () => ({
	type: types.POST_COMMENT_REQUEST
});

const postCommentSuccess = () => ({
	type: types.POST_COMMENT_SUUCCESS
});

const removeOrderById = (state, key, orderId) => {
	return state[key].filter((id) => id !== orderId);
};
// above is reducers
const ordersReducer = (state = initState.orders, action) => {
	switch (action.type) {
		case types.FETCH_ORDERS_REQUEST:
			return {
				...state,
				isFetching: true
			};
		case types.FETCH_ORDERS_SUCCESS:
			const { ids, orders } = action.response;
			const toPayIds = ids.filter((id) => {
				if (orders[id].type === TO_PAY_TYPE) {
					return true;
				} else {
					return false;
				}
			});

			const availableIds = ids.filter((id) => {
				if (orders[id].type === AVAILABLE_TYPE) {
					return true;
				} else {
					return false;
				}
			});

			const refundIds = ids.filter((id) => {
				if (orders[id].type === REFUND_TYPE) {
					return true;
				} else {
					return false;
				}
			});

			return {
				...state,
				isFetching: false,
				ids: [ ...state.ids, ...ids ],
				toPayIds: [ ...state.toPayIds, ...toPayIds ],
				availableIds: [ ...state.availableIds, ...availableIds ],
				refundIds: [ ...state.refundIds, ...refundIds ]
			};
		case types.FETCH_ORDERS_FAILURE:
			return { ...state, isFetching: false };
		case types.DELETE_ORDER_SUCCESS:
		case orderTypes.DELETE_ORDER:
			return {
				...state,
				ids: removeOrderById(state, 'ids', action.orderId),
				toPayIds: removeOrderById(state, 'toPayIds', action.orderId),
				availableIds: removeOrderById(state, 'availableIds', action.orderId),
				refundIds: removeOrderById(state, 'refundIds', action.orderId)
			};
		default:
			return state;
	}
};

const currentTabReducer = (state = initState.currentTab, action) => {
	if (action.type === types.SET_CURREN_TAB) {
		return action.index;
	}
	return state;
};

const currentOrderReducer = (state = initState.currentOrder, action) => {
	switch (action.type) {
		// case types.DELETE_ORDER_REQUEST:
		case types.SHOW_DELETE_DIALOG:
			return { ...state, isDeleting: true, id: action.orderId };
		case types.SET_COMMENT:
			return {...state, comment: action.comment};
		case types.SET_STARS:
			return {...state, stars: action.stars};
		case types.SHOW_COMMENT_AREA:
			return {...state, isCommenting: true, id: action.orderId};
		case types.HIDE_COMMENT_AREA:
		case types.DELETE_ORDER_SUCCESS:
		case types.DELETE_ORDER_FAILURE:
		case types.HIDE_DELETE_DIALOG:
		case types.POST_COMMENT_SUUCCESS:
			return initState.currentOrder;
		default:
			return state;
	}
};

const reducer = combineReducers({
	orders: ordersReducer,
	currentTab: currentTabReducer,
	currentOrder: currentOrderReducer
});
export default reducer;

// selector

export const getOrders = (state) => {
	const key = [ 'ids', 'toPayIds', 'availableIds', 'refundIds' ][state.user.currentTab];
	return state.user.orders[key].map((id) => {
		return getOrderById(state, id);
	});
};

export const getCurrentTab = (state) => state.user.currentTab;

export const getDeletingOrderId = (state) => {
	return state.user.currentOrder && state.user.currentOrder.isDeleting ? state.user.currentOrder.id : null;
};

export const getCommentingOrderId = (state) => {
	return state.user.currentOrder && state.user.currentOrder.isCommenting ? state.user.currentOrder.id : null;
};

export const getCurrentOrderComment = (state) => {
	return state.user.currentOrder ? state.user.currentOrder.comment : null;
};

export const getCurrentOrderStars = (state) => {
	return state.user.currentOrder ? state.user.currentOrder.stars : null;
};