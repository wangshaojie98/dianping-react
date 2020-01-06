import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getIsLogin } from '../../redux/modules/login';
import { connect } from 'react-redux';

class PrivateRoute extends Component {
	render() {
		const { component: Component, login, ...rest } = this.props;
		return (
			<Route
				{...rest}
				render={(props) => {
					return login ? (
						<Component {...props} />
					) : (
						<Redirect to={{ pathname: '/login', state: { from: props.location } }} />
					);
				}}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		login: getIsLogin(state)
	};
};

export default connect(mapStateToProps, null)(PrivateRoute);
