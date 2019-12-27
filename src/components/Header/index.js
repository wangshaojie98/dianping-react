import React from 'react';
import './style.css';

export default function Header(props) {
  const { grey, onBack, title } = props;
  const backgroundColor = grey ? 'f0f0f0' : 'fff';
	return (
		<header className="header" style={{ backgroundColor:  backgroundColor}}>
			<div>
				<div className="header__back" onClick={onBack}>
					返回
				</div>
			</div>
			<div className="header__title">{title}</div>
		</header>
	);
}
