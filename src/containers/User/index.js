import React, { Component } from 'react';
import UserHeader from './components/UserHeader';
import UserMain from './containers/UserMain';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getOrders, actions as userActions } from '../../redux/modules/user';
import { actions as loginActions } from '../../redux/modules/login';

class User extends Component {
	render() {
		const { orders } = this.props;
		return (
			<div>
				<UserHeader onBack={this.handleBack} onLogout={this.handleLogout} />
				<UserMain data={orders} />
			</div>
		);
	}
  componentDidMount() {
    this.props.userActions.loadOrders();
  }
	handleBack = () => {
		this.props.history.push('/');
	};

	handleLogout = () => {
		this.props.loginActions.logOut();
	};

}

const mapStateToProps = (state) => ({
	orders: getOrders(state)
});

const mapDispatchToProps = (dispatch) => ({
	userActions: bindActionCreators(userActions, dispatch),
	loginActions: bindActionCreators(loginActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
