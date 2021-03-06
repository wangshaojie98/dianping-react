import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './modules';
import api from '../redux/middleware/api';

let store; // 就因为少加个api
if (process.env.NODE_ENV !== "production" && window.__REDUX_DEVTOOLS_EXTENSION__) {
	let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, api)));
} else {
	store = createStore(rootReducer, applyMiddleware(thunk, api))
}
export default store;