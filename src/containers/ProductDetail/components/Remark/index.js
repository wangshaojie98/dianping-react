import React from 'react';
import './style.css';

export default function Remark(props) {
	const { purchaseNotes, validityPeriod } = props.data;
	return (
		<div className="remark">
			<div className="remark__header">
				购买须知
				<i className="remark_icon" />
			</div>
			<div>
				<dl className="remark__item">
					<dt className="remark__itemTitle">有效期</dt>
					<dd className="remark__itemDesc">{validityPeriod}</dd>
				</dl>
				{purchaseNotes.map((item, index) => {
					return (
						<dl className="remark__item" key={index}>
							<dt className="remark__itemTitle">{item.title}</dt>
							<dd className="remark__itemDesc">{item.content}</dd>
						</dl>
					);
				})}
			</div>
		</div>
	);
}
