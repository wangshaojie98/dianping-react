import React from 'react';
import ErrorToast from '../../components/ErrorToast';
import { connect } from 'react-redux';
import { actions as appActions, getError } from '../../redux/modules/app';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';

// import Home from '../Home';
// import ProductDetail from '../ProductDetail';
// import Search from '../Search';
// import SearchResult from '../SearchResult';
// import Login from '../Login';
// import User from '../User';
// import Purchase from '../Purchase';
import asyncComponent from '../../utils/AsyncComponent';

const Home = asyncComponent(() => import('../Home'));
const ProductDetail = asyncComponent(() => import('../ProductDetail'));
const Search = asyncComponent(() => import('../Search'));
const SearchResult = asyncComponent(() => import('../SearchResult'));
const Login = asyncComponent(() => import('../Login'));
const User = asyncComponent(() => import('../User'));
const Purchase = asyncComponent(() => import('../Purchase'));


function App(props) {
	const { error, appActions: { clearError } } = props;
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/login" component={Login} />
					<PrivateRoute path="/user" component={User} />
					<Route path="/purchase/:id" component={Purchase} />
					<Route path="/search" component={Search} />
					<Route path="/search_result" component={SearchResult} />
					<Route path="/detail/:id" component={ProductDetail} />
					<Route path="/" component={Home} />
				</Switch>
			</Router>
			{error ? <ErrorToast msg={error} clearError={clearError} /> : null}
		</div>
	);
}

const mapStateToProps = (state) => ({
	error: getError(state)
});

const mapDispatchToProps = (dispatch) => ({
	appActions: bindActionCreators(appActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
