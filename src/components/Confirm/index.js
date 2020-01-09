import React from 'react';
import './style.css';

export default function Confirm({ content, onConfirm, onCancel, confirmText, cancelText }) {
	return (
		<div className="confirm">
			<div className="confirm__alert">
				<div className="confirm__content">{content}</div>
				<div className="confirm__btns">
					<a className="confirm__btn" onClick={onCancel}>
						{cancelText}
					</a>
					<a className="confirm__btn" onClick={onConfirm}>
						{confirmText}
					</a>
				</div>
			</div>
		</div>
	);
}
