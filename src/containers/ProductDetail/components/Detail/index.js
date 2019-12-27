import React from 'react';
import './style.css';

export default function Detail(props) {
	const { detail: { products, category, remark }, oldPrice, currentPrice } = props.data;
	return (
		<div className="detail">
			<div className="detail__header">
				<span>团购详情</span>
				<i className="detail__headerIcon" />
			</div>
			<table cellPadding="0" cellSpacing="0" className="detail__table">
				<tbody>
					<tr className="detail__row">
						<th colSpan="3" className="detail__category">
							{category}
						</th>
					</tr>
					{products.map((item, index) => {
						return (
							<tr className="detail__row" key={index}>
								<td>{item.name}</td>
								<td className="detail__td--alignRight">{item.quantity}</td>
								<td className="detail__td--alignRight">{item.price}</td>
							</tr>
						);
					})}
					<tr className="detail__row">
						<td />
						<td className="detail__td--price">
							最高价值
							<br />
							<strong className="detail__td--priceNew">团购价</strong>
						</td>
						<td className="detail__td--price">
							{oldPrice}元
							<br />
							<strong className="detail__td--priceNew">{currentPrice}元</strong>
						</td>
					</tr>
				</tbody>
			</table>
			<div className="detail__remark">{remark}</div>
			<div className="detail__more">
				<span>更多图文详情</span>
				<span className="detail__notice">(建议Wifi环境下打卡，土豪请随意)</span>
				<i className="detail__arrow" />
			</div>
		</div>
	);
}
