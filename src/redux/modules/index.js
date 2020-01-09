import { combineReducers } from 'redux';
import entities from './entities';
import detail from './detail';
import app from './app';
import home from './home';
import search from './search';
import login from './login';
import user from './user';

export default combineReducers({
    entities,
    detail,
    app,
    home,
    search,
    login,
    user
})