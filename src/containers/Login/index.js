import React, { Component } from 'react';
import LoginForm from './components/LoginForm';
import LoginHeader from './components/LoginHeader';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getPassword, getUsername, getIsLogin, actions as loginActions } from '../../redux/modules/login';

class Login extends Component {
	render() {
		const { password, username, isLogin } = this.props;
		if (isLogin) {
			return <Redirect to="/user" />;
		}
		return (
			<div>
				<LoginHeader />
				<LoginForm
					password={password}
					username={username}
					onChange={this.handleChange}
					onSubmit={this.handleSubmit}
				/>
			</div>
		);
	}
	handleChange = (e) => {
		if (e.target.name === 'username') {
			this.props.loginActions.setUsername(e.target.value);
		} else if (e.target.name === 'password') {
			this.props.loginActions.setPassword(e.target.value);
		}
  };
  handleSubmit = () => {
    this.props.loginActions.login();
  }
}

const mapStateToProps = (state) => ({
	password: getPassword(state),
	username: getUsername(state),
	isLogin: getIsLogin(state)
});

const mapDispatchToProps = (dispatch) => ({
	loginActions: bindActionCreators(loginActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
