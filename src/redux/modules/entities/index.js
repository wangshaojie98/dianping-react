import { combineReducers } from 'redux';
import comments from './comments';
import orders from './orders';
import products from './products';
import shops from './shops';

export default combineReducers({
    comments,
    orders,
    products,
    shops
});
