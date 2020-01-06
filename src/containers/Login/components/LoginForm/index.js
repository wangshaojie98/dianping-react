import React from 'react';
import './style.css';

export default function LoginForm({ username, password, onChange, onSubmit }) {
	return (
		<div className="loginForm">
			<div className="loginForm__inputContainer">
				<div className="loginForm__row">
					<label className="loginForm__mobileLabel">86</label>
					<input
						name="username"
						placeholder="手机号"
						className="loginForm__input"
						value={username}
						onChange={onChange}
					/>
				</div>
				<div className="loginForm__row">
					<label className="loginForm__passwordLabel">密码</label>
					<input
						className="loginForm__input"
						name="password"
						type="password"
						placeholder="请输入密码"
						value={password}
						onChange={onChange}
					/>
				</div>
			</div>
			<div className="loginForm__btnContainer">
				<button className="loginForm__btn" onClick={onSubmit}>登录</button>
			</div>
		</div>
	);
}
