import { combineReducers } from 'redux';
import entities from './entities';
import detail from './detail';
import app from './app';
import home from './home';
import search from './search';
import login from './login';

export default combineReducers({
    entities,
    detail,
    app,
    home,
    search,
    login
})