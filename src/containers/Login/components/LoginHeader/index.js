import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

export default function LoginHeader() {
	return (
		<div className="loginHeader">
			<Link className="loginHeader__back" to="/" />
			<div className="loginHeader__title">账号密码登录</div>
		</div>
	);
}
